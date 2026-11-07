import { useEffect, useRef, useState } from 'react';
import { API_URL, CORREO } from '../datos.js';

const VACIO = { nombre: '', correo: '', mensaje: '', sitio: '' };

export function Contacto({ borrador }) {
  const primerCampo = useRef(null);
  const seccion = useRef(null);
  const [campos, setCampos] = useState(VACIO);
  const [enviando, setEnviando] = useState(false);
  const [nota, setNota] = useState('');

  // Viene de "Arma tu proyecto": deja el mensaje escrito y lleva al visitante hasta aquí
  useEffect(() => {
    if (!borrador) return;
    setCampos((c) => ({ ...c, mensaje: borrador.texto }));
    setNota('Revisa el mensaje y completa tus datos para enviarlo.');
    seccion.current.scrollIntoView();
    primerCampo.current.focus({ preventScroll: true });
  }, [borrador]);

  const cambiar = ({ target }) => setCampos((c) => ({ ...c, [target.name]: target.value }));

  const enviar = async (e) => {
    e.preventDefault();
    if (enviando) return;
    setEnviando(true);
    setNota('Enviando…');
    try {
      const res = await fetch(`${API_URL}/api/contacto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campos),
      });
      if (!res.ok) throw new Error();
      setNota('Mensaje enviado');
      setCampos(VACIO);
    } catch {
      setNota('Mensaje no enviado');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="seccion contacto" id="contacto" ref={seccion} data-escena="retrato" data-a="Juan Sebastián Jiménez Valencia" data-b="Empresario y programador">
      <h2 className="head" data-reveal="">Hablemos de tu negocio</h2>
      <p className="contacto__prompt" data-reveal="" style={{ '--i': 1 }}>¿Qué te quita más tiempo cada semana?</p>
      <form className="formulario" onSubmit={enviar} data-reveal="" style={{ '--i': 2 }}>
        <label>
          Tu nombre
          <input ref={primerCampo} name="nombre" type="text" required maxLength={100} autoComplete="name" value={campos.nombre} onChange={cambiar} />
        </label>
        <label>
          Tu correo
          <input name="correo" type="email" required maxLength={254} autoComplete="email" value={campos.correo} onChange={cambiar} />
        </label>
        <label>
          Cuéntame qué necesitas
          <textarea name="mensaje" required rows={5} maxLength={5000} placeholder="Llevo los pedidos en un cuaderno…" value={campos.mensaje} onChange={cambiar} />
        </label>
        {/* Campo trampa para robots: una persona nunca lo ve ni lo llena */}
        <div className="trampa" aria-hidden="true">
          <label>
            No llenes este campo
            <input name="sitio" type="text" tabIndex={-1} autoComplete="off" value={campos.sitio} onChange={cambiar} />
          </label>
        </div>
        <button type="submit" className="boton" disabled={enviando}>{enviando ? 'Enviando…' : 'Enviar mensaje'}</button>
      </form>
      <p className="contacto__nota" aria-live="polite" data-reveal="" style={{ '--i': 3 }}>{nota}</p>
      <p className="contacto__dato" data-reveal="" style={{ '--i': 4 }}>
        O escríbeme directamente a <a className="enlace enlace--marcado" href={`mailto:${CORREO}`}>{CORREO}</a>
      </p>
    </section>
  );
}
