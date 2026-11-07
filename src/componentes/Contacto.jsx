import { useEffect, useRef, useState } from 'react';
import { CORREO } from '../datos.js';

const NOTA_INICIAL = 'Se abrirá tu correo con el mensaje listo para enviar.';

export function Contacto({ borrador }) {
  const campo = useRef(null);
  const seccion = useRef(null);
  const [mensaje, setMensaje] = useState('');
  const [nota, setNota] = useState(NOTA_INICIAL);

  // Viene de "Arma tu proyecto": deja el mensaje escrito y lleva al visitante hasta aquí
  useEffect(() => {
    if (!borrador) return;
    setMensaje(borrador.texto);
    setNota('Revisa el mensaje y envíalo con la flecha. Se abrirá tu correo.');
    seccion.current.scrollIntoView();
    campo.current.focus({ preventScroll: true });
  }, [borrador]);

  const enviar = (e) => {
    e.preventDefault();
    const texto = mensaje.trim();
    if (!texto) {
      campo.current.focus();
      return;
    }
    const asunto = encodeURIComponent('Proyecto desde tu portafolio');
    window.location.href = `mailto:${CORREO}?subject=${asunto}&body=${encodeURIComponent(texto)}`;
    setNota(`Si tu correo no se abrió, escríbeme directamente a ${CORREO}.`);
  };

  return (
    <section className="seccion contacto" id="contacto" ref={seccion} data-escena="retrato" data-a="Juan Sebastián Jiménez Valencia" data-b="Empresario y programador">
      <h2 className="head" data-reveal="">Hablemos de tu negocio</h2>
      <p className="contacto__prompt" data-reveal="" style={{ '--i': 1 }}>¿Qué te quita más tiempo cada semana?</p>
      <form className="campo" onSubmit={enviar} data-reveal="" style={{ '--i': 2 }}>
        <label className="sr" htmlFor="mensaje">Cuéntame qué necesitas</label>
        <input
          id="mensaje"
          ref={campo}
          type="text"
          required
          autoComplete="off"
          enterKeyHint="send"
          placeholder="Llevo los pedidos en un cuaderno…"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
        <button type="submit" className="campo__enviar" aria-label="Enviar mensaje">
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </form>
      <p className="contacto__nota" aria-live="polite" data-reveal="" style={{ '--i': 3 }}>{nota}</p>
      <p className="contacto__dato" data-reveal="" style={{ '--i': 4 }}>
        O escríbeme directamente a <a className="enlace enlace--marcado" href={`mailto:${CORREO}`}>{CORREO}</a>
      </p>
    </section>
  );
}
