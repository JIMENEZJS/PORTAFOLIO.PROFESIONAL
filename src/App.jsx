import { useState } from 'react';
import { useEntradas, useSeccionActiva } from './hooks.js';
import { Escenario } from './componentes/Escenario.jsx';
import { Inicio } from './componentes/Inicio.jsx';
import { Carta } from './componentes/Carta.jsx';
import { Cambios } from './componentes/Cambios.jsx';
import { Servicios } from './componentes/Servicios.jsx';
import { Armador } from './componentes/Armador.jsx';
import { Sistemas } from './componentes/Sistemas.jsx';
import { Proceso } from './componentes/Proceso.jsx';
import { PorQue } from './componentes/PorQue.jsx';
import { Preguntas } from './componentes/Preguntas.jsx';
import { Contacto } from './componentes/Contacto.jsx';
import { Pie } from './componentes/Pie.jsx';

const FOTOS_INICIO = [
  { id: 'retrato', src: 'retrato.jpg', width: 1086, height: 1449, prioridad: true, alt: 'Juan Sebastián Jiménez Valencia de traje negro sobre un fondo gris oscuro, con las manos en los bolsillos, mirando hacia un lado.' },
  { id: 'medio', src: 'retrato-medio.jpg', width: 700, height: 933, alt: 'Juan Sebastián en un plano más cercano, de traje negro y camiseta negra.' },
  { id: 'pedido', src: 'pedido.jpg', width: 2250, height: 1500, alt: 'Una persona toca la pantalla de una tablet con el menú de un restaurante para registrar un pedido.' },
  { id: 'trabajo', src: 'trabajo.jpg', width: 2250, height: 1500, alt: 'Manos escribiendo en el teclado de un computador portátil con código en la pantalla.' },
];

const FOTOS_CIERRE = [
  { id: 'manos', src: 'retrato-manos.jpg', width: 560, height: 599, alt: 'Detalle del traje negro de Juan Sebastián, con una pulsera de plata y la mano en el bolsillo.' },
  { id: 'retrato', src: 'retrato.jpg', width: 1086, height: 1449, alt: 'Juan Sebastián Jiménez Valencia de traje negro sobre un fondo gris oscuro.' },
];

export default function App() {
  // El proyecto armado por el visitante llega al formulario de contacto
  const [borrador, setBorrador] = useState(null);
  const inicio = useSeccionActiva({ escena: 'retrato', a: 'Empresario y programador', b: 'Web, IA y automatización' });
  const cierre = useSeccionActiva({ escena: 'retrato', a: 'Por qué elegirme', b: 'Hablas con quien construye' });
  useEntradas();

  return (
    <>
      <a className="saltar" href="#principal">Saltar al contenido</a>
      <main id="principal">
        <div className="split" ref={inicio.ref}>
          <Escenario fotos={FOTOS_INICIO} activa={inicio.activa} abrir />
          <div className="read">
            <Inicio />
            <Carta />
            <Cambios />
            <Servicios />
          </div>
        </div>

        <Armador onConversar={setBorrador} />
        <Sistemas />
        <Proceso />

        <div className="split" ref={cierre.ref}>
          <Escenario fotos={FOTOS_CIERRE} activa={cierre.activa} clase="stage--cierre" />
          <div className="read">
            <PorQue />
            <Preguntas />
            <Contacto borrador={borrador} />
          </div>
        </div>
      </main>
      <Pie />
    </>
  );
}
