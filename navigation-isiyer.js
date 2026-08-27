(function () {
  var menus = Array.prototype.slice.call(document.querySelectorAll('.services-menu'));

  menus.forEach(function (menu) {
    var trigger = menu.querySelector('summary');

    if (!trigger) {
      return;
    }

    function syncExpandedState() {
      trigger.setAttribute('aria-expanded', menu.open ? 'true' : 'false');
    }

    trigger.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }

      event.preventDefault();
      menu.open = !menu.open;
    });

    menu.addEventListener('toggle', syncExpandedState);
    syncExpandedState();
  });

  document.addEventListener('click', function (event) {
    menus.forEach(function (menu) {
      if (menu.open && !menu.contains(event.target)) {
        menu.open = false;
      }
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') {
      return;
    }

    menus.forEach(function (menu) {
      if (!menu.open) {
        return;
      }

      menu.open = false;
      menu.querySelector('summary').focus();
    });
  });
})();

/* ============================================================
   MENÚ MÓVIL — botón hamburguesa
   Inserta el botón por JavaScript para no tocar el HTML de las
   7 páginas. Si este script no corre, el menú queda exactamente
   como estaba: los enlaces nunca se quitan del HTML.
   ============================================================ */
(function () {
  var CONSULTA_MOVIL = '(max-width: 760px)';
  var navs = Array.prototype.slice.call(
    document.querySelectorAll('header nav[aria-label="Navegación principal"]')
  );

  navs.forEach(function (nav, indice) {
    var fila = nav.parentElement;

    if (!fila || fila.querySelector(':scope > .nav-toggle')) {
      return;
    }

    if (!nav.id) {
      nav.id = 'menu-principal-' + (indice + 1);
    }

    var boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'nav-toggle';
    boton.setAttribute('aria-controls', nav.id);
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-label', 'Abrir menú de navegación');
    boton.innerHTML = '<span class="nav-toggle-bars"><span></span></span>Menú';

    fila.classList.add('has-nav-toggle');
    fila.insertBefore(boton, nav);

    function estaEnMovil() {
      return window.matchMedia(CONSULTA_MOVIL).matches;
    }

    function cerrar() {
      fila.classList.remove('nav-abierto');
      boton.setAttribute('aria-expanded', 'false');
      boton.setAttribute('aria-label', 'Abrir menú de navegación');
    }

    function abrir() {
      fila.classList.add('nav-abierto');
      boton.setAttribute('aria-expanded', 'true');
      boton.setAttribute('aria-label', 'Cerrar menú de navegación');
    }

    boton.addEventListener('click', function () {
      if (fila.classList.contains('nav-abierto')) {
        cerrar();
      } else {
        abrir();
      }
    });

    // Al tocar un enlace, el menú se cierra: en index los enlaces son
    // anclas de la misma página y el menú tapaba el destino.
    nav.addEventListener('click', function (evento) {
      if (evento.target.closest('a') && estaEnMovil()) {
        cerrar();
      }
    });

    document.addEventListener('click', function (evento) {
      if (
        fila.classList.contains('nav-abierto') &&
        !fila.contains(evento.target)
      ) {
        cerrar();
      }
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && fila.classList.contains('nav-abierto')) {
        cerrar();
        boton.focus();
      }
    });

    // Si se gira el teléfono o se agranda la ventana, el menú vuelve
    // a su estado normal de escritorio.
    window.addEventListener('resize', function () {
      if (!estaEnMovil()) {
        cerrar();
      }
    });
  });
})();
