/* ═════════════════════════════════════════════════════════════════════════
   DEMO DEL DÍA 12 - Ajax, fetch y JSON

   Hasta ayer los datos estaban escritos en datos.js, dentro del proyecto.
   Hoy llegan de afuera, y eso cambia una cosa fundamental: TARDAN.

   QUÉ SIGNIFICA ASÍNCRONO. El código no se detiene a esperar. Pide los datos,
   sigue ejecutando las líneas siguientes, y cuando la respuesta llega, el
   navegador ejecuta la función que se dejó preparada.

   Por eso la página no se congela mientras carga. Y por eso no se puede
   escribir así:

       const datos = pedirDatos();   // NO: cuando esta línea termina,
       console.log(datos);            // los datos todavía no llegaron

   AJAX es el nombre histórico de esta técnica (Asynchronous JavaScript And
   XML). La X es de XML porque en 2005 se usaba XML; hoy se usa JSON casi
   siempre. El nombre quedó.
   ═════════════════════════════════════════════════════════════════════════ */

const $estado = document.querySelector("#estado");
const listaRemota = document.querySelector("#lista-remota");

// ── 1. JSON ─────────────────────────────────────────────────────────────
// JSON es un formato de TEXTO para intercambiar datos. Se parece a un objeto
// de JavaScript, pero no es lo mismo:
//
//   en JSON                          en un objeto de JavaScript
//   ─────────────────────────        ──────────────────────────
//   las claves van entre comillas    no hace falta
//   dobles "                         simples o dobles, da igual
//   solo texto, número, booleano,    cualquier cosa, incluidas
//   null, arreglo y objeto           funciones y fechas
//   sin comentarios                  con comentarios
//   sin coma final                   la coma final se tolera
//
// Dos funciones, y son inversas:
//   JSON.parse(texto)     texto  -> objeto
//   JSON.stringify(obj)   objeto -> texto
const textoJson = '{"nombre":"Pan integral","precio":1.5,"disponible":true}';
const objeto = JSON.parse(textoJson);
console.log(objeto.precio, typeof objeto.precio);      // 1.5 "number"
console.log(JSON.stringify(objeto));                    // vuelve a texto

// ── 2. LOS TRES ESTADOS ─────────────────────────────────────────────────
// Cualquier cosa que venga de la red está SIEMPRE en uno de tres estados:
// cargando, éxito o error. Los tres se muestran al usuario.
//
// Esta función centraliza el mensaje para no repetirlo en cada camino.
function mostrarEstado(texto, tipo = "info") {
  $estado.textContent = texto;
  $estado.className = tipo;              // el CSS decide cómo se ve cada tipo
}

function pintarRemoto(productos) {
  listaRemota.innerHTML = "";
  productos.forEach(p => {
    const art = document.createElement("article");
    art.classList.add("tarjeta");
    if (!p.disponible) art.classList.add("agotado");
    art.innerHTML = `
      <h3>${p.nombre}</h3>
      <p class="precio">Bs ${p.precio.toFixed(2)} / ${p.unidad}</p>
      <p class="stock">${p.disponible ? `${p.stock} en stock` : "Agotado"}</p>
    `;
    listaRemota.append(art);
  });
}

// ── 3. fetch Y async/await ──────────────────────────────────────────────
// fetch es la forma actual, y viene en el navegador: no hay que instalar nada.
//
// async/await deja leer código asíncrono como si fuera secuencial:
//   await   "espera aquí a que esto termine, sin congelar la página"
//   async   marca la función como asíncrona; solo dentro de una se puede usar await
//
// ⚠️ EL ERROR QUE TODOS COMETEN LA PRIMERA VEZ:
// fetch NO lanza un error con un 404 ni con un 500. Considera que su trabajo
// (hacer la petición) salió bien, aunque el servidor haya respondido "no
// existe". Solo falla si no hubo respuesta: sin red, DNS caído, CORS.
//
// Por eso hay que comprobar response.ok a mano. Sin esa comprobación, el
// código intenta leer JSON de una página de error y falla más adelante, en
// otro lugar, con un mensaje que no tiene nada que ver.
async function cargarConFetch(url = "datos.json") {
  mostrarEstado("Cargando...", "cargando");

  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {                            // <- la comprobación
      throw new Error(`El servidor respondió ${respuesta.status}`);
    }

    const datos = await respuesta.json();           // también tarda: await
    pintarRemoto(datos.productos);
    // datos.negocio es un OBJETO, no un texto: hay que entrar a la propiedad.
    // Poner el objeto entero en un texto imprime "[object Object]", que es el
    // síntoma clásico de haberse quedado un nivel arriba en el JSON.
    mostrarEstado(`${datos.productos.length} productos de ${datos.negocio.nombre}`, "ok");

  } catch (error) {
    // Aquí entra todo: la red caída, el throw de arriba, y un JSON mal formado.
    mostrarEstado(`No se pudieron cargar los datos. ${error.message}`, "error");
    listaRemota.innerHTML = "";
  }
}

document.querySelector("#cargar-fetch")
  .addEventListener("click", () => cargarConFetch());

// Un archivo que no existe, para ver el camino del error de verdad.
document.querySelector("#cargar-roto")
  .addEventListener("click", () => cargarConFetch("no-existe.json"));

// ── 4. LO MISMO CON jQUERY ──────────────────────────────────────────────
// jQuery trae sus propios métodos, y son los que se encuentran en código
// existente:
//
//   $.getJSON(url, fn)     pide y parsea el JSON
//   $.get(url, fn)         petición GET
//   $.post(url, datos, fn) petición POST
//   $.ajax({ ... })        la forma completa, con todas las opciones
//
// Devuelven un objeto con tres métodos encadenables, que son los tres estados
// de antes:
//   .done()    salió bien
//   .fail()    salió mal
//   .always()  pase lo que pase
//
// A diferencia de fetch, jQuery SÍ considera un 404 como fallo y entra en
// .fail(). Es más cómodo, y es una de las pocas cosas en que jQuery sigue
// siendo más simple.
$("#cargar-jquery").on("click", function () {
  mostrarEstado("Cargando con jQuery...", "cargando");

  $.getJSON("datos.json")
    .done(function (datos) {
      pintarRemoto(datos.productos);
      mostrarEstado(`${datos.productos.length} productos (vía jQuery)`, "ok");
    })
    .fail(function (jqXHR) {
      mostrarEstado(`Falló la carga: ${jqXHR.status}`, "error");
    })
    .always(function () {
      console.log("La petición terminó, con éxito o sin él.");
    });
});

// ── 5. QUÉ ES UNA PROMESA ───────────────────────────────────────────────
// En su forma intuitiva: "te aviso cuando esté". Una promesa es un objeto que
// representa un valor que TODAVÍA NO EXISTE, y que va a llegar (o a fallar).
//
// fetch devuelve una promesa. await es la forma de decir "espera a que esta
// promesa se resuelva y dame el valor".
//
// Sin await, la forma antigua es .then():
//
//     fetch("datos.json")
//       .then(r => r.json())
//       .then(datos => pintarRemoto(datos.productos))
//       .catch(error => mostrarEstado(error.message, "error"));
//
// Hace lo mismo que la función de la sección 3. async/await se lee mejor
// cuando hay varios pasos encadenados, y por eso es lo que se usa hoy.

// ── 6. LA PESTAÑA NETWORK ───────────────────────────────────────────────
// Todo esto se puede VER: inspector -> pestaña Network -> recargar.
// Aparece cada petición con su método, su status code y su respuesta.
//
// Es la herramienta que resuelve el 90% de los problemas de este día: si algo
// no llega, ahí se ve si la petición se hizo, a qué URL, y qué contestó.

