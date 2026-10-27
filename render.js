// ── 1. SELECTORES DE ELEMENTOS DEL DOM ──────────────────────────────────
const contenedor = document.querySelector("#productos") || document.querySelector("#lista-productos");
const titulos = document.querySelectorAll("h2");

console.log("Contenedor de prendas encontrado:", contenedor !== null);
console.log("Cantidad de encabezados de sección h2:", titulos.length);

// ── 2. MAPA DE ETIQUETAS DE TIPO DE PRENDA Y CATEGORÍA ──────────────────
const NOMBRES_TIPOS = {
  pantalon: "Pantalón",
  camisa: "Camisa",
  chompa: "Chompa",
  buso: "Buso",
  vestido: "Vestido",
  chaqueta: "Chaqueta",
  conjunto: "Conjunto"
};

const NOMBRES_CATEGORIAS = {
  "moda-femenina": "Moda Femenina (Dama)",
  "moda-masculina": "Moda Masculina (Varón)",
  "moda-kids": "Moda Kids (Niños)"
};

// ── 3. FUNCIÓN GENERADORA DE TARJETAS DE ROPA ───────────────────────────
function crearTarjeta(producto) {
  const articulo = document.createElement("article");
  articulo.classList.add("tarjeta");

  if (!producto.disponible) {
    articulo.classList.add("agotado");
  }

  // Atributos de datos para filtrado y ordenamiento dinámico
  articulo.dataset.id = producto.id || "";
  articulo.dataset.nombre = producto.nombre;
  articulo.dataset.categoria = producto.categoria;
  articulo.dataset.tipo = producto.tipo || "";
  articulo.dataset.price = producto.precio;
  articulo.dataset.available = producto.disponible ? "true" : "false";

  const etiquetaTipo = NOMBRES_TIPOS[producto.tipo] || "Prenda";
  const etiquetaCat = NOMBRES_CATEGORIAS[producto.categoria] || producto.categoria;

  articulo.innerHTML = `
    <div class="tarjeta-cabecera">
      <span class="badge-categoria badge-${producto.categoria}">${etiquetaCat}</span>
      <span class="badge-tipo">${etiquetaTipo}</span>
    </div>
    <h3>${producto.nombre}</h3>
    <p class="descripcion-prenda">${producto.descripcion || "Prenda de alta costura confeccionada con telas seleccionadas y finos acabados."}</p>
    <div class="tarjeta-pie">
      <div class="precio-contenedor">
        <span class="moneda-label">Precio:</span>
        <span class="precio">Bs ${producto.precio.toFixed(2)}</span>
      </div>
      <span class="stock ${producto.disponible ? 'disponible' : 'no-disponible'}">
        ${producto.disponible ? `En Stock (${producto.stock || 'Disp.'})` : 'Agotado'}
      </span>
    </div>
    <button type="button" class="btn-pedir" data-id="${producto.id || ''}" data-nombre="${producto.nombre}" ${!producto.disponible ? 'disabled' : ''}>
      ${producto.disponible ? 'Pedir prenda' : 'No disponible'}
    </button>
  `;

  return articulo;
}

// ── 4. FUNCIÓN RENDER PRINCIPAL ─────────────────────────────────────────
function render(lista) {
  if (!contenedor) return;
  contenedor.innerHTML = "";

  if (!lista || lista.length === 0) {
    contenedor.innerHTML = `
      <div class="sin-resultados">
        <p>No se encontraron prendas que coincidan con los criterios seleccionados.</p>
        <p><small>Prueba buscando con palabras como "pantalón", "camisa", "chompa" o "buso".</small></p>
      </div>
    `;
    return;
  }

  const fragmento = document.createDocumentFragment();
  lista.forEach(producto => {
    fragmento.appendChild(crearTarjeta(producto));
  });

  contenedor.appendChild(fragmento);
}

// ── 5. RENDERIZADO INICIAL SI EXISTE EL ARREGLO PRODUCTOS ───────────────
if (typeof productos !== "undefined" && Array.isArray(productos) && contenedor) {
  render(productos);
}
