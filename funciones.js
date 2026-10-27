// ── 1. COERCIÓN Y TIPOS EN TIENDA DE ROPA ──────────────────────────────────
console.log("5" + 3); // "53" (concatenación de código de prenda)
console.log("5" - 3); // 2 (conversión numérica para cálculo de unidades)
console.log(Number("60") + 10); // 70 Bs (suma explícita de precio de prenda + accesorio)

// ── 2. VALORES FALSY EN CONTROL DE STOCK ─────────────────────────────────
console.log("Stock cero es falsy:", Boolean(0));
console.log("Talla no especificada es falsy:", Boolean(""));
console.log("Código '0' es truthy:", Boolean("0"));
console.log("Lista vacía de prendas es truthy:", Boolean([]));

// ── 3. CONTROL DE FLUJO DE PRENDAS ──────────────────────────────────────
let stockPrenda = 15; // Unidades de pantalones/camisas en bodega

if (stockPrenda > 0) {
  console.log("Prenda disponible en catálogo");
} else {
  console.log("Prenda agotada temporalmente");
}

const estadoPrenda = stockPrenda > 0 ? "Disponible" : "Agotado";
console.log("Estado de la prenda:", estadoPrenda);

// Precios de referencia de prendas básicas (busos, camisas, pantalones, chompas)
const preciosPrendas = [45, 60, 75, 85, 95];
for (const precio of preciosPrendas) {
  console.log("Precio en catálogo: Bs", precio.toFixed(2));
}

// ── 4. FUNCIONES: TRES FORMAS DE CALCULAR EL TOTAL DE PEDIDO ─────────────
function totalDeclarada(precioPrenda, cantidad) {
  return precioPrenda * cantidad;
}

const totalExpresion = function (precioPrenda, cantidad) {
  return precioPrenda * cantidad;
}

const calcularTotalRopa = (precioPrenda, cantidad) => precioPrenda * cantidad;

console.log(
  "Total 2 pantalones (Bs 85 c/u):",
  totalDeclarada(85, 2),
  totalExpresion(85, 2),
  calcularTotalRopa(85, 2)
);

// ── 5. ARROW FUNCTIONS: DESCUENTOS Y PROMOCIONES DE MODA ──────────────────
const calcularPrecioDoblePrenda = (precio) => precio * 2;

const aplicarDescuentoTemporada = (montoTotal, porcentaje) => {
  const descuento = montoTotal * (porcentaje / 100);
  return montoTotal - descuento;
};

// Cálculo con impuesto de facturación boliviano (13% IVA estándar)
const conImpuestoFactura = (monto, tasa = 13) => monto * (1 + tasa / 100);

console.log(
  "Compra de chompa de Bs 80 con 15% de descuento:",
  aplicarDescuentoTemporada(80, 15),
  "Bs"
);
console.log("Total con factura legal (13%): Bs", conImpuestoFactura(100).toFixed(2));

// ── 6. FUNCIONES DE ORDEN SUPERIOR APLICADAS A PRENDAS ─────────────────────
const calcularVentaPrenda = calcularTotalRopa;
console.log("Venta de 3 camisas a Bs 65 c/u: Bs", calcularVentaPrenda(65, 3));

function aplicarAInventario(listaPrendas, operacionFn) {
  const resultado = [];
  for (const prenda of listaPrendas) {
    resultado.push(operacionFn(prenda));
  }
  return resultado;
}

console.log("Precios con formato boliviano:", aplicarAInventario(preciosPrendas, p => `Bs ${p}.00`));

// ── 7. SCOPE Y CLOSURES: CONTADOR DE VENTAS POR CATEGORÍA ──────────────────
function crearContadorVentas(categoriaNombre) {
  let contadorVentas = 0;
  return () => {
    contadorVentas += 1;
    return `${categoriaNombre}: ${contadorVentas} prenda(s) vendida(s)`;
  };
}

const ventasModaFemenina = crearContadorVentas("Moda Femenina");
console.log(ventasModaFemenina());
console.log(ventasModaFemenina());

const ventasModaMasculina = crearContadorVentas("Moda Masculina");
console.log(ventasModaMasculina());

const ventasModaKids = crearContadorVentas("Moda Kids");
console.log(ventasModaKids());
