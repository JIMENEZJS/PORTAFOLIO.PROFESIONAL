export function Pie() {
  return (
    <footer className="pie">
      <p>Juan Sebastián Jiménez Valencia, soluciones tecnológicas amigables y asequibles para todo tipo de negocio</p>
      <p className="pie__enlaces">
        <a className="enlace" href="#servicios">Servicios</a>
        <a className="enlace" href="#proyecto">Arma tu proyecto</a>
        <a className="enlace" href="#contacto">Contacto</a>
      </p>
      <p className="pie__fin">
        <a className="enlace" href="privacidad.html">Privacidad</a>
        <a className="enlace" href="terminos.html">Términos</a>
        <span>2026</span>
      </p>
      <p className="pie__creditos">
        Fotografías de apoyo: <a href="https://www.pexels.com/license/">Pexels</a>.
      </p>
    </footer>
  );
}
