import { useIndiceActivo, useMediaQuery } from '../hooks.js';
import { Accesos, Agenda, Asistente, Automatizacion, Inventario, Pedidos } from './Demos.jsx';

const SISTEMAS = [
  { nombre: 'Chatbot con inteligencia artificial', Demo: Asistente, stack: 'Modelos de lenguaje, API, PostgreSQL', texto: 'Tu cliente pregunta a cualquier hora y recibe una respuesta con los datos reales de tu negocio. Si hace falta una persona, la conversación pasa a tu equipo.' },
  { nombre: 'Automatización de pedidos', Demo: Automatizacion, stack: 'JavaScript, webhooks, API', texto: 'Entra un pedido y todo lo demás ocurre solo: el pago se registra, la factura se genera y tu cliente recibe la confirmación. Nadie tiene que acordarse de hacerlo.' },
  { nombre: 'Panel de pedidos', Demo: Pedidos, stack: 'React, Supabase, PostgreSQL', texto: 'Todo lo que entró hoy, lo que falta por despachar y cuánto suma, en una sola pantalla. Se acaba el “déjame revisar el WhatsApp”.' },
  { nombre: 'Agenda de reservas', Demo: Agenda, stack: 'React, PostgreSQL', texto: 'Tu cliente reserva solo, a cualquier hora, y dos personas no pueden quedar en el mismo cupo. Lo garantiza el sistema, no la memoria de nadie.' },
  { nombre: 'Control de inventario', Demo: Inventario, stack: 'Java, PostgreSQL', texto: 'Cada entrada y salida queda registrada, así que las existencias siempre cuadran. Sabes qué pedir antes de que se acabe.' },
  { nombre: 'Accesos por rol', Demo: Accesos, stack: 'Supabase, PostgreSQL', texto: 'Cada persona de tu equipo ve solo lo que le toca. Y no es que el resto esté escondido: el sistema de verdad no se lo entrega a quien no tiene permiso.' },
];

/* Segundo tramo: lo fijo ya no es el traje, es el sistema.
   En el teléfono cada muestra va junto a su texto. */
export function Sistemas() {
  const { ref, indice } = useIndiceActivo();
  const ancha = useMediaQuery('(min-width: 900px)');

  const clase = (k) => (k === indice ? 'is-on' : k < indice ? 'is-pasada' : undefined);

  return (
    <div className="split" id="sistemas" ref={ref}>
      {ancha && (
        <figure className="stage stage--ui">
          <div className="stage__demos">
            {SISTEMAS.map(({ nombre, Demo }, k) => <Demo key={nombre} clase={clase(k)} />)}
          </div>
          <figcaption className="stage__barra">
            <span>{SISTEMAS[indice].nombre}</span>
            <span>Datos de ejemplo</span>
          </figcaption>
        </figure>
      )}

      <section className="read seccion sistemas">
        <h2 className="head" data-reveal="">Así se ve en la práctica</h2>
        <p data-reveal="" style={{ '--i': 1 }}>
          Seis muestras hechas para este sitio, con datos de ejemplo. Son el tipo de herramienta que un negocio termina usando todos los días.
        </p>
        {SISTEMAS.map(({ nombre, Demo, stack, texto }, k) => (
          <article className={`sistema ${k === indice ? 'is-on' : ''}`} data-indice={k} key={nombre}>
            <h3 className="sub">{nombre}</h3>
            <p>{texto}</p>
            <p className="sistema__stack">{stack}</p>
            {!ancha && <Demo />}
          </article>
        ))}
      </section>
    </div>
  );
}
