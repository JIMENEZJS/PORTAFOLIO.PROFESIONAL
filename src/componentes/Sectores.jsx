const SECTORES = [
  ['Restaurantes y cafeterías', 'Menú digital, pedidos y domicilios en un solo panel, reservas de mesa y un asistente que responde por WhatsApp.'],
  ['Abogados y firmas legales', 'Seguimiento de casos y vencimientos, agenda de consultas y un portal donde tu cliente ve en qué va su proceso.'],
  ['Médicos y consultorios', 'Citas en línea con recordatorios automáticos, menos pacientes que no llegan y la información de cada paciente ordenada.'],
  ['Odontologías', 'Agenda por profesional y por silla, recordatorios de control y un asistente que resuelve dudas sobre tratamientos y horarios.'],
  ['Tiendas y comercios', 'Tienda en línea, control de inventario y pagos registrados sin copiar nada a mano.'],
  ['Salones de belleza, spas y gimnasios', 'Reservas por servicio, membresías y mensajes que traen de vuelta a tus clientes.'],
  ['Tu negocio, sea cual sea', 'Si atiendes clientes, agendas citas o manejas información, hay algo que se puede simplificar. Cuéntame cómo trabajas y lo diseñamos juntos.'],
];

export function Sectores() {
  return (
    <section className="seccion sectores" id="sectores" data-escena="pedido" data-a="Para cualquier negocio" data-b="Me adapto a tu negocio">
      <h2 className="display" data-reveal="">Me adapto a <span className="acento">tu negocio</span></h2>
      <p className="sectores__intro" data-reveal="" style={{ '--i': 1 }}>
        No importa a qué te dediques. Escucho cómo trabajas y construyo una solución amigable para ti y tu equipo, y asequible para tu presupuesto. Estos son solo algunos ejemplos de lo que es posible:
      </p>
      <dl className="sectores__lista" data-reveal="">
        {SECTORES.map(([sector, ejemplo]) => (
          <div key={sector}>
            <dt>{sector}</dt>
            <dd>{ejemplo}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
