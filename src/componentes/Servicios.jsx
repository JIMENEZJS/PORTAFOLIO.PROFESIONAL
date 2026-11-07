const MODULOS = [
  {
    titulo: 'Páginas web y tiendas en línea',
    texto: 'Tu negocio abierto las 24 horas: páginas rápidas, que se ven bien en el celular y que tu cliente encuentra en Google. Pueden presentar tu empresa, vender tus productos o recibir reservas.',
    tecnico: 'JavaScript, React, SEO técnico, rendimiento y accesibilidad.',
  },
  {
    titulo: 'Chatbots con inteligencia artificial',
    texto: 'Un asistente que responde a tus clientes a cualquier hora con la información real de tu negocio: precios, horarios, disponibilidad o el estado de un pedido. Cuando la conversación lo necesita, se la pasa a una persona de tu equipo.',
    tecnico: 'Modelos de lenguaje, respuestas basadas en tus documentos y conexión con tus sistemas por API.',
  },
  {
    titulo: 'Automatizaciones',
    texto: 'Lo que hoy alguien hace a mano una y otra vez puede hacerse solo: enviar confirmaciones y recordatorios, generar facturas y reportes, pasar datos de un programa a otro o avisarte cuando algo requiere tu atención.',
    tecnico: 'Flujos por eventos, tareas programadas, webhooks e integraciones por API.',
  },
  {
    titulo: 'Sistemas y aplicaciones a medida',
    texto: 'Cuando ningún programa se ajusta a tu forma de trabajar, construyo el tuyo: paneles de pedidos, agendas, inventarios, portales para tus clientes y herramientas internas para tu equipo.',
    tecnico: 'React en la interfaz, Java o Supabase por detrás, según la complejidad del proyecto.',
  },
  {
    titulo: 'Tu información en orden y tus herramientas conectadas',
    texto: 'Paso lo que tienes en hojas de cálculo a un lugar seguro y ordenado, y conecto lo que ya usas (pagos, facturación, correo) para que nadie tenga que copiar datos a mano.',
    tecnico: 'PostgreSQL, Supabase, modelado y migración de datos, control de acceso por rol.',
  },
  {
    titulo: 'Soluciones para lo que no está en esta lista',
    texto: 'Si tienes un problema y sospechas que la tecnología puede resolverlo, cuéntamelo. También continúo sistemas que ya existen y te doy una opinión franca antes de que inviertas en algo nuevo.',
    tecnico: 'Programo en varios lenguajes y elijo la herramienta según el problema, no al revés.',
  },
];

export function Servicios() {
  return (
    <section className="seccion servicios" id="servicios" data-escena="perforadora" data-a="Perforadora de tarjetas Hollerith" data-b="Automatizar no es nuevo">
      <h2 className="head" data-reveal="">Qué te ofrezco</h2>
      <p className="servicios__intro" data-reveal="" style={{ '--i': 1 }}>
        No necesitas saber de programación para trabajar conmigo. Si tú o tu equipo sí saben, debajo de cada servicio está el detalle técnico.
      </p>
      {MODULOS.map((m) => (
        <article className="modulo" key={m.titulo} data-reveal="">
          <h3 className="sub">{m.titulo}</h3>
          <p>{m.texto}</p>
          <p className="modulo__tecnico"><strong>En términos técnicos:</strong> {m.tecnico}</p>
        </article>
      ))}
    </section>
  );
}
