// ── 1. SELECTORES DE ELEMENTOS PARA EVENTOS DE LA TIENDA ────────────────
const buscador = document.querySelector("#buscador");
const filtros = document.querySelector("#filtros");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("form");
const selectorOrden = document.querySelector("#orden");
const checkDisponibles = document.querySelector("#soloDisponibles");

let categoriaActiva = "todos";
let textoBuscado = "";
let soloDisponiblesFiltro = false;
let ordenActual = "predeterminado";

// ── 2. FUNCIÓN DE ACTUALIZACIÓN DEL CATÁLOGO ────────────────────────────
function actualizar() {
  if (typeof productos === "undefined" || !Array.isArray(productos)) return;

  let filtrados = productos.filter(p => {
    const coincideCat = (categoriaActiva === "todos" || p.categoria === categoriaActiva);
    const busqueda = textoBuscado.toLowerCase().trim();
    const coincideTexto = busqueda === "" ||
      p.nombre.toLowerCase().includes(busqueda) ||
      (p.tipo && p.tipo.toLowerCase().includes(busqueda)) ||
      (p.descripcion && p.descripcion.toLowerCase().includes(busqueda));
    const coincideDisp = !soloDisponiblesFiltro || p.disponible;

    return coincideCat && coincideTexto && coincideDisp;
  });

  // Ordenamiento
  if (ordenActual === "nombre") {
    filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } else if (ordenActual === "precio-menor") {
    filtrados.sort((a, b) => a.precio - b.precio);
  } else if (ordenActual === "precio-mayor") {
    filtrados.sort((a, b) => b.precio - a.precio);
  }

  if (typeof render === "function") {
    render(filtrados);
  }

  if (resultado) {
    resultado.textContent = `Mostrando ${filtrados.length} de ${productos.length} prendas`;
  }
}

// ── 3. EVENTO INPUT PARA BÚSQUEDA EN TIEMPO REAL ────────────────────────
if (buscador) {
  buscador.addEventListener("input", (event) => {
    textoBuscado = event.target.value;
    actualizar();
  });
}

// ── 4. DELEGACIÓN DE EVENTOS EN BOTONES DE CATEGORÍA ────────────────────
if (filtros) {
  filtros.addEventListener("click", (event) => {
    const boton = event.target.closest("button");
    if (!boton) return;

    categoriaActiva = boton.dataset.categoria || "todos";

    filtros.querySelectorAll("button").forEach(b => b.classList.remove("activo"));
    boton.classList.add("activo");

    actualizar();
  });
}

// ── 5. EVENTOS DE ORDEN Y DISPONIBILIDAD ────────────────────────────────
if (selectorOrden) {
  selectorOrden.addEventListener("change", (e) => {
    ordenActual = e.target.value;
    actualizar();
  });
}

if (checkDisponibles) {
  checkDisponibles.addEventListener("change", (e) => {
    soloDisponiblesFiltro = e.target.checked;
    actualizar();
  });
}

// ── 6. SELECCIÓN DIRECTA DE PRENDAS ("Pedir prenda") ───────────────────
document.addEventListener("click", (e) => {
  const btnPedir = e.target.closest(".btn-pedir");
  if (!btnPedir) return;

  const nombrePrenda = btnPedir.dataset.nombre;
  const selectProducto = document.querySelector("#producto");
  const seccionPedido = document.querySelector("#pedido");

  if (selectProducto) {
    // Buscar la opción por texto o valor coincidente
    for (let i = 0; i < selectProducto.options.length; i++) {
      if (selectProducto.options[i].text.toLowerCase().includes(nombrePrenda.toLowerCase()) ||
          nombrePrenda.toLowerCase().includes(selectProducto.options[i].text.toLowerCase())) {
        selectProducto.selectedIndex = i;
        break;
      }
    }
  }

  if (seccionPedido) {
    seccionPedido.scrollIntoView({ behavior: "smooth" });
  }
});

// ── 7. VALIDACIÓN Y PROCESAMIENTO DEL FORMULARIO DE PEDIDOS ─────────────
if (formulario) {
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!formulario.reportValidity()) {
      return;
    }

    const fecha = formulario.querySelector("#fecha");
    if (fecha) {
      const hoy = new Date().toISOString().slice(0, 10);
      if (fecha.value < hoy) {
        fecha.setCustomValidity("La fecha de entrega no puede ser anterior a la fecha de hoy.");
        fecha.reportValidity();
        fecha.addEventListener("input", () => fecha.setCustomValidity(""), { once: true });
        return;
      }
    }

    const datos = Object.fromEntries(new FormData(formulario));
    const selectProducto = formulario.querySelector("#producto");
    const prendaTexto = selectProducto && selectProducto.selectedIndex >= 0
      ? selectProducto.options[selectProducto.selectedIndex].text
      : datos.producto;

    let mensajeAlerta = document.querySelector("#mensaje-pedido-exito");
    if (!mensajeAlerta) {
      mensajeAlerta = document.createElement("div");
      mensajeAlerta.id = "mensaje-pedido-exito";
      formulario.insertAdjacentElement("beforebegin", mensajeAlerta);
    }

    mensajeAlerta.className = "mensaje-exito";
    mensajeAlerta.innerHTML = `
      <h3>¡Pedido registrado con éxito!</h3>
      <p>Estimado/a <strong>${datos.nombre}</strong>, hemos registrado tu solicitud de <strong>${datos.cantidad} unidad(es) de ${prendaTexto}</strong>.</p>
      <p>Nos comunicaremos al teléfono <strong>${datos.telefono}</strong> para coordinar la entrega el <strong>${datos.fecha}</strong>.</p>
    `;
    mensajeAlerta.scrollIntoView({ behavior: "smooth", block: "nearest" });

    if (resultado) {
      resultado.textContent = `Pedido de ${datos.nombre} registrado con éxito.`;
    }

    formulario.reset();
  });
}

// ── 8. EXPRESIONES REGULARES DE VALIDACIÓN BOLIVIANA ───────────────────
const PATRONES = {
  telefono: /^[0-9]{7,8}$/,
  correo: /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i,
  ci: /^[0-9]{5,10}(-[0-9A-Za-z]{1,3})?$/
};

console.log("Validación teléfono La Paz/El Alto (ej. 71990990):", PATRONES.telefono.test("71990990"));
