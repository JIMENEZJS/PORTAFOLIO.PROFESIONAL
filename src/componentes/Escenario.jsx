import { useEffect, useRef, useState } from 'react';

const ruta = (archivo) => `${import.meta.env.BASE_URL}assets/${archivo}`;

/* La mitad que no se mueve: fotos que se funden según la sección que se lee */
export function Escenario({ fotos, activa, clase = '', abrir = false }) {
  const ref = useRef(null);
  const [fuera, setFuera] = useState(false);

  // La deriva lenta de la foto se detiene cuando el escenario no está a la vista
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setFuera(!e.isIntersecting));
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={ref} className={`stage ${clase} ${fuera ? 'is-fuera' : ''}`} data-open={abrir || undefined}>
      <div className="stage__fotos">
        {fotos.map((f) => (
          <img
            key={f.id}
            className={f.id === activa.escena ? 'is-on' : undefined}
            data-foto={f.id}
            src={ruta(f.src)}
            width={f.width}
            height={f.height}
            alt={f.id === activa.escena ? f.alt : ''}
            fetchPriority={f.prioridad ? 'high' : undefined}
          />
        ))}
      </div>
      <figcaption className="stage__barra">
        <span>{activa.a}</span>
        <span>{activa.b}</span>
      </figcaption>
    </figure>
  );
}
