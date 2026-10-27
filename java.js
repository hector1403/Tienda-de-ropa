// ── 1. CONSTANTES DE LA TIENDA DE ROPA ──────────────────────────────────
const negocio = "SHOP CAMACHO ESTILOS";
const anioFundacion = 2026;
const eslogan = "Siempre de Alta Calidad";

// ── 2. VARIABLES DE PRECIOS BASE POR MODA ────────────────────────────────
let precioBaseFemenina = 60; // Bs base
precioBaseFemenina = 65;

let precioBaseMasculina = 70; // Bs base
precioBaseMasculina = 70;

let precioBaseKids = 50; // Bs base
precioBaseKids = 45;

// Variables de stock por tipo de prenda
let stockPantalones = 83; // Total pantalones dama, varón, kids
let stockCamisas = 67;    // Total camisas
let stockChompas = 60;    // Total chompas
let stockBusos = 84;      // Total busos

// ── 3. TIPOS DE DATOS ───────────────────────────────────────────────────
const envioGratisDesde = 200; // Envíos gratis en compras mayores a 200 Bs
const abiertoHoy = true;
const promocionDelDia = null;
let telefonoTienda = "71990990";

console.log("Tipos:", typeof negocio, typeof envioGratisDesde, typeof abiertoHoy);
console.log("Promoción activa:", promocionDelDia, "| Teléfono oficial:", telefonoTienda);

// ── 4. TEMPLATE LITERALS POR CATEGORÍA ──────────────────────────────────
const resumenFemenino = `${negocio}: Moda Femenina con Pantalones, Blusas/Camisas, Chompas y Busos desde Bs ${precioBaseFemenina}.`;
console.log(resumenFemenino);

const resumenMasculino = `${negocio}: Moda Masculina con Jeans, Camisas Oxford, Chompas y Busos desde Bs ${precioBaseMasculina}.`;
console.log(resumenMasculino);

const resumenKids = `${negocio}: Moda Kids con Joggers, Camisitas, Chompas abrigadas y Busos deportivos desde Bs ${precioBaseKids}.`;
console.log(resumenKids);

// ── 5. COMPARACIONES ────────────────────────────────────────────────────
console.log("¿65 es igual débil a precio femenino?", "65" == precioBaseFemenina);
console.log("¿65 es igual estricto a precio femenino?", "65" === precioBaseFemenina);
console.log("¿Stock de busos es mayor que 50?:", stockBusos > 50);

// ── 6. MENSAJE EN PÁGINA ────────────────────────────────────────────────
const subtitulo = document.querySelector("header p");
if (subtitulo) {
  subtitulo.textContent = `${eslogan} | Moda Femenina, Masculina y Kids (Pantalones, Camisas, Chompas, Busos)`;
}
