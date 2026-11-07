/* Arma el correo que recibes por cada mensaje del formulario: versión HTML y de texto plano. */

const FIRMA = 'Juan Sebastián';

// Todo lo que escribe el visitante pasa por aquí antes de entrar al HTML
const escapar = (v) =>
  String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const formatoWhatsapp = (n) =>
  n.startsWith('57') && n.length === 12 ? `+57 ${n.slice(2, 5)} ${n.slice(5, 8)} ${n.slice(8)}` : `+${n}`;

const enlaceWhatsapp = (numero, texto) =>
  `https://wa.me/${numero}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`;

function opcionesWhatsapp({ nombre, whatsapp }) {
  const saludo = `Hola ${nombre.split(/\s+/)[0]}, soy ${FIRMA}.`;
  return [
    {
      titulo: 'Confirmar que lo recibí',
      detalle: 'Saludo corto para abrir la conversación',
      enlace: enlaceWhatsapp(whatsapp, `${saludo} Recibí tu mensaje desde mi portafolio y ya lo estoy revisando. ¿Tienes unos minutos para conversar?`),
    },
    {
      titulo: 'Pedir más detalles',
      detalle: 'Para entender el negocio antes de proponer',
      enlace: enlaceWhatsapp(whatsapp, `${saludo} Gracias por escribirme. Para darte una propuesta clara, ¿me cuentas un poco más sobre tu negocio y qué te gustaría resolver primero?`),
    },
    {
      titulo: 'Proponer una llamada',
      detalle: 'Para acordar día y hora',
      enlace: enlaceWhatsapp(whatsapp, `${saludo} Leí tu mensaje y me gustaría que lo habláramos en una llamada corta. ¿Qué día y hora te quedan bien?`),
    },
  ];
}

function enlaceCorreo({ nombre, correo }) {
  const destino = encodeURIComponent(correo).replace('%40', '@');
  const asunto = encodeURIComponent('Sobre tu mensaje en mi portafolio');
  const cuerpo = encodeURIComponent(`Hola ${nombre.split(/\s+/)[0]},\n\n`);
  return `mailto:${destino}?subject=${asunto}&body=${cuerpo}`;
}

const SERIF = "Rockwell,'Roboto Slab',Georgia,'Times New Roman',serif";
const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const dato = (etiqueta, valor, enlace) => `
            <tr>
              <td style="padding:12px 0;border-top:1px solid #e9e7e1;font:500 13px/1.4 ${SANS};color:#5b5d63;width:88px;vertical-align:top;">${etiqueta}</td>
              <td style="padding:12px 0;border-top:1px solid #e9e7e1;font:400 16px/1.4 ${SANS};color:#1e1f22;word-break:break-word;">
                <a href="${escapar(enlace)}" style="color:#1e1f22;text-decoration:underline;">${escapar(valor)}</a>
              </td>
            </tr>`;

const boton = (texto, enlace, fondo) => `
            <tr>
              <td style="padding:0 0 10px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center" bgcolor="${fondo}" style="background:${fondo};">
                      <a href="${escapar(enlace)}" style="display:block;padding:15px 20px;font:600 16px/1.3 ${SANS};color:#ffffff;text-decoration:none;">${escapar(texto)}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>`;

const opcion = ({ titulo, detalle, enlace }) => `
            <tr>
              <td style="padding:0 0 8px;">
                <a href="${escapar(enlace)}" style="display:block;padding:12px 14px;border:1px solid #c9c6bd;text-decoration:none;">
                  <span style="display:block;font:600 15px/1.3 ${SANS};color:#0b6b47;">${escapar(titulo)}</span>
                  <span style="display:block;padding-top:2px;font:400 13px/1.4 ${SANS};color:#5b5d63;">${escapar(detalle)}</span>
                </a>
              </td>
            </tr>`;

export function armarCorreo(datos) {
  const { nombre, correo, whatsapp, mensaje } = datos;
  const telefono = formatoWhatsapp(whatsapp);
  const chat = enlaceWhatsapp(whatsapp);
  const responder = enlaceCorreo(datos);
  const opciones = opcionesWhatsapp(datos);

  const texto = [
    `Nuevo mensaje de ${nombre}`,
    '',
    `Correo: ${correo}`,
    `WhatsApp: ${telefono}`,
    '',
    'Mensaje:',
    mensaje,
    '',
    '---',
    `Abrir el chat de WhatsApp: ${chat}`,
    ...opciones.map((o) => `${o.titulo}: ${o.enlace}`),
    `Responder por correo: ${correo}`,
  ].join('\n');

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>Nuevo mensaje de ${escapar(nombre)}</title>
</head>
<body style="margin:0;padding:0;background:#f7f6f3;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapar(mensaje.slice(0, 110))}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f6f3;">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;">
        <tr>
          <td style="padding:28px 24px 8px;border-top:4px solid #c2410c;">
            <p style="margin:0 0 6px;font:600 13px/1.4 ${SANS};color:#c2410c;">Nuevo mensaje desde tu portafolio</p>
            <h1 style="margin:0;font:600 28px/1.2 ${SERIF};color:#1e1f22;word-break:break-word;">${escapar(nombre)}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 24px 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${dato('WhatsApp', telefono, chat)}${dato('Correo', correo, responder)}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 24px 24px;">
            <p style="margin:0 0 8px;font:500 13px/1.4 ${SANS};color:#5b5d63;">Su mensaje</p>
            <div style="padding:16px 18px;background:#f7f6f3;border-left:3px solid #c2410c;font:400 16px/1.55 ${SANS};color:#1e1f22;word-break:break-word;">${escapar(mensaje).replace(/\r?\n/g, '<br>')}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:0 24px 16px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${boton('Abrir chat de WhatsApp', chat, '#0b6b47')}${boton('Responder por correo', responder, '#1e1f22')}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 24px 24px;border-top:1px solid #e9e7e1;">
            <p style="margin:12px 0 2px;font:600 15px/1.4 ${SANS};color:#1e1f22;">Respuestas rápidas por WhatsApp</p>
            <p style="margin:0 0 12px;font:400 13px/1.4 ${SANS};color:#5b5d63;">Abren el chat con el texto escrito. Puedes editarlo antes de enviarlo.</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${opciones.map(opcion).join('')}
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  return { asunto: `Nuevo mensaje de ${nombre} desde tu portafolio`, texto, html };
}
