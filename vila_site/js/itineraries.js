const googleMapsUrl = "https://maps.app.goo.gl/HLXZMhie1bfWJQSa8";
const bookingPath = "pages/agendamento.html";

const illustrations = {
  vila: {
    label: "Ilustração conceitual da Vila",
    svg: '<path d="M8 38V19l16-11 16 11v19H8Z"></path><path d="M18 38V25h12v13M5 19l19-13 19 13"></path><path d="M11 22h4m18 0h4"></path>',
  },
  artesanato: {
    label: "Ilustração conceitual de artesanato",
    svg: '<path d="M11 12h26l-3 27H14l-3-27Z"></path><path d="M17 12a7 7 0 0 1 14 0M16 21h16M16 27h16M17 33h14"></path>',
  },
  cultura: {
    label: "Ilustração conceitual de cultura",
    svg: '<path d="M8 38h32M12 38V18h24v20M9 18l15-11 15 11"></path><path d="M18 38V25h12v13M17 13h.1m14-.1h.1"></path>',
  },
  gastronomia: {
    label: "Ilustração conceitual de gastronomia e artesanato",
    svg: '<path d="M9 23h30a15 15 0 0 1-30 0Zm5 15h20M16 17c-2-2 2-3 0-5m8 5c-2-2 2-3 0-5m8 5c-2-2 2-3 0-5"></path>',
  },
};

function textElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function createIllustration(type) {
  const illustration = illustrations[type];
  if (!illustration) {
    throw new Error(`Ilustração desconhecida no roteiro: ${type}.`);
  }

  const container = document.createElement("div");
  container.className = `itinerary-card__illustration itinerary-card__illustration--${type}`;
  container.setAttribute("role", "img");
  container.setAttribute("aria-label", illustration.label);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 48 48");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.innerHTML = illustration.svg;

  container.append(
    svg,
    textElement("span", "itinerary-card__illustration-caption", "Ilustração conceitual"),
  );
  return container;
}

function createIllustrationImage(route) {
  const media = document.createElement("div");
  media.className = "itinerary-card__media";

  if (route.imagem) {
    const imagePath = route.imagem.replace(/^\/+/, "");
    if (!imagePath.startsWith("assets/img/")) {
      throw new Error(`Caminho de imagem inválido no roteiro ${route.id}.`);
    }

    const image = document.createElement("img");
    image.src = new URL(`../${imagePath}`, import.meta.url).href;
    image.alt = route.imagem_alt || route.titulo;
    image.loading = "lazy";
    media.append(image);
  } else {
    media.append(createIllustration(route.ilustracao));
  }

  return media;
}

function createRouteCard(route, root) {
  const article = document.createElement("article");
  article.className = "itinerary-card";
  article.id = `roteiro-${route.id}`;

  const body = document.createElement("div");
  body.className = "itinerary-card__body";
  body.append(textElement("p", "itinerary-card__eyebrow", "Sugestão de experiência"));
  body.append(textElement("h3", "itinerary-card__title", route.titulo));
  body.append(textElement("p", "itinerary-card__description", route.descricao));

  const details = document.createElement("dl");
  details.className = "itinerary-card__details";
  const detailsList = [
    ["Duração", route.duracao || "A definir"],
    ["Pontos de visitação", route.pontos_visitacao.length
      ? route.pontos_visitacao.join(", ")
      : "A confirmar"],
    ["Endereços", route.enderecos.length ? route.enderecos.join(", ") : "A confirmar"],
    ["Horários", route.horarios.length ? route.horarios.join(", ") : "A confirmar"],
    ["Distâncias", route.distancias.length ? route.distancias.join(", ") : "A confirmar"],
  ];

  for (const [label, value] of detailsList) {
    const row = document.createElement("div");
    row.className = "itinerary-card__detail";
    row.append(
      textElement("dt", "", label),
      textElement("dd", "", value),
    );
    details.append(row);
  }

  body.append(details);
  if (route.informacoes_turisticas) {
    body.append(textElement(
      "p",
      "itinerary-card__tourism",
      route.informacoes_turisticas,
    ));
  }

  if (route.status !== "publicado") {
    body.append(textElement(
      "p",
      "itinerary-card__status",
      "Proposta em preparação. Paradas, horários e demais informações serão publicados após confirmação.",
    ));
  }

  const actions = document.createElement("div");
  actions.className = "itinerary-card__actions";

  const location = textElement("a", "button button--secondary", "Ver localização");
  location.href = googleMapsUrl;
  location.target = "_blank";
  location.rel = "noopener noreferrer";

  const plan = textElement("a", "button button--primary", "Planejar visita");
  plan.href = new URL(bookingPath, root).href;

  actions.append(location, plan);
  body.append(actions);
  article.append(createIllustrationImage(route), body);
  return article;
}

function isValidRoute(route) {
  return route
    && typeof route.id === "string"
    && /^[a-z0-9-]+$/.test(route.id)
    && typeof route.titulo === "string"
    && typeof route.descricao === "string"
    && typeof route.ilustracao === "string"
    && typeof route.imagem === "string"
    && typeof route.imagem_alt === "string"
    && typeof route.duracao === "string"
    && [route.pontos_visitacao, route.enderecos, route.horarios, route.distancias]
      .every((values) => Array.isArray(values) && values.every((value) => typeof value === "string"))
    && Array.isArray(route.coordenadas)
    && route.coordenadas.every((point) => (
      point
      && typeof point.latitude === "number"
      && typeof point.longitude === "number"
      && point.latitude >= -90
      && point.latitude <= 90
      && point.longitude >= -180
      && point.longitude <= 180
    ))
    && typeof route.informacoes_turisticas === "string"
    && typeof route.status === "string";
}

export async function initItineraries() {
  const list = document.querySelector("#itinerary-grid");
  if (!list) return;

  const status = document.querySelector("#itineraries-status");
  const empty = document.querySelector("#itineraries-empty");
  const error = document.querySelector("#itineraries-error");

  try {
    const response = await fetch(new URL("../data/roteiros.json", import.meta.url));
    if (!response.ok) {
      throw new Error(`Roteiros indisponíveis: HTTP ${response.status}`);
    }

    const routes = await response.json();
    if (!Array.isArray(routes) || routes.some((route) => !isValidRoute(route))) {
      throw new Error("O arquivo de roteiros possui formato inválido.");
    }

    const root = new URL("../", import.meta.url);
    list.replaceChildren(...routes.map((route) => createRouteCard(route, root)));
    status.textContent = routes.length
      ? `${routes.length} sugestões de roteiro em preparação.`
      : "";
    empty.hidden = routes.length > 0;
  } catch (loadError) {
    console.error("Falha ao carregar os roteiros da Vila.", loadError);
    status.textContent = "";
    error.hidden = false;
  }
}
