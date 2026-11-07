export function Inicio() {
  return (
    <header className="hero" data-escena="retrato" data-a="Empresario y programador" data-b="Web, IA y automatización">
      <nav className="nav" aria-label="Principal">
        <div className="nav__lado">
          <a className="enlace" href="#servicios">Servicios</a>
          <a className="enlace nav__extra" href="#sistemas">Ejemplos</a>
        </div>
        <a className="nav__marca" href="#principal" aria-label="Inicio, Juan Sebastián Jiménez Valencia">JSJV</a>
        <div className="nav__lado nav__lado--fin">
          <a className="enlace nav__extra" href="#proceso">Proceso</a>
          <a className="enlace" href="#contacto">Contacto</a>
        </div>
      </nav>
      <div className="hero__copia">
        <h1 className="display lineas">
          <span className="linea"><span data-linea style={{ '--i': 0 }}>Juan Sebastián</span></span>
          <span className="linea"><span data-linea style={{ '--i': 1 }}>Jiménez Valencia</span></span>
        </h1>
        <p className="hero__frase" data-carga style={{ '--d': '420ms' }}>
          Soy empresario y programador. Creo páginas web, chatbots con inteligencia artificial, automatizaciones y soluciones tecnológicas a la medida de tu negocio.
        </p>
        <a className="boton" href="#contacto" data-carga style={{ '--d': '500ms' }}>Cuéntame tu proyecto</a>
      </div>
    </header>
  );
}
