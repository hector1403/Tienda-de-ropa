// ── 1. COMPROBAR CARGA DE JQUERY EN TIENDA DE ROPA ──────────────────────
if (typeof $ !== "undefined") {
  console.log("jQuery versión en SHOP CAMACHO ESTILOS:", $.fn.jquery);
}

// ── 2. SELECCIÓN COMPARADA EN CATÁLOGO DE MODA ───────────────────────────
const vanillaContenedor = document.querySelector("#productos");
const jqueryContenedor = $("#productos");

if (vanillaContenedor) {
  console.log("Contenedor de ropa (Vanilla):", vanillaContenedor instanceof HTMLElement);
}
if (typeof $ !== "undefined" && jqueryContenedor.length) {
  console.log("Colección jQuery de prendas:", jqueryContenedor.length);
}

// ── 3. COMPARACIÓN DE CLASES Y RESALTADO DE PRENDAS ─────────────────────
// Ejemplo de resaltar tarjetas con vanilla vs jQuery
function resaltarPrendaVanilla(selector) {
  const elemento = document.querySelector(selector);
  if (elemento) {
    elemento.classList.toggle("resaltado");
  }
}

function resaltarPrendaJQuery(selector) {
  if (typeof $ !== "undefined") {
    $(selector).toggleClass("resaltado");
  }
}

// ── 4. CONTEO DE PRENDAS EN CATÁLOGO ────────────────────────────────────
console.log("Tarjetas de ropa que cuenta vanilla:", document.querySelectorAll(".tarjeta").length);
if (typeof $ !== "undefined") {
  console.log("Tarjetas de ropa que cuenta jQuery:", $(".tarjeta").length);
}
