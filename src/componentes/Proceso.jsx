const ETAPAS = [
  ['Antes de empezar', [
    ['Conversación sobre tu negocio', '1 llamada'],
    ['Plan de lo que se va a construir', '1 documento'],
    ['Propuesta con precio cerrado', '1 propuesta'],
  ]],
  ['Durante la construcción', [
    ['Avance en un enlace de prueba', 'cada semana'],
    ['Revisión contigo', 'cada semana'],
  ]],
  ['Al publicar', [
    ['Puesta en línea', '1 vez'],
    ['Copias de seguridad', 'cada día'],
    ['Capacitación de tu equipo', '1 sesión'],
  ]],
];

/* El proceso, impreso como un recibo */
export function Proceso() {
  let n = 0; // cada renglón del recibo entra un instante después del anterior
  return (
    <section className="proceso" id="proceso">
      <div className="proceso__texto">
        <h2 className="display" data-reveal="">Cómo trabajamos</h2>
        <p className="lead" data-reveal="" style={{ '--i': 1 }}>
          Sin meses de silencio. Ves tu proyecto funcionando desde las primeras semanas y siempre sabes qué sigue.
        </p>
      </div>
      <div className="recibo" data-reveal="recibo">
        {ETAPAS.map(([titulo, filas]) => (
          <div key={titulo}>
            <h3 style={{ '--n': n++ }}>{titulo}</h3>
            <ul>
              {filas.map(([que, cuanto]) => (
                <li key={que} style={{ '--n': n++ }}><span>{que}</span><i /><span>{cuanto}</span></li>
              ))}
            </ul>
          </div>
        ))}
        <p className="recibo__total" style={{ '--n': n }}><span>Tu proyecto funcionando</span><span>y es tuyo</span></p>
      </div>
    </section>
  );
}
