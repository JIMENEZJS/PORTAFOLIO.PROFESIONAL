import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';
import { atenderContacto } from '../functions/_contacto.js';

const VALIDO = { nombre: 'Laura', correo: 'laura@ejemplo.com', mensaje: 'Necesito un chatbot.' };

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
