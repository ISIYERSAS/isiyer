(function () {
  function getServicePage() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var map = {
      'index.html': 'home',
      'bombas-de-agua.html': 'bombas_de_agua',
      'generadores-electricos.html': 'generadores_electricos',
      'aire-acondicionado.html': 'aire_acondicionado',
      'tableros-electricos.html': 'tableros_electricos',
      'calderas.html': 'calderas',
      'galeria.html': 'galeria'
    };

    return map[path] || path.replace('.html', '') || 'home';
  }

  function sendAnalyticsEvent(eventName, params) {
    if (typeof window.gtag !== 'function') {
      return;
    }

    window.gtag('event', eventName, Object.assign({
      page_location: window.location.href,
      page_title: document.title,
      service_page: getServicePage()
    }, params || {}));
  }

  function isWhatsAppUrl(url) {
    return /wa\.me|whatsapp\.com/i.test(url || '');
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest ? event.target.closest('a[href]') : null;

    if (!link) {
      return;
    }

    var href = link.getAttribute('href') || '';

    if (!isWhatsAppUrl(href) && !isWhatsAppUrl(link.href)) {
      return;
    }

    sendAnalyticsEvent('whatsapp_click', {
      link_url: link.href,
      link_text: (link.textContent || link.getAttribute('aria-label') || '').trim().slice(0, 120)
    });
  }, true);

  window.isiyerTrackWhatsAppFormSubmit = function () {
    sendAnalyticsEvent('whatsapp_form_submit', {
      form_type: 'home_whatsapp_form'
    });
  };
})();
