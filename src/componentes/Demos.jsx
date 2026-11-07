/* Fragmentos de interfaz con datos de ejemplo. Los números cuadran entre sí. */

function Marco({ clase, children }) {
  return <div className={`demo ${clase ?? ''}`} data-ui="">{children}</div>;
}

function Cabeza({ titulo, nota, cifra }) {
  return (
    <div className="ui__cabeza">
      <div>
        <p className="ui__titulo">{titulo}</p>
        <p className="ui__nota">{nota}</p>
      </div>
      {cifra && <p className="ui__cifra">{cifra}</p>}
    </div>
  );
}

const CONVERSACION = [
  ['cliente', 'Hola, ¿tienen café en grano de 500 g?', '10:32'],
  ['asistente', 'Sí, nos quedan 6 unidades. ¿Lo quieres a domicilio o prefieres recogerlo en la tienda?', '10:32'],
  ['cliente', 'A domicilio. ¿Me pueden dar un precio especial si llevo las 6?', '10:33'],
  ['asistente', 'Eso lo define el equipo de ventas. Ya les pasé tu conversación y te responderán por aquí.', '10:33'],
];

/* Una conversación con la apariencia de WhatsApp: el visitante reconoce el canal al instante */
export function Asistente({ clase }) {
  return (
    <Marco clase={clase}>
      <div className="wa">
        <div className="wa__cabeza">
          <svg className="wa__atras" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M12.5 4 6.5 10l6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="wa__avatar" aria-hidden="true">A</span>
          <div>
            <p className="wa__nombre">Asistente de la tienda</p>
            <p className="wa__estado">en línea</p>
          </div>
        </div>
        <div className="wa__mensajes">
          {CONVERSACION.map(([quien, texto, hora]) => (
            <p key={texto} className={`wa__msg wa__msg--${quien}`}>
              <span className="sr">{quien === 'cliente' ? 'Cliente: ' : 'Asistente: '}</span>{texto}
              <span className="wa__meta">
                {hora}
                {quien === 'cliente' && (
                  <svg className="wa__visto" width="16" height="11" viewBox="0 0 16 11" aria-hidden="true">
                    <path d="M1 6l3 3 6-7.5M6.5 8.2 7.3 9l6-7.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </p>
          ))}
        </div>
        <div className="wa__barra" aria-hidden="true">
          <span className="wa__campo">Mensaje</span>
          <span className="wa__enviar">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path d="M2.5 15.5 16 9 2.5 2.5v5l8 1.5-8 1.5z" fill="currentColor" />
            </svg>
          </span>
        </div>
      </div>
    </Marco>
  );
}

const PASOS = [
  ['Entra un pedido por la tienda', 'Inicio'],
  ['Se registra el pago', 'Automático'],
  ['Se genera la factura', 'Automático'],
  ['Se descuenta del inventario', 'Automático'],
  ['El cliente recibe la confirmación', 'Automático'],
  ['Se avisa a bodega para despachar', 'Automático'],
];

export function Automatizacion({ clase }) {
  const automaticos = PASOS.filter(([, tipo]) => tipo === 'Automático').length;
  return (
    <Marco clase={clase}>
      <Cabeza titulo="Cuando entra un pedido" nota="Corre solo, cada vez" cifra={`${automaticos} pasos`} />
      <table className="tabla">
        <thead><tr><th scope="col">Qué pasa</th><th scope="col" className="num">Cómo</th></tr></thead>
        <tbody>
          {PASOS.map(([paso, tipo]) => (
            <tr key={paso}><td>{paso}</td><td className="num">{tipo}</td></tr>
          ))}
        </tbody>
      </table>
    </Marco>
  );
}

const PEDIDOS = [
  [1042, 'Laura M.', 'Entregado', 184000],
  [1043, 'Andrés P.', 'Despachado', 320000],
  [1044, 'Marta R.', 'Despachado', 96000],
  [1045, 'Camilo S.', 'Despachado', 452000],
  [1046, 'Diana G.', 'Pendiente', 72000],
  [1047, 'Felipe T.', 'Pendiente', 160000],
];
const POR_HORA = [[9, 1], [10, 2], [11, 0], [12, 1], [13, 0], [14, 2]];
const pesos = (n) => `$${n.toLocaleString('es-CO')}`;

export function Pedidos({ clase }) {
  const total = PEDIDOS.reduce((suma, p) => suma + p[3], 0);
  const pendientes = PEDIDOS.filter((p) => p[2] === 'Pendiente').length;
  return (
    <Marco clase={clase}>
      <Cabeza titulo="Pedidos de hoy" nota={`${PEDIDOS.length} pedidos, ${pendientes} por despachar`} cifra={pesos(total)} />
      <div className="ui__barras" role="img" aria-label="Pedidos por hora: uno a las 9, dos a las 10, uno a las 12 y dos a las 14.">
        {POR_HORA.map(([hora, n]) => (
          <div key={hora}><span style={{ '--h': `${n * 50}%` }} /><small>{hora} h</small></div>
        ))}
      </div>
      <table className="tabla">
        <thead><tr><th scope="col">Pedido</th><th scope="col">Cliente</th><th scope="col">Estado</th><th scope="col" className="num">Total</th></tr></thead>
        <tbody>
          {PEDIDOS.map(([id, cliente, estado, monto]) => (
            <tr key={id} className={estado === 'Pendiente' ? 'alerta' : undefined}>
              <td>{id}</td><td>{cliente}</td><td>{estado}</td><td className="num">{pesos(monto)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Marco>
  );
}

const SEMANA = [['Lun', '11010110'], ['Mar', '01101101'], ['Mié', '10011010'], ['Jue', '11100101'], ['Vie', '01010011']];
const HORAS = [9, 10, 11, 12, 14, 15, 16, 17];
const NOMBRES = ['Laura', 'Andrés', 'Marta', 'Camilo', 'Diana', 'Felipe'];

export function Agenda({ clase }) {
  const citas = SEMANA.reduce((suma, [, d]) => suma + d.split('1').length - 1, 0);
  const cupos = SEMANA.length * HORAS.length;
  let n = 0;
  return (
    <Marco clase={clase}>
      <Cabeza titulo="Agenda de la semana" nota={`${cupos} cupos en total`} cifra={`${citas} citas`} />
      <div className="agenda" role="img" aria-label={`Agenda semanal con ${citas} citas y ${cupos - citas} cupos libres.`}>
        <span />
        {SEMANA.map(([dia]) => <span className="agenda__dia" key={dia}>{dia}</span>)}
        {HORAS.flatMap((hora, fila) => [
          <span key={hora}>{hora} h</span>,
          ...SEMANA.map(([dia, patron]) =>
            patron[fila] === '1'
              ? <span className="agenda__cita" key={dia + hora}>{NOMBRES[n++ % NOMBRES.length]}</span>
              : <span className="agenda__libre" key={dia + hora} />
          ),
        ])}
      </div>
      <p className="ui__nota">Quedan {cupos - citas} cupos libres. Miércoles y viernes son los días con más espacio.</p>
    </Marco>
  );
}

const PRODUCTOS = [
  ['Café en grano 500 g', 20, 6],
  ['Filtros de papel', 50, 32],
  ['Taza de cerámica', 15, 12],
  ['Café molido 250 g', 20, 44],
  ['Prensa francesa', 5, 9],
  ['Molino manual', 4, 11],
  ['Termo de acero', 6, 18],
  ['Bolsa de regalo', 30, 75],
];

export function Inventario({ clase }) {
  const porPedir = PRODUCTOS.filter(([, min, hay]) => hay < min).length;
  return (
    <Marco clase={clase}>
      <Cabeza titulo="Inventario" nota={`${PRODUCTOS.length} productos activos`} cifra={`${porPedir} por pedir`} />
      <table className="tabla">
        <thead><tr><th scope="col">Producto</th><th scope="col" className="num">Mínimo</th><th scope="col" className="num">Hay</th></tr></thead>
        <tbody>
          {PRODUCTOS.map(([nombre, min, hay]) => (
            <tr key={nombre} className={hay < min ? 'alerta' : undefined}>
              <td>{nombre}</td><td className="num">{min}</td><td className="num">{hay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Marco>
  );
}

const PERMISOS = [
  ['Ver clientes', 'Sí', 'Sí', 'Sí'],
  ['Crear pedidos', 'Sí', 'Sí', 'No'],
  ['Mover inventario', 'Sí', 'No', 'Sí'],
  ['Ver pagos', 'Sí', 'Sí', 'No'],
  ['Administrar usuarios', 'Sí', 'No', 'No'],
];

export function Accesos({ clase }) {
  return (
    <Marco clase={clase}>
      <Cabeza titulo="Accesos por rol" nota={`3 roles, ${PERMISOS.length} permisos`} />
      <table className="tabla tabla--roles">
        <thead><tr><th scope="col">Permiso</th><th scope="col">Admin</th><th scope="col">Ventas</th><th scope="col">Operaciones</th></tr></thead>
        <tbody>
          {PERMISOS.map(([permiso, ...roles]) => (
            <tr key={permiso}><td>{permiso}</td>{roles.map((r, i) => <td key={i}>{r}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </Marco>
  );
}
