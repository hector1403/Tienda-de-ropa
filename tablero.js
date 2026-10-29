const CLAVE_PEDIDO = "shop-camacho:pedido";
const formatoPrecio = (precio) => `Bs ${Number(precio).toFixed(2)}`;

function obtenerPrendasDisponibles() {
  if (typeof productos === "undefined" || !Array.isArray(productos)) return [];
  return productos.filter((producto) => producto.disponible && Number(producto.stock) > 0);
}

function cargarPedido() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_PEDIDO) || "{}");
    if (!guardado || typeof guardado !== "object" || Array.isArray(guardado)) return {};

    return Object.fromEntries(
      Object.entries(guardado).filter(([id, cantidad]) => {
        const producto = obtenerPrendasDisponibles().find((prenda) => prenda.id === id);
        return producto && Number.isInteger(cantidad) && cantidad > 0;
      }).map(([id, cantidad]) => {
        const producto = obtenerPrendasDisponibles().find((prenda) => prenda.id === id);
        return [id, Math.min(cantidad, Number(producto.stock))];
      })
    );
  } catch (error) {
    console.warn("No se pudo recuperar el pedido guardado:", error);
    return {};
  }
}

let pedido = cargarPedido();

function guardarPedido() {
  try {
    localStorage.setItem(CLAVE_PEDIDO, JSON.stringify(pedido));
  } catch (error) {
    console.warn("No se pudo guardar el pedido:", error);
  }
}

function crearControl(caption, ariaLabel, accion, id, clase) {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = clase;
  boton.textContent = caption;
  boton.setAttribute("aria-label", ariaLabel);
  boton.dataset.accion = accion;
  boton.dataset.id = id;
  return boton;
}

function renderCatalogo() {
  const lista = document.querySelector("#lista-prendas-disponibles");
  const total = document.querySelector("#total-disponibles");
  if (!lista || !total) return;

  const disponibles = obtenerPrendasDisponibles();
  lista.replaceChildren();
  total.textContent = `${disponibles.length} ${disponibles.length === 1 ? "prenda disponible" : "prendas disponibles"}`;

  if (!disponibles.length) {
    const vacio = document.createElement("li");
    vacio.className = "catalogo-vacio";
    vacio.textContent = "No hay prendas disponibles en este momento.";
    lista.append(vacio);
    return;
  }

  disponibles.forEach((producto) => {
    const ficha = document.createElement("li");
    ficha.className = "ficha";
    ficha.draggable = true;
    ficha.dataset.id = producto.id;

    if (producto.imagen) {
      const imagen = document.createElement("img");
      imagen.className = "ficha-imagen";
      imagen.src = producto.imagen;
      imagen.alt = "";
      imagen.loading = "lazy";
      ficha.append(imagen);
    }

    const detalle = document.createElement("span");
    detalle.className = "ficha-texto ficha-detalle";

    const nombre = document.createElement("strong");
    nombre.className = "ficha-nombre";
    nombre.textContent = producto.nombre;

    const precio = document.createElement("span");
    precio.className = "ficha-precio";
    precio.textContent = formatoPrecio(producto.precio);

    const stock = document.createElement("span");
    stock.className = "ficha-stock";
    stock.textContent = `${producto.stock} disponibles`;
    detalle.append(nombre, precio, stock);

    ficha.append(detalle, crearControl("+", `Agregar ${producto.nombre}`, "agregar", producto.id, "btn-agregar-prenda"));
    lista.append(ficha);
  });
}

function renderPedido() {
  const lista = document.querySelector("#lista-pedido");
  const totalElemento = document.querySelector("#total-pedido");
  const cantidadElemento = document.querySelector("#cantidad-pedido");
  const botonContinuar = document.querySelector("#continuar-pedido");
  if (!lista || !totalElemento || !cantidadElemento) return;

  const disponibles = obtenerPrendasDisponibles();
  const lineas = Object.entries(pedido).flatMap(([id, cantidad]) => {
    const producto = disponibles.find((prenda) => prenda.id === id);
    return producto ? [{ producto, cantidad }] : [];
  });
  const cantidadTotal = lineas.reduce((suma, linea) => suma + linea.cantidad, 0);
  const precioTotal = lineas.reduce((suma, linea) => suma + linea.producto.precio * linea.cantidad, 0);

  lista.replaceChildren();
  cantidadElemento.textContent = `${cantidadTotal} ${cantidadTotal === 1 ? "unidad" : "unidades"} · ${lineas.length} ${lineas.length === 1 ? "prenda" : "prendas"}`;
  totalElemento.textContent = formatoPrecio(precioTotal);
  if (botonContinuar) botonContinuar.disabled = lineas.length === 0;

  if (!lineas.length) {
    const vacio = document.createElement("li");
    vacio.className = "pedido-vacio";
    vacio.textContent = "Arrastra una prenda aquí o agrégala desde el catálogo.";
    lista.append(vacio);
    return;
  }

  lineas.forEach(({ producto, cantidad }) => {
    const ficha = document.createElement("li");
    ficha.className = "ficha pedido-ficha";

    const detalle = document.createElement("span");
    detalle.className = "ficha-texto ficha-detalle";

    const nombre = document.createElement("strong");
    nombre.className = "ficha-nombre";
    nombre.textContent = producto.nombre;

    const precio = document.createElement("span");
    precio.className = "ficha-precio";
    precio.textContent = `${formatoPrecio(producto.precio)} c/u · ${formatoPrecio(producto.precio * cantidad)}`;
    detalle.append(nombre, precio);

    const controles = document.createElement("div");
    controles.className = "control-cantidad";
    controles.append(
      crearControl("−", `Quitar una unidad de ${producto.nombre}`, "restar", producto.id, ""),
    );

    const salida = document.createElement("output");
    salida.textContent = cantidad;
    controles.append(salida);
    controles.append(
      crearControl("+", `Agregar una unidad de ${producto.nombre}`, "agregar", producto.id, ""),
      crearControl("×", `Eliminar ${producto.nombre} del pedido`, "eliminar", producto.id, "btn-quitar-prenda")
    );

    ficha.append(detalle, controles);
    lista.append(ficha);
  });
}

function renderTablero() {
  renderCatalogo();
  renderPedido();
}

function actualizarPedido(accion, id) {
  const producto = obtenerPrendasDisponibles().find((prenda) => prenda.id === id);
  if (!producto) return;

  const cantidadActual = pedido[id] || 0;
  if (accion === "agregar" && cantidadActual < Number(producto.stock)) {
    pedido[id] = cantidadActual + 1;
  } else if (accion === "restar" && cantidadActual > 1) {
    pedido[id] = cantidadActual - 1;
  } else if (accion === "restar" || accion === "eliminar") {
    delete pedido[id];
  }

  guardarPedido();
  renderPedido();
}

function inicializarEventosPedido() {
  const catalogo = document.querySelector("#lista-prendas-disponibles");
  const areaPedido = document.querySelector("#area-pedido");
  const listaPedido = document.querySelector("#lista-pedido");
  const botonVaciar = document.querySelector("#vaciar-pedido");
  const botonContinuar = document.querySelector("#continuar-pedido");
  if (!catalogo || !areaPedido || !listaPedido) return;

  catalogo.addEventListener("click", (event) => {
    const boton = event.target.closest("[data-accion='agregar']");
    if (boton) actualizarPedido("agregar", boton.dataset.id);
  });

  catalogo.addEventListener("dragstart", (event) => {
    const ficha = event.target.closest(".ficha[data-id]");
    if (!ficha) return;
    event.dataTransfer.setData("text/plain", ficha.dataset.id);
    event.dataTransfer.effectAllowed = "copy";
    ficha.classList.add("arrastrando");
  });

  catalogo.addEventListener("dragend", (event) => {
    event.target.closest(".ficha")?.classList.remove("arrastrando");
  });

  areaPedido.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    areaPedido.classList.add("encima");
  });

  areaPedido.addEventListener("dragleave", (event) => {
    if (!areaPedido.contains(event.relatedTarget)) areaPedido.classList.remove("encima");
  });

  areaPedido.addEventListener("drop", (event) => {
    event.preventDefault();
    areaPedido.classList.remove("encima");
    const id = event.dataTransfer.getData("text/plain");
    if (obtenerPrendasDisponibles().some((producto) => producto.id === id)) {
      actualizarPedido("agregar", id);
    }
  });

  listaPedido.addEventListener("click", (event) => {
    const boton = event.target.closest("[data-accion]");
    if (boton) actualizarPedido(boton.dataset.accion, boton.dataset.id);
  });

  botonVaciar?.addEventListener("click", () => {
    pedido = {};
    guardarPedido();
    renderPedido();
  });

  botonContinuar?.addEventListener("click", () => {
    const disponibles = obtenerPrendasDisponibles();
    const lineas = Object.entries(pedido).flatMap(([id, cantidad]) => {
      const producto = disponibles.find((prenda) => prenda.id === id);
      return producto ? [{ producto, cantidad }] : [];
    });
    if (!lineas.length) return;

    const total = lineas.reduce((suma, linea) => suma + linea.producto.precio * linea.cantidad, 0);
    document.dispatchEvent(new CustomEvent("pedido:continuar", { detail: { lineas, total } }));
    document.querySelector("#pedido")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function iniciarTableroModulo() {
  inicializarEventosPedido();
  renderTablero();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarTableroModulo);
} else {
  iniciarTableroModulo();
}