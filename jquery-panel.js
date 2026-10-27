// ── CONTROL DE PANELES EN SHOP CAMACHO ESTILOS ───────────────────────
// Soporte interactivo con jQuery y fallback nativo para menú, avisos y acordeón

(function () {
  function inicializarPaneles() {
    // 1. Panel de menú móvil / desplegable de categorías
    const menuToggle = document.getElementById("menu-toggle");
    const menuMovil = document.getElementById("menu-movil");

    if (menuToggle && menuMovil) {
      menuToggle.addEventListener("click", function () {
        const estaAbierto = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", !estaAbierto);

        if (typeof $ !== "undefined") {
          $(menuMovil).stop(true, true).slideToggle(250);
        } else {
          menuMovil.style.display = estaAbierto ? "none" : "block";
        }
      });
    }

    // 2. Acordeón interactivo de guía de tallas y cuidado de ropa
    const acordeon = document.getElementById("acordeon");
    if (acordeon) {
      acordeon.addEventListener("click", function (e) {
        const btnTitulo = e.target.closest(".titulo");
        if (!btnTitulo) return;

        const cuerpo = btnTitulo.nextElementSibling;
        if (!cuerpo || !cuerpo.classList.contains("cuerpo")) return;

        const estaAbierto = btnTitulo.getAttribute("aria-expanded") === "true";

        // Cerrar otros acordeones
        const todosTitulos = acordeon.querySelectorAll(".titulo");
        const todosCuerpos = acordeon.querySelectorAll(".cuerpo");

        todosTitulos.forEach(t => {
          if (t !== btnTitulo) t.setAttribute("aria-expanded", "false");
        });

        if (typeof $ !== "undefined") {
          $(todosCuerpos).not(cuerpo).stop(true, true).slideUp(200);
          $(cuerpo).stop(true, true).slideToggle(250);
          btnTitulo.setAttribute("aria-expanded", !estaAbierto);
        } else {
          todosCuerpos.forEach(c => {
            if (c !== cuerpo) c.style.display = "none";
          });
          cuerpo.style.display = estaAbierto ? "none" : "block";
          btnTitulo.setAttribute("aria-expanded", !estaAbierto);
        }
      });
    }

    // 3. Panel de Promociones y Avisos con animación escalonada
    const btnAvisos = document.getElementById("mostrar-avisos");
    const listaAvisos = document.getElementById("avisos");

    if (btnAvisos && listaAvisos) {
      let avisosVisibles = false;

      btnAvisos.addEventListener("click", function () {
        const items = listaAvisos.querySelectorAll("li");

        if (!avisosVisibles) {
          // Mostrar avisos
          listaAvisos.style.display = "grid";
          btnAvisos.textContent = "✖ Ocultar promociones exclusivas";
          btnAvisos.classList.add("activo");

          if (typeof $ !== "undefined") {
            $(items).hide().each(function (indice) {
              $(this).stop(true, true).delay(indice * 100).fadeIn(300);
            });
          } else {
            items.forEach((item, index) => {
              item.style.opacity = "0";
              item.style.display = "flex";
              setTimeout(() => {
                item.style.transition = "opacity 0.3s ease, transform 0.3s ease";
                item.style.opacity = "1";
              }, index * 100);
            });
          }
          avisosVisibles = true;
        } else {
          // Ocultar avisos
          btnAvisos.textContent = "✨ Ver promociones y ofertas de ropa";
          btnAvisos.classList.remove("activo");

          if (typeof $ !== "undefined") {
            $(items).stop(true, true).fadeOut(200, function () {
              listaAvisos.style.display = "none";
            });
          } else {
            items.forEach(item => {
              item.style.opacity = "0";
            });
            setTimeout(() => {
              listaAvisos.style.display = "none";
            }, 250);
          }
          avisosVisibles = false;
        }
      });
    }

    // 4. Función de resaltado de prenda destacada
    function resaltarPrenda(selector, milisegundos = 1500) {
      const el = document.querySelector(selector);
      if (el) {
        el.classList.add("resaltado");
        setTimeout(() => el.classList.remove("resaltado"), milisegundos);
      }
    }

    // Resaltar la primera prenda como bienvenida interactiva
    setTimeout(() => {
      resaltarPrenda(".tarjeta:first-child", 1800);
    }, 600);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarPaneles);
  } else {
    inicializarPaneles();
  }
})();
