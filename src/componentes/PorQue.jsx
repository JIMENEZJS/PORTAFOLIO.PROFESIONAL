const RAZONES = [
  ['Hablas con quien construye', 'Sin intermediarios ni teléfono roto. La persona que entiende tu negocio es la misma que escribe el código.'],
  ['Sabes el precio antes de empezar', 'Después de la primera conversación recibes una propuesta con precio cerrado, así conoces el total desde el principio.'],
  ['Ves avances cada semana', 'Tienes un enlace de prueba para ver tu proyecto funcionando y lo revisamos juntos. Nada de meses de silencio.'],
  ['Todo queda a tu nombre', 'El código, los datos y el dominio son tuyos desde el primer día.'],
  ['Te hablo con franqueza', 'Si algo no vale la pena o no soy la persona indicada para hacerlo, te lo digo antes de que inviertas.'],
];

export function PorQue() {
  return (
    <section className="seccion porque" id="por-que" data-escena="retrato" data-a="Por qué elegirme" data-b="Hablas con quien construye">
      <h2 className="display" data-reveal="">Por qué <span className="acento">elegirme</span></h2>
      {RAZONES.map(([titulo, texto]) => (
        <article className="modulo" key={titulo} data-reveal="">
          <h3 className="sub">{titulo}</h3>
          <p>{texto}</p>
        </article>
      ))}
      <p className="porque__accion" data-reveal=""><a className="boton" href="#contacto">Cuéntame tu proyecto</a></p>
    </section>
  );
}
