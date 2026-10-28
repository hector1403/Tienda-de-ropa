// ── 1. OBJETO LITERAL DE PRENDA DESTACADA ───────────────────────────────
const prendaDelDia = {
  nombre: "Chompa de Hilo Fina Femenina",
  tipo: "chompa",
  categoria: "moda-femenina",
  precio: 75.0,
  stock: 25,
  disponible: true,
  tallas: ["S", "M", "L"],
  color: "Palo de Rosa"
};

console.log("Prenda del día:", prendaDelDia.nombre);

const propiedad = "precio";
console.log("Precio de la prenda:", prendaDelDia[propiedad], "Bs");

prendaDelDia.stock = 24; // Simular venta
prendaDelDia.oferta = false;
delete prendaDelDia.oferta;

// ── 2. DESTRUCTURING Y SPREAD OPERATOR ──────────────────────────────────
const { nombre, precio, categoria } = prendaDelDia;
console.log(`${nombre} (${categoria}) cuesta Bs ${precio.toFixed(2)}`);

const prendaPromocion = {
  ...prendaDelDia,
  nombre: "Chompa de Hilo Fina Femenina (Promo Temporada)",
  precio: 65.0
};
console.log("Prenda en promoción:", prendaPromocion);

// ── 3. CATÁLOGO COMPLETO DE PRODUCTOS POR MODA Y PRENDA ──────────────────
// Incluye Pantalones, Camisas, Chompas y Busos para:
// 1) Moda Femenina (Mujer)
// 2) Moda Masculina (Hombre)
// 3) Moda Kids (Niños)
const productos = [
  // ── MODA FEMENINA (ROPA PARA MUJER) ──
  {
    id: "fem-1",
    nombre: "Pantalón Jean Flare Dama",
    tipo: "pantalon",
    imagen: "img/fem-pantalon.svg",
    categoria: "moda-femenina",
    categoriaTexto: "Moda Femenina",
    descripcion: "Pantalón tiro alto de mezclilla suave y corte acampanado con ajuste perfecto.",
    precio: 85.0,
    stock: 20,
    disponible: true
  },
  {
    id: "fem-2",
    nombre: "Camisa de Seda Elegante Dama",
    tipo: "camisa",
    imagen: "img/fem-camisa.svg",
    categoria: "moda-femenina",
    categoriaTexto: "Moda Femenina",
    descripcion: "Camisa de satén de seda suave al tacto con cuello clásico para eventos formales.",
    precio: 65.0,
    stock: 22,
    disponible: true
  },
  {
    id: "fem-3",
    nombre: "Chompa de Hilo Fina Dama",
    tipo: "chompa",
    imagen: "img/fem-chompa.svg",
    categoria: "moda-femenina",
    categoriaTexto: "Moda Femenina",
    descripcion: "Chompa tejida en hilo suave de algodón, abrigada, ligera y estilizada.",
    precio: 75.0,
    stock: 18,
    disponible: true
  },
  {
    id: "fem-4",
    nombre: "Buzo Oversize Urbano Dama",
    tipo: "buso",
    imagen: "img/fem-buso.svg",
    categoria: "moda-femenina",
    categoriaTexto: "Moda Femenina",
    descripcion: "Buzo cómodo con capucha y bolsillo frontal para un look moderno de diario.",
    precio: 60.0,
    stock: 30,
    disponible: true
  },

  // ── MODA MASCULINA (ROPA PARA HOMBRE) ──
  {
    id: "masc-1",
    nombre: "Pantalón Jean Clásico Caballero",
    tipo: "pantalon",
    imagen: "img/masc-pantalon.svg",
    categoria: "moda-masculina",
    categoriaTexto: "Moda Masculina",
    descripcion: "Jean de mezclilla resistente y corte recto, ideal para uso casual diario.",
    precio: 85.0,
    stock: 28,
    disponible: true
  },
  {
    id: "masc-2",
    nombre: "Camisa Formal Oxford Caballero",
    tipo: "camisa",
    imagen: "img/masc-camisa.svg",
    categoria: "moda-masculina",
    categoriaTexto: "Moda Masculina",
    descripcion: "Camisa de corte slim fit 100% algodón, elegante y transpirable para toda ocasión.",
    precio: 70.0,
    stock: 25,
    disponible: true
  },
  {
    id: "masc-3",
    nombre: "Chompa Tejida Cuello en V Caballero",
    tipo: "chompa",
    imagen: "img/masc-chompa.svg",
    categoria: "moda-masculina",
    categoriaTexto: "Moda Masculina",
    descripcion: "Chompa de lana acrílica abrigada de acabado fino para combinar sobre camisas.",
    precio: 80.0,
    stock: 16,
    disponible: true
  },
  {
    id: "masc-4",
    nombre: "Buzo Hoodie Deportivo Caballero",
    tipo: "buso",
    imagen: "img/masc-buso.svg",
    categoria: "moda-masculina",
    categoriaTexto: "Moda Masculina",
    descripcion: "Buzo deportivo de frisa con capucha ajustable y puños acanalados.",
    precio: 65.0,
    stock: 24,
    disponible: true
  },

  // ── MODA KIDS (ROPA PARA NIÑOS) ──
  {
    id: "kids-1",
    nombre: "Pantalón Jogger Kids Resistente",
    tipo: "pantalon",
    imagen: "img/kids-pantalon.svg",
    categoria: "moda-kids",
    categoriaTexto: "Moda Kids",
    descripcion: "Pantalón con pretina elástica y refuerzo en rodillas para máxima libertad y juego.",
    precio: 45.0,
    stock: 35,
    disponible: true
  },
  {
    id: "kids-2",
    nombre: "Camisita Casual Estampada Kids",
    tipo: "camisa",
    imagen: "img/kids-camisa.svg",
    categoria: "moda-kids",
    categoriaTexto: "Moda Kids",
    descripcion: "Camisa infantil de algodón hipoalergénico con diseños divertidos y frescos.",
    precio: 40.0,
    stock: 20,
    disponible: true
  },
  {
    id: "kids-3",
    nombre: "Chompa Abrigada de Algodón Kids",
    tipo: "chompa",
    imagen: "img/kids-chompa.svg",
    categoria: "moda-kids",
    categoriaTexto: "Moda Kids",
    descripcion: "Chompa suave y térmica con divertidos motivos infantiles, abrigadora y segura.",
    precio: 50.0,
    stock: 26,
    disponible: true
  },
  {
    id: "kids-4",
    nombre: "Buzo Deportivo con Capucha Kids",
    tipo: "buso",
    imagen: "img/kids-buso.svg",
    categoria: "moda-kids",
    categoriaTexto: "Moda Kids",
    descripcion: "Buzo abrigado para actividades escolares y deportes de alta durabilidad.",
    precio: 45.0,
    stock: 30,
    disponible: true
  }
];

// ── 4. MÉTODOS DE ARREGLO APLICADOS AL INVENTARIO ────────────────────────
productos.forEach(p => console.log(`[${p.categoriaTexto}] ${p.nombre} - Bs ${p.precio}`));

const catalogoNombres = productos.map(p => p.nombre);
console.log("Listado de prendas:", catalogoNombres);

const prendasDisponibles = productos.filter(p => p.disponible);
console.log(`${prendasDisponibles.length} de ${productos.length} prendas disponibles en tienda`);

const prendaExclusiva = productos.find(p => p.precio >= 100);
console.log("Prenda más abrigada/exclusiva:", prendaExclusiva);

console.log("¿Existe la Chompa de Hilo Fina Dama?:", catalogoNombres.includes("Chompa de Hilo Fina Dama"));
console.log("¿Hay prendas agotadas?:", productos.some(p => p.stock === 0));
console.log("¿Todas las prendas tienen precio mayor a cero?:", productos.every(p => p.precio > 0));

// Ordenamiento de prueba por precio
const prendasOrdenadasPorPrecio = [...productos].sort((a, b) => a.precio - b.precio);
console.log("Prendas ordenadas de menor a mayor precio:", prendasOrdenadasPorPrecio.map(p => `${p.nombre} (Bs ${p.precio})`));

// Valor total del inventario disponible
const valorTotalInventario = productos.reduce((acumulado, p) => acumulado + (p.precio * p.stock), 0);
console.log("Valor total del inventario en tienda: Bs", valorTotalInventario.toFixed(2));

// ── 5. CONSULTAS ENCADENADAS POR CATEGORÍA Y PRENDA ─────────────────────
// Filtro de busos y chompas disponibles
const prendasAbrigoDisponibles = productos
  .filter(p => (p.tipo === "chompa" || p.tipo === "buso") && p.disponible)
  .map(p => `${p.nombre} - Bs ${p.precio}`);
console.log("Chompas y Busos disponibles:", prendasAbrigoDisponibles);

// Inventario por categoría
const inventarioPorCategoria = productos.reduce((acumulador, p) => {
  if (!acumulador[p.categoria]) {
    acumulador[p.categoria] = { totalPrendas: 0, valorBs: 0 };
  }
  acumulador[p.categoria].totalPrendas += p.stock;
  acumulador[p.categoria].valorBs += p.precio * p.stock;
  return acumulador;
}, {});
console.log("Resumen de inventario por categoría:", inventarioPorCategoria);

// ── 6. CLASES ORIENTADAS A OBJETOS (PRENDAS DE ROPA) ─────────────────────
class Prenda {
  constructor(nombre, categoria, tipo, precio, stock) {
    this.nombre = nombre;
    this.categoria = categoria;
    this.tipo = tipo;
    this.precio = precio;
    this.stock = stock;
  }

  estaDisponible() {
    return this.stock > 0;
  }

  calcularValorStock() {
    return this.precio * this.stock;
  }

  obtenerDetalle() {
    return `${this.nombre} (${this.categoria}) - Bs ${this.precio.toFixed(2)} [${this.stock} en stock]`;
  }
}

const pantalonPrueba = new Prenda("Pantalón Jean Flare Dama", "Moda Femenina", "pantalon", 85.0, 20);
console.log(pantalonPrueba.obtenerDetalle(), "| ¿Disponible?", pantalonPrueba.estaDisponible());

class PrendaConDescuento extends Prenda {
  constructor(nombre, categoria, tipo, precio, stock, porcentajeDescuento) {
    super(nombre, categoria, tipo, precio, stock);
    this.porcentajeDescuento = porcentajeDescuento;
  }

  precioConDescuento() {
    const rebaja = this.precio * (this.porcentajeDescuento / 100);
    return this.precio - rebaja;
  }
}

const chompaOferta = new PrendaConDescuento("Chompa Cuello en V Caballero", "Moda Masculina", "chompa", 80.0, 16, 10);
console.log(`Oferta en ${chompaOferta.nombre}: precio final Bs ${chompaOferta.precioConDescuento().toFixed(2)}`);
