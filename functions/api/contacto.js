import { WorkerMailer } from 'worker-mailer';
import { atenderContacto } from '../_contacto.js';
import { armarCorreo } from '../_correo.js';

/* POST /api/contacto: envía cada mensaje del formulario por SMTP. */
export function onRequestPost({ request, env }) {
  const puerto = Number(env.SMTP_PUERTO ?? 465);

  const enviar = (datos) => {
    const { asunto, texto, html } = armarCorreo(datos);
    return WorkerMailer.send(
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
        reply: datos.correo,
        subject: asunto,
        text: texto,
        html,
      },
    );
  };

  return atenderContacto(request, { enviar, kv: env.LIMITE });
}
