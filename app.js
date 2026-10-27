// ── 1. CONSTANTES DEL NEGOCIO ───────────────────────────────────────────
const negocio = "SHOP CAMACHO ESTILOS";
const anioFundacion = 2026;
const slogan = "Siempre de Alta Calidad";

// ── 2. VARIABLES DE INVENTARIO (PRENDAS EN TIENDA) ────────────────────────
let pantalonesEnVitrina = 35;
let camisasEnVitrina = 40;
let chompasEnVitrina = 28;
let busosEnVitrina = 32;

// Total de prendas iniciales en exhibición
let totalPrendasVitrina = pantalonesEnVitrina + camisasEnVitrina + chompasEnVitrina + busosEnVitrina;

// ── 3. TIPOS DE DATOS ───────────────────────────────────────────────────
const precioPromedio = 65.0; // Precio promedio en Bolivianos (Bs)
const tiendaAbierta = true;
const descuentoTemporada = null; // Sin descuento especial por el momento
let vendedorTurno; // Variable sin asignar

console.log("Tipos de datos:", typeof negocio, typeof precioPromedio, typeof tiendaAbierta);
console.log("Descuento actual:", descuentoTemporada, "| Vendedor asignado:", vendedorTurno);

// ── 4. TEMPLATE LITERALS ────────────────────────────────────────────────
const resumenTienda = `${negocio} fundada en ${anioFundacion}: cuenta con ${totalPrendasVitrina} prendas listas en tienda (Pantalones: ${pantalonesEnVitrina}, Camisas: ${camisasEnVitrina}, Chompas: ${chompasEnVitrina}, Busos: ${busosEnVitrina}).`;
console.log(resumenTienda);

// ── 5. COMPARACIONES DE DISPONIBILIDAD ───────────────────────────────────
console.log("¿Pantalones son 35 con igualdad débil?", "35" == pantalonesEnVitrina);
console.log("¿Pantalones son 35 con igualdad estricta?", "35" === pantalonesEnVitrina);
console.log("¿Hay stock de busos suficiente?", busosEnVitrina > 20);

// ── 6. ACTUALIZACIÓN DINÁMICA DEL ENCABEZADO ────────────────────────────
const subtitulo = document.querySelector("header p");
if (subtitulo) {
  subtitulo.textContent = `${slogan} • Moda Femenina, Masculina y Kids`;
}
