import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';
import { atenderContacto, normalizarWhatsapp } from '../functions/_contacto.js';
import { armarCorreo } from '../functions/_correo.js';

const VALIDO = { nombre: 'Laura', correo: 'laura@ejemplo.com', whatsapp: '573001234567', mensaje: 'Necesito un chatbot.' };

let enviados, fallar, kv;

function kvFalso() {
  const datos = new Map();
  return {
    datos,
    get: async (clave) => datos.get(clave) ?? null,
    put: async (clave, valor) => void datos.set(clave, valor),
  };
}

function publicar(cuerpo, { limite = 1000, ip = '203.0.113.7' } = {}) {
  const peticion = new Request('https://ejemplo.pages.dev/api/contacto', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'cf-connecting-ip': ip },
    body: typeof cuerpo === 'string' ? cuerpo : JSON.stringify(cuerpo),
  });
  const enviar = async (datos) => {
    if (fallar) throw new Error('fallo simulado');
    enviados.push(datos);
  };
  return atenderContacto(peticion, { enviar, kv, limite });
}

beforeEach(() => {
  enviados = [];
  fallar = false;
  kv = kvFalso();
});

test('envía un mensaje válido con los datos limpios', async () => {
  const res = await publicar({ ...VALIDO, nombre: '  Laura  ' });
  assert.equal(res.status, 200);
  assert.deepEqual(enviados, [VALIDO]);
});

for (const [caso, cambio] of [
  ['sin nombre', { nombre: ' ' }],
  ['nombre con salto de línea', { nombre: 'Laura\nBcc: x@y.com' }],
  ['correo inválido', { correo: 'laura' }],
  ['correo con salto de línea', { correo: 'laura@ejemplo.com\nBcc: x@y.com' }],
  ['sin WhatsApp', { whatsapp: '' }],
  ['WhatsApp con letras', { whatsapp: '300abc4567' }],
  ['WhatsApp ambiguo sin indicativo', { whatsapp: '5512345678' }],
  ['WhatsApp que no es texto', { whatsapp: 3001234567 }],
  ['mensaje vacío', { mensaje: '' }],
  ['mensaje demasiado largo', { mensaje: 'a'.repeat(5001) }],
  ['campo que no es texto', { mensaje: { a: 1 } }],
]) {
  test(`rechaza: ${caso}`, async () => {
    const res = await publicar({ ...VALIDO, ...cambio });
    assert.equal(res.status, 400);
    assert.ok((await res.json()).error);
    assert.equal(enviados.length, 0);
  });
}

test('el campo trampa responde bien pero no envía nada', async () => {
  const res = await publicar({ ...VALIDO, sitio: 'https://spam.example' });
  assert.equal(res.status, 200);
  assert.equal(enviados.length, 0);
});

test('un fallo de envío devuelve 502 sin revelar el detalle', async () => {
  fallar = true;
  const original = console.error;
  console.error = () => {};
  const res = await publicar(VALIDO);
  console.error = original;
  assert.equal(res.status, 502);
  assert.doesNotMatch((await res.json()).error, /simulado/);
});

test('JSON mal formado devuelve 400', async () => {
  assert.equal((await publicar('{no es json')).status, 400);
});

test('un cuerpo demasiado grande devuelve 413', async () => {
  assert.equal((await publicar({ ...VALIDO, relleno: 'a'.repeat(30000) })).status, 413);
});

test('limita los envíos repetidos con 429, por visitante', async () => {
  assert.equal((await publicar(VALIDO, { limite: 2 })).status, 200);
  assert.equal((await publicar(VALIDO, { limite: 2 })).status, 200);
  const res = await publicar(VALIDO, { limite: 2 });
  assert.equal(res.status, 429);
  assert.ok((await res.json()).error);
  assert.equal((await publicar(VALIDO, { limite: 2, ip: '203.0.113.8' })).status, 200);
});

test('no guarda la IP en claro', async () => {
  await publicar(VALIDO);
  assert.equal(kv.datos.size, 1);
  assert.doesNotMatch([...kv.datos.keys()][0], /203\.0\.113\.7/);
});

for (const [entrada, esperado] of [
  ['300 123 4567', '573001234567'],
  ['(300) 123-4567', '573001234567'],
  ['573001234567', '573001234567'],
  ['+57 300 123 4567', '573001234567'],
  ['+52 55 1234 5678', '525512345678'],
  ['0052 55 1234 5678', '525512345678'],
  ['123', null],
  ['+0 300 123 4567', null],
  ['+57 300 123 4567?text=hola', null],
]) {
  test(`normaliza el WhatsApp: ${entrada}`, () => {
    assert.equal(normalizarWhatsapp(entrada), esperado);
  });
}

test('el correo escapa lo que escribe el visitante', () => {
  const { html } = armarCorreo({
    nombre: '<img src=x onerror=alert(1)>',
    correo: 'a"><script>@ejemplo.com',
    whatsapp: '573001234567',
    mensaje: '<script>alert(1)</script>\n"comillas" & más',
  });
  assert.doesNotMatch(html, /<script|<img/);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;<br>&quot;comillas&quot; &amp; más/);
});

test('el correo trae el chat y las respuestas de WhatsApp con el saludo escrito', () => {
  const { html, texto } = armarCorreo({ ...VALIDO, nombre: 'Laura Gómez' });
  assert.equal((html.match(/https:\/\/wa\.me\/573001234567/g) ?? []).length, 5);
  const borrador = html.match(/https:\/\/wa\.me\/573001234567\?text=([^"]+)"/)[1];
  assert.match(decodeURIComponent(borrador), /^Hola Laura, soy Juan Sebastián\./);
  assert.match(html, /\+57 300 123 4567/);
  assert.match(html, /mailto:laura@ejemplo\.com\?subject=/);
  assert.match(texto, /WhatsApp: \+57 300 123 4567/);
  assert.match(texto, /https:\/\/wa\.me\/573001234567/);
});
