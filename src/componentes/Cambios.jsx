const CAMBIOS = [
  ['Pedidos anotados en un cuaderno', 'Un panel donde cada pedido queda registrado'],
  ['Clientes esperando una respuesta', 'Un asistente que responde a cualquier hora'],
  ['Facturas y reportes hechos a mano', 'Documentos que se generan solos'],
  ['Datos copiados de un programa a otro', 'Tus herramientas conectadas entre sí'],
  ['Un Excel con toda la información', 'Tus datos ordenados en un lugar seguro'],
];

export function Cambios() {
  return (
    <section className="seccion cambios" id="cambios" data-escena="pedido" data-a="Qué cambia en tu negocio" data-b="Del cuaderno al sistema">
      <h2 className="display" data-reveal="">Qué cambia en <span className="acento">tu negocio</span></h2>
      <table className="cambios__tabla" data-reveal="">
        <thead>
          <tr><th scope="col">Hoy</th><th scope="col">Con tu solución</th></tr>
        </thead>
        <tbody>
          {CAMBIOS.map(([hoy, despues]) => (
            <tr key={hoy}><td>{hoy}</td><td>{despues}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
