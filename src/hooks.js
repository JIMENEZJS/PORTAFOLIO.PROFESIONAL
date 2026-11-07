import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

// Una banda fina en el centro de la pantalla: lo que la cruza es lo que se está leyendo
const BANDA = { rootMargin: '-45% 0px -45% 0px' };

/* Las entradas al hacer scroll: una sola vez por elemento */
export function useEntradas() {
  useEffect(() => {
    const io = new IntersectionObserver((lista) => {
      for (const e of lista) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
      // El margen superior enorme cuenta como visto lo que ya quedó arriba, p. ej. al saltar con un ancla
    }, { rootMargin: '100000px 0px -10% 0px', threshold: 0.01 });
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* Qué sección con data-escena está leyendo el visitante dentro de un tramo */
export function useSeccionActiva(inicial) {
  const ref = useRef(null);
  const [activa, setActiva] = useState(inicial);
  useEffect(() => {
    const io = new IntersectionObserver((lista) => {
      for (const e of lista) {
        if (e.isIntersecting) {
          const { escena, a, b } = e.target.dataset;
          setActiva({ escena, a, b });
        }
      }
    }, BANDA);
    ref.current.querySelectorAll('[data-escena]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return { ref, activa };
}

/* Qué elemento de una lista está en el centro de la pantalla */
export function useIndiceActivo() {
  const ref = useRef(null);
  const [indice, setIndice] = useState(0);
  useEffect(() => {
    const elementos = [...ref.current.querySelectorAll('[data-indice]')];
    const io = new IntersectionObserver((lista) => {
      for (const e of lista) {
        if (e.isIntersecting) setIndice(elementos.indexOf(e.target));
      }
    }, BANDA);
    elementos.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return { ref, indice };
}

export function useMediaQuery(consulta) {
  return useSyncExternalStore(
    (avisar) => {
      const mq = matchMedia(consulta);
      mq.addEventListener('change', avisar);
      return () => mq.removeEventListener('change', avisar);
    },
    () => matchMedia(consulta).matches
  );
}
