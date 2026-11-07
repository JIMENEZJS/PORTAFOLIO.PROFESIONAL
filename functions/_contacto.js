/* Lógica del formulario de contacto, sin nada propio de Cloudflare para poder probarla con Node. */

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TAMANO_MAXIMO = 20 * 1024;
const VENTANA_SEGUNDOS = 15 * 60;
const LIMITE_ENVIOS = 5;

/*
  Deja el número solo con dígitos e indicativo, como lo pide wa.me, o null si no es válido.
  Sin indicativo solo se aceptan celulares de Colombia: 10 dígitos que empiezan por 3.
*/
export function normalizarWhatsapp(valor) {
  const crudo = valor.trim();
  if (!/^\+?[\d\s().-]+$/.test(crudo)) return null;
  const digitos = crudo.replace(/\D/g, '');

  if (crudo.startsWith('+')) return /^[1-9]\d{7,14}$/.test(digitos) ? digitos : null;
  if (/^00[1-9]\d{7,14}$/.test(digitos)) return digitos.slice(2);
  if (/^3\d{9}$/.test(digitos)) return `57${digitos}`;
  if (/^573\d{9}$/.test(digitos)) return digitos;
  return null;
}

/* Devuelve los datos limpios, o el texto del error para mostrarle al visitante. */
export function validarContacto(cuerpo) {
  const texto = (v) => (typeof v === 'string' ? v.trim() : '');
  const nombre = texto(cuerpo?.nombre);
  const correo = texto(cuerpo?.correo);
  const mensaje = texto(cuerpo?.mensaje);
  const whatsapp = normalizarWhatsapp(texto(cuerpo?.whatsapp));

  // El nombre va en el asunto del correo: no admite saltos de línea
  if (!nombre || nombre.length > 100 || /[\r\n]/.test(nombre)) return { error: 'Escribe un nombre válido.' };
  if (correo.length > 254 || !CORREO_VALIDO.test(correo)) return { error: 'Escribe un correo válido para poder responderte.' };
  if (!whatsapp) return { error: 'Escribe un WhatsApp válido. Si no es de Colombia, incluye el indicativo, por ejemplo +52 55 1234 5678.' };
  if (!mensaje) return { error: 'Cuéntame qué necesitas.' };
  if (mensaje.length > 5000) return { error: 'El mensaje es demasiado largo. Resúmelo en menos de 5000 caracteres.' };
  return { datos: { nombre, correo, whatsapp, mensaje } };
}

/*
  Cuenta los envíos por visitante en KV. La IP se guarda solo como hash y la clave
  caduca con su ventana de 15 minutos. KV tarda unos segundos en sincronizarse entre
  regiones: el límite es aproximado, suficiente para frenar el spam de un formulario.
*/
export async function superaLimite(kv, ip, limite = LIMITE_ENVIOS) {
  const resumen = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip));
  const hash = [...new Uint8Array(resumen)].map((b) => b.toString(16).padStart(2, '0')).join('');
  const ventana = Math.floor(Date.now() / (VENTANA_SEGUNDOS * 1000));
  const clave = `envios:${ventana}:${hash}`;

  const usados = Number(await kv.get(clave)) || 0;
  // Al superar el límite no se escribe: un abusador no gasta el cupo diario de escrituras de KV
  if (usados >= limite) return true;
  await kv.put(clave, String(usados + 1), { expirationTtl: VENTANA_SEGUNDOS });
  return false;
}

const responder = (estado, cuerpo) => Response.json(cuerpo, { status: estado });

export async function atenderContacto(peticion, { enviar, kv, limite }) {
  try {
    const ip = peticion.headers.get('cf-connecting-ip') ?? 'desconocida';
    if (await superaLimite(kv, ip, limite)) {
      return responder(429, { error: 'Enviaste varios mensajes seguidos. Inténtalo de nuevo en unos minutos.' });
    }

    const crudo = await peticion.text();
    if (new TextEncoder().encode(crudo).length > TAMANO_MAXIMO) {
      return responder(413, { error: 'La solicitud no es válida.' });
    }

    let cuerpo;
    try {
      cuerpo = JSON.parse(crudo);
    } catch {
      return responder(400, { error: 'La solicitud no es válida.' });
    }

    // Campo oculto que solo llenan los robots: se responde bien y no se envía nada
    if (cuerpo?.sitio) return responder(200, { ok: true });

    const { datos, error } = validarContacto(cuerpo);
    if (error) return responder(400, { error });

    await enviar(datos);
    return responder(200, { ok: true });
  } catch (e) {
    console.error('No se pudo enviar el mensaje:', e.message);
    return responder(502, { error: 'No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.' });
  }
}
