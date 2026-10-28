/**
 * SHOP CAMACHO ESTILOS - script.js
 * Control de funcionalidades interactivas:
 * - Renderizado y catálogo dinámico con soporte para Moda Femenina, Moda Masculina y Moda Kids
 * - Prendas especializadas: Pantalones, Camisas, Chompas y Busos
 * - Búsqueda en tiempo real (por nombre, tipo de prenda o descripción)
 * - Filtrado por categoría con botones activos
 * - Ordenamiento por nombre y precio (ascendente / descendente)
 * - Filtro de disponibilidad
 * - Selección rápida de producto desde la tarjeta ("Pedir prenda")
 * - Validación y confirmación del formulario de pedidos
 */

document.addEventListener("DOMContentLoaded", () => {
  // ── 1. SELECTORES DE ELEMENTOS DEL DOM ───────────────────────────────────
  const buscador = document.querySelector("#buscador");
  const contenedorFiltros = document.querySelector("#filtros");
  const selectorOrden = document.querySelector("#orden");
  const checkSoloDisponibles = document.querySelector("#soloDisponibles");
  const resultadoTexto = document.querySelector("#resultado");
  const contenedorProductos = document.querySelector("#productos");
  const formularioPedido = document.querySelector("#pedido form") || document.querySelector("form");
  const selectProducto = document.querySelector("#producto");

  if (!contenedorProductos) {
    console.warn("No se encontró el contenedor #productos");
    return;
  }

  // ── 2. ESTADO INICIAL ───────────────────────────────────────────────────
  let categoriaActiva = "todos";
  let textoBuscado = "";
  let criterioOrden = "predeterminado";
  let filtrarSoloDisponibles = false;

  // Si existe render() y productos en datos.js, aseguramos el catálogo dinámico
  if (typeof render === "function" && typeof productos !== "undefined" && Array.isArray(productos)) {
    // Si ya existe render, sincronizamos el catálogo desde datos.js
    render(productos);
  }

  // Colección de artículos presentes en el DOM (para trabajar tanto si vienen de datos.js o de HTML inicial)
  let articulosOriginales = Array.from(contenedorProductos.querySelectorAll(".tarjeta, article"));

  // Guardar índice original para restaurar el orden predeterminado
  articulosOriginales.forEach((art, index) => {
    if (!art.dataset.originalIndex) {
      art.dataset.originalIndex = index;
    }
  });

  // ── 3. FUNCIÓN PRINCIPAL DE FILTRADO Y ORDENAMIENTO ─────────────────────
  function actualizarCatalogo() {
    let visibles = articulosOriginales.filter(art => {
      const cat = (art.dataset.categoria || "").toLowerCase();
      const coincideCat = (categoriaActiva === "todos" || cat === categoriaActiva);

      const texto = (art.textContent || "").toLowerCase();
      const tipo = (art.dataset.tipo || "").toLowerCase();
      const query = textoBuscado.toLowerCase().trim();

      const coincideTexto = query === "" || texto.includes(query) || tipo.includes(query);

      const disponible = art.dataset.available === "true" || !art.classList.contains("agotado");
      const coincideDisponibilidad = !filtrarSoloDisponibles || disponible;

      return coincideCat && coincideTexto && coincideDisponibilidad;
    });

    // Ordenamiento
    visibles.sort((a, b) => {
      const precioA = parseFloat(a.dataset.price) || 0;
      const precioB = parseFloat(b.dataset.price) || 0;
      const nombreA = (a.querySelector("h3") ? a.querySelector("h3").textContent : "").trim().toLowerCase();
      const nombreB = (b.querySelector("h3") ? b.querySelector("h3").textContent : "").trim().toLowerCase();

      switch (criterioOrden) {
        case "nombre":
          return nombreA.localeCompare(nombreB);
        case "precio-menor":
          return precioA - precioB;
        case "precio-mayor":
          return precioB - precioA;
        case "predeterminado":
        default:
          return (parseInt(a.dataset.originalIndex, 10) || 0) - (parseInt(b.dataset.originalIndex, 10) || 0);
      }
    });

    // Limpiar contenedor y reinsertar elementos filtrados
    contenedorProductos.innerHTML = "";

    if (visibles.length === 0) {
      const mensajeVacio = document.createElement("div");
      mensajeVacio.className = "sin-resultados";
      mensajeVacio.innerHTML = `
        <p>No se encontraron prendas que coincidan con tu búsqueda.</p>
        <p><small>Prueba buscando: <em>pantalón, camisa, chompa, buso</em> o cambia la categoría.</small></p>
      `;
      contenedorProductos.appendChild(mensajeVacio);
    } else {
      visibles.forEach(art => {
        contenedorProductos.appendChild(art);
      });
    }

    // Actualizar indicador de resultados
    if (resultadoTexto) {
      resultadoTexto.textContent = `Mostrando ${visibles.length} de ${articulosOriginales.length} prendas`;
    }
  }

  // ── 4. EVENTOS DE BÚSQUEDA Y CONTROLES ───────────────────────────────────
  if (buscador) {
    buscador.addEventListener("input", (e) => {
      textoBuscado = e.target.value.trim();
      actualizarCatalogo();
    });
  }

  if (contenedorFiltros) {
    contenedorFiltros.addEventListener("click", (e) => {
      const boton = e.target.closest("button");
      if (!boton) return;

      categoriaActiva = boton.dataset.categoria || "todos";

      contenedorFiltros.querySelectorAll("button").forEach(b => b.classList.remove("activo"));
      boton.classList.add("activo");

      actualizarCatalogo();
    });
  }

  if (selectorOrden) {
    selectorOrden.addEventListener("change", (e) => {
      criterioOrden = e.target.value;
      actualizarCatalogo();
    });
  }

  if (checkSoloDisponibles) {
    checkSoloDisponibles.addEventListener("change", (e) => {
      filtrarSoloDisponibles = e.target.checked;
      actualizarCatalogo();
    });
  }

  // ── 5. ACCIÓN "PEDIR PRENDA" DESDE LAS TARJETAS ─────────────────────────
  contenedorProductos.addEventListener("click", (e) => {
    const botonPedir = e.target.closest(".btn-pedir");
    if (!botonPedir) return;

    const nombrePrenda = botonPedir.dataset.nombre || (botonPedir.closest("article").querySelector("h3") ? botonPedir.closest("article").querySelector("h3").textContent : "");

    if (selectProducto && nombrePrenda) {
      // Buscar coincidencia en las opciones del formulario
      let encontrado = false;
      for (let i = 0; i < selectProducto.options.length; i++) {
        const opcionTexto = selectProducto.options[i].text.toLowerCase();
        const prendaBuscada = nombrePrenda.toLowerCase();

        if (opcionTexto.includes(prendaBuscada) || prendaBuscada.includes(opcionTexto.replace(/^[^-]+-\s*/, ""))) {
          selectProducto.selectedIndex = i;
          encontrado = true;
          break;
        }
      }

      // Si no coincide exactamente, seleccionar una opción afín por categoría
      if (!encontrado) {
        const tarjeta = botonPedir.closest("article");
        const cat = tarjeta ? tarjeta.dataset.categoria : "";
        for (let i = 0; i < selectProducto.options.length; i++) {
          if (selectProducto.options[i].value === cat) {
            selectProducto.selectedIndex = i;
            break;
          }
        }
      }
    }

    // Desplazamiento suave al formulario
    const seccionPedido = document.querySelector("#pedido");
    if (seccionPedido) {
      seccionPedido.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // ── 6. VALIDACIÓN Y PROCESAMIENTO DEL FORMULARIO DE PEDIDOS ─────────────
  if (formularioPedido) {
    formularioPedido.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!formularioPedido.reportValidity()) {
        return;
      }

      const inputFecha = formularioPedido.querySelector("#fecha");
      if (inputFecha) {
        const hoy = new Date().toISOString().slice(0, 10);
        if (inputFecha.value < hoy) {
          inputFecha.setCustomValidity("La fecha de entrega no puede ser anterior al día de hoy.");
          inputFecha.reportValidity();
          inputFecha.addEventListener("input", () => inputFecha.setCustomValidity(""), { once: true });
          return;
        }
      }

      const datos = Object.fromEntries(new FormData(formularioPedido));

      // Texto de la prenda seleccionada
      const nombreProducto = selectProducto && selectProducto.selectedIndex >= 0
        ? selectProducto.options[selectProducto.selectedIndex].text
        : datos.producto;

      // Mensaje de éxito
      let alertaExito = document.querySelector("#mensaje-pedido-exito");
      if (!alertaExito) {
        alertaExito = document.createElement("div");
        alertaExito.id = "mensaje-pedido-exito";
        formularioPedido.insertAdjacentElement("beforebegin", alertaExito);
      }

      alertaExito.className = "mensaje-exito";
      alertaExito.innerHTML = `
        <h3>¡Pedido registrado con éxito!</h3>
        <p>Muchas gracias, <strong>${datos.nombre}</strong>. Hemos registrado tu pedido de <strong>${datos.cantidad} unidad(es) de ${nombreProducto}</strong>.</p>
        <p>Fecha acordada: <strong>${datos.fecha}</strong>. Nos comunicaremos contigo al teléfono <strong>${datos.telefono || "proporcionado"}</strong> para coordinar la entrega.</p>
        ${datos.notas ? `<p><small>Indicaciones: "${datos.notas}"</small></p>` : ""}
      `;

      alertaExito.scrollIntoView({ behavior: "smooth", block: "nearest" });

      if (resultadoTexto) {
        resultadoTexto.textContent = `Pedido de ${datos.nombre} registrado con éxito.`;
      }

      formularioPedido.reset();
    });
  }

  // ── 7. INICIALIZACIÓN INICIAL DEL CATÁLOGO ───────────────────────────────
  actualizarCatalogo();
});
