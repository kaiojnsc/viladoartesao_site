function textElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

const channelIcons = {
  instagram: '<rect x="7" y="7" width="34" height="34" rx="10"></rect><circle cx="24" cy="24" r="8"></circle><circle cx="35" cy="13" r="1.5"></circle>',
  location: '<path d="M24 43S38 30 38 18a14 14 0 0 0-28 0c0 12 14 25 14 25Z"></path><circle cx="24" cy="18" r="5"></circle>',
  whatsapp: '<path d="M9 39 11 31a16 16 0 1 1 6 6l-8 2Z"></path><path d="M18 17c1-1 2-1 3 0l2 3c1 1 0 2-1 3l-1 1c2 4 4 6 8 8l1-2c1-1 2-1 3 0l3 2c1 1 1 2 0 3-2 3-5 3-8 2-7-2-14-9-16-16-1-3 0-5 3-7Z"></path>',
};

function createIcon(type) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("contact-card__icon");
  svg.setAttribute("viewBox", "0 0 48 48");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.innerHTML = channelIcons[type];
  return svg;
}

function addActionContent(control, type, text) {
  const icon = createIcon(type);
  icon.classList.add("contact-card__action-icon");
  control.append(icon, textElement("span", "", text));
}

function createCard({ type, title, description, href, action, disabled = false }) {
  const article = document.createElement("article");
  article.className = `contact-card contact-card--${type}`;
  article.append(createIcon(type));
  article.append(textElement("h3", "contact-card__title", title));
  article.append(textElement("p", "contact-card__description", description));

  if (disabled) {
    const button = document.createElement("button");
    button.className = "button button--secondary contact-card__action";
    button.type = "button";
    button.disabled = true;
    button.setAttribute("aria-describedby", "whatsapp-status");
    addActionContent(button, type, action);
    article.append(button);
  } else {
    const link = document.createElement("a");
    link.className = "button button--secondary contact-card__action";
    link.href = href.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    addActionContent(link, type, action);
    article.append(link);
  }

  return article;
}

function isOfficialUrl(value, hostname, pathPattern) {
  try {
    const url = new URL(value);
    return url.protocol === "https:"
      && url.hostname === hostname
      && pathPattern.test(url.pathname)
      && !url.search
      && !url.hash;
  } catch {
    return false;
  }
}

function createContactCards(data, whatsappStatus) {
  if (
    !isOfficialUrl(data.instagram_url, "www.instagram.com", /^\/viladoartesaocg\/?$/)
    || !isOfficialUrl(data.google_maps_url, "maps.app.goo.gl", /^\/[A-Za-z0-9]+$/)
    || typeof data.whatsapp_url !== "string"
  ) {
    throw new Error("Os canais de contato possuem endereço inválido.");
  }

  const cards = [
    createCard({
      type: "instagram",
      title: "Instagram oficial",
      description: "Acompanhe as novidades e as publicações da Vila do Artesão.",
      href: new URL(data.instagram_url),
      action: "Visitar Instagram",
    }),
    createCard({
      type: "location",
      title: "Localização",
      description: "Consulte no mapa a localização oficial da Vila do Artesão.",
      href: new URL(data.google_maps_url),
      action: "Abrir localização no mapa",
    }),
  ];

  if (data.whatsapp_url) {
    if (!isOfficialUrl(data.whatsapp_url, "wa.me", /^\/\d{8,15}$/)) {
      throw new Error("Configure somente o link oficial e completo do WhatsApp.");
    }

    cards.push(createCard({
      type: "whatsapp",
      title: "WhatsApp oficial",
      description: "Fale com a equipe pelo canal oficial da Vila.",
      href: new URL(data.whatsapp_url),
      action: "Falar pelo WhatsApp",
    }));
    whatsappStatus.textContent = "";
    whatsappStatus.hidden = true;
  } else {
    cards.push(createCard({
      type: "whatsapp",
      title: "WhatsApp oficial",
      description: "O número oficial ainda não foi informado. O botão será ativado quando a equipe confirmar o contato.",
      action: "WhatsApp ainda não disponível",
      disabled: true,
    }));
    whatsappStatus.textContent = "Número oficial do WhatsApp pendente de confirmação.";
    whatsappStatus.hidden = false;
  }

  return cards;
}

export async function initContact() {
  const grid = document.querySelector("#contact-card-grid");
  if (!grid) return;

  const status = document.querySelector("#contact-status");
  const error = document.querySelector("#contact-error");
  const whatsappStatus = document.createElement("p");
  whatsappStatus.id = "whatsapp-status";
  whatsappStatus.className = "contact-whatsapp-status";
  whatsappStatus.setAttribute("role", "status");
  whatsappStatus.setAttribute("aria-live", "polite");

  try {
    const response = await fetch(new URL("../data/contato.json", import.meta.url));
    if (!response.ok) {
      throw new Error(`Canais de contato indisponíveis: HTTP ${response.status}`);
    }

    const data = await response.json();
    const cards = createContactCards(data, whatsappStatus);
    grid.replaceChildren(...cards);
    grid.after(whatsappStatus);
    error.hidden = true;
    status.textContent = "Canais oficiais da Vila do Artesão.";
  } catch (loadError) {
    console.error("Falha ao carregar os canais de contato da Vila.", loadError);
    status.textContent = "";
    error.hidden = false;
  }
}
