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
