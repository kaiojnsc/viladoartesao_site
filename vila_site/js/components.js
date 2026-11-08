const navigationPages = [
  ["Início", "index.html"],
  ["Sobre a Vila", "pages/sobre.html"],
  ["Artesãos", "pages/artesaos.html"],
  ["Histórias", "pages/historias.html"],
  ["Experiências", "pages/experiencias.html"],
  ["Calendário", "pages/calendario.html"],
  ["Contato", "pages/contato.html"],
];

const footerPages = [
  ...navigationPages,
  ["Perguntas frequentes", "pages/faq.html"],
  ["Avaliações", "pages/avaliacoes.html"],
  ["Mapa da Vila", "pages/mapa.html"],
  ["Roteiros", "pages/roteiros.html"],
  ["Agendar visita", "pages/agendamento.html"],
];

function pageLink(root, [label, path], current) {
  const href = new URL(path, root).href;
  const target = new URL(href).pathname.replace(/\/+$/, "");
  const active = target === current ? ' aria-current="page"' : "";
  return `<a href="${href}"${active}>${label}</a>`;
}

export function renderSharedLayout() {
  const root = new URL("../", import.meta.url);
  const rootPath = new URL(root).pathname.replace(/\/+$/, "");
  const pathname = window.location.pathname.replace(/\/+$/, "");
  const current = pathname === rootPath ? `${rootPath}/index.html` : pathname;
  const header = document.querySelector("#site-header");
  const footer = document.querySelector("#site-footer");

  if (header) {
    const links = navigationPages.map((page) => pageLink(root, page, current)).join("");
    const home = new URL("index.html", root).href;
    const logo = new URL("assets/logos/logo vila do artesao.jpeg", root).href;
    const booking = new URL("pages/agendamento.html", root).href;

    header.innerHTML = `
      <header class="site-header">
        <div class="header-inner">
          <a class="brand" href="${home}" aria-label="Vila do Artesão — página inicial">
            <span class="brand-logo-frame">
              <img class="brand-logo" src="${logo}" alt="Vila do Artesão, Campina Grande — Paraíba" width="1280" height="1600" decoding="async">
            </span>
          </a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
            <svg class="menu-toggle__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M4 7h16M4 12h16M4 17h16"></path>
            </svg>
            <span class="menu-toggle__label">Menu</span>
          </button>
          <nav class="primary-nav" id="primary-nav" aria-label="Navegação principal">
            ${links}
          </nav>
          <a class="header-cta" href="${booking}">Agendar visita</a>
        </div>
      </header>`;
  }

  if (footer) {
    const footerLinks = footerPages.map((page) => pageLink(root, page, current)).join("");
    const unifacisaLogo = new URL("assets/logos/Logo Unifacisa JPG.png", root).href;
    const year = new Date().getFullYear();

    footer.innerHTML = `
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-brand">
            <img class="footer-unifacisa-logo" src="${unifacisaLogo}" alt="UNIFACISA — Centro Universitário" width="370" height="240" loading="lazy" decoding="async">
            <p class="footer-credit">Site desenvolvido como projeto de extensão universitária da UNIFACISA, em parceria com a Vila do Artesão e a Casa do Empreendedor.</p>
          </div>
          <nav class="footer-nav" aria-label="Links do site">
            <h2 class="footer-heading">Navegue</h2>
            ${footerLinks}
          </nav>
          <div class="footer-contact">
            <h2 class="footer-heading">Encontre a Vila</h2>
            <a href="https://www.instagram.com/viladoartesaocg/" target="_blank" rel="noopener noreferrer">Instagram oficial</a>
            <a href="https://maps.app.goo.gl/HLXZMhie1bfWJQSa8" target="_blank" rel="noopener noreferrer">Localização no Google Maps</a>
            <p>Telefone e WhatsApp: informações em breve.</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© ${year} Vila do Artesão. Todos os direitos reservados.</p>
        </div>
      </footer>`;
  }
}
