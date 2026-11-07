import { useState } from 'react';
import { NECESIDADES } from '../proyecto.js';

/* Lo interactivo: el visitante marca lo que necesita y ve, en palabras simples, qué se construiría */
export function Armador({ onConversar }) {
  const [seleccion, setSeleccion] = useState(['presencia', 'atender']);
  const piezas = Object.entries(NECESIDADES).filter(([clave]) => seleccion.includes(clave));

  const alternar = (clave) =>
    setSeleccion((s) => (s.includes(clave) ? s.filter((c) => c !== clave) : [...s, clave]));

  const conversar = () => {
    onConversar({
      texto: piezas.length
        ? `Quiero conversar sobre un proyecto con: ${piezas.map(([, n]) => n.pieza.toLowerCase()).join(', ')}.`
        : 'Quiero conversar sobre un proyecto para mi negocio.',
    });
  };

  return (
    <section className="armador" id="proyecto">
      <div className="armador__col">
        <h2 className="display" data-reveal="">Arma <span className="acento">tu proyecto</span></h2>
        <p className="lead" data-reveal="" style={{ '--i': 1 }}>
          Marca lo que necesita tu negocio y mira lo que construiríamos. Es un punto de partida: lo ajustamos juntos cuando hablemos.
        </p>
        <fieldset className="opciones">
          <legend className="sr">Lo que necesita tu negocio</legend>
          {Object.entries(NECESIDADES).map(([clave, { nombre }]) => (
            <label className="opcion" key={clave}>
              <input type="checkbox" checked={seleccion.includes(clave)} onChange={() => alternar(clave)} />
              {nombre}
            </label>
          ))}
        </fieldset>
        <div className="armador__acciones">
          <button type="button" className="boton" onClick={conversar}>Conversar sobre este proyecto</button>
        </div>
      </div>
      <div className="armador__plan" aria-live="polite" data-reveal="" style={{ '--i': 1 }}>
        <h3 className="armador__titulo">Tu proyecto</h3>
        {piezas.length ? (
          <ul>
            {piezas.map(([clave, { pieza, detalle }]) => (
              <li key={clave}><strong>{pieza}</strong> {detalle}</li>
            ))}
          </ul>
        ) : (
          <p>Marca al menos una opción. Si no sabes por dónde empezar, cuéntame qué te quita tiempo y lo resolvemos desde ahí.</p>
        )}
      </div>
    </section>
  );
}
