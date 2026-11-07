const PREGUNTAS = [
  ['¿Necesito saber de tecnología?', 'No. Tú me cuentas cómo funciona tu negocio y yo me encargo de la parte técnica, explicándote cada decisión con palabras simples.'],
  ['Tengo un equipo técnico, ¿podemos trabajar juntos?', 'Sí. Podemos revisar la arquitectura y las herramientas, y trabajar sobre lo que tu equipo ya tiene. Elijo la tecnología según el proyecto y te explico por qué.'],
  ['¿Cuánto cuesta un proyecto?', 'Depende de lo que haya que construir. Después de la primera conversación te envío una propuesta con precio cerrado, así sabes el total antes de empezar.'],
  ['¿Qué necesito tener listo?', 'Saber qué te quita tiempo hoy. Si además tienes el Excel o el cuaderno con el que trabajas, mejor: ahí está la mitad del diseño.'],
  ['¿Un chatbot con IA se puede equivocar?', 'Sí, puede pasar, y por eso lo limito a la información de tu negocio, lo probamos con preguntas reales de tus clientes y definimos cuándo debe pasarle la conversación a una persona.'],
  ['¿Qué se puede automatizar?', 'Casi cualquier tarea que se repite y sigue siempre los mismos pasos. Si dudas, cuéntamela y te digo con franqueza si vale la pena automatizarla.'],
  ['¿Mis datos de Excel se pueden pasar a un sistema?', 'Sí. Limpio la información, la paso al sistema nuevo y revisamos juntos que los totales coincidan.'],
  ['¿De quién es lo que construyes?', 'Tuyo. El código, los datos y el dominio quedan a tu nombre desde el primer día.'],
  ['¿Puedes continuar un sistema que ya existe?', 'Sí. Primero lo reviso y te digo con franqueza qué vale la pena conservar y qué no.'],
  ['Mi idea no aparece aquí, ¿igual me sirves?', 'Probablemente sí. Cuéntamela: si no soy la persona indicada para hacerla, también te lo digo.'],
  ['¿Qué pasa después de publicar?', 'Sigues teniendo con quién hablar. Acordamos el soporte en la propuesta, para que sepas qué incluye y qué no.'],
];

export function Preguntas() {
  return (
    <section className="seccion preguntas" id="preguntas" data-escena="manos" data-a="Preguntas frecuentes" data-b="Respuestas directas">
      <h2 className="head" data-reveal="">Preguntas frecuentes</h2>
      <div className="preguntas__texto">
        {PREGUNTAS.map(([pregunta, respuesta]) => (
          <p key={pregunta} data-reveal=""><strong>{pregunta}</strong> {respuesta}</p>
        ))}
      </div>
    </section>
  );
}
