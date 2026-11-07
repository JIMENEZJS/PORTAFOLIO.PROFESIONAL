export function Carta() {
  return (
    <section className="seccion carta" id="carta" data-escena="medio" data-a="El empresario y el código" data-b="La misma persona">
      <h2 className="head" data-reveal="">El negocio y el código</h2>
      <div className="carta__texto">
        <p data-reveal="" style={{ '--i': 1 }}>Cuando una empresa contrata desarrollo, casi siempre termina hablando con dos personas: la que entiende el negocio y la que escribe el código. Entre las dos se pierde la mitad de lo que pediste.</p>
        <p data-reveal="" style={{ '--i': 2 }}>Conmigo es la misma persona. Soy empresario, así que antes de abrir el editor pregunto qué vendes, cómo cobras y qué te quita tiempo cada semana.</p>
        <figure className="obturador" data-reveal="obturador">
          <div className="obturador__marco">
            <img
              src={`${import.meta.env.BASE_URL}assets/libro-cuentas.jpg`}
              width="1200"
              height="1105"
              alt="Libro de cuentas antiguo con cubierta jaspeada rota y una etiqueta escrita a mano que dice Accounts Payable."
            />
          </div>
          <figcaption>Un libro de cuentas por pagar, en uso entre 1919 y 1928.</figcaption>
        </figure>
        <p data-reveal="">Tu negocio ya funciona con algo: un cuaderno, un Excel, un grupo de WhatsApp. Mi trabajo es convertirlo en una solución que no se pierda, que ahorre tiempo y que tu equipo de verdad use. A veces es una página web, a veces un chatbot o una automatización, y a veces un sistema completo.</p>
        <p data-reveal="" style={{ '--i': 1 }}>Si no sabes de tecnología, no hace falta: te explico cada decisión con palabras simples. Si sabes, podemos hablar de arquitectura y herramientas. Programo en varios lenguajes, como JavaScript y Java, y elijo cada herramienta según lo que tu proyecto necesita.</p>
      </div>
      <p className="carta__firma" data-reveal="" style={{ '--i': 2 }}>
        <em>Juan Sebastián Jiménez Valencia</em>
        <span>Empresario y programador</span>
      </p>
    </section>
  );
}
