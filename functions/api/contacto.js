import { WorkerMailer } from 'worker-mailer';
import { atenderContacto } from '../_contacto.js';

/* POST /api/contacto: envía cada mensaje del formulario por SMTP. */
export function onRequestPost({ request, env }) {
  const puerto = Number(env.SMTP_PUERTO ?? 465);

  const enviar = ({ nombre, correo, mensaje }) =>
    WorkerMailer.send(
      {
        host: env.SMTP_SERVIDOR ?? 'smtp.gmail.com',
        port: puerto,
        secure: puerto === 465,
        credentials: { username: env.SMTP_USUARIO, password: env.SMTP_CLAVE },
        authType: ['plain', 'login'],
      },
      {
        from: { name: 'Portafolio', email: env.SMTP_USUARIO },
        to: env.CONTACTO_PARA,
        reply: correo,
        subject: `Nuevo mensaje de ${nombre} desde tu portafolio`,
        // Solo texto plano: lo que escribe el visitante nunca se interpreta como HTML
        text: `Nombre: ${nombre}\nCorreo: ${correo}\n\n${mensaje}`,
      },
    );

  return atenderContacto(request, { enviar, kv: env.LIMITE });
}
