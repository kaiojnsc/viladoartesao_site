import { clearSkeleton, showSkeleton } from "./skeleton.js";
import { formatStarLabel } from "./i18n.js";

function textElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function hasProjectCover(entry) {
  return typeof entry.capa === "string"
    && /^assets\/imagens_viladoartesao\/[\w.-]+\.jpeg$/i.test(entry.capa)
    && typeof entry.capa_alt === "string"
    && entry.capa_alt.trim();
}

function isValidEntry(entry, kind) {
  if (
    !entry
    || typeof entry.id !== "string"
    || typeof entry.titulo !== "string"
    || !entry.titulo.trim()
    || typeof entry.veiculo !== "string"
    || !entry.veiculo.trim()
    || typeof entry.resumo !== "string"
    || !entry.resumo.trim()
    || typeof entry.url !== "string"
    || !/^https:\/\//.test(entry.url)
  ) {
    return false;
  }

  if (kind === "publication") {
    return /^[a-z0-9-]+$/.test(entry.id)
      && typeof entry.autoria === "string"
      && ["noticia", "reportagem"].includes(entry.tipo)
      && /^\d{4}-\d{2}-\d{2}$/.test(entry.data)
      && (!entry.capa || hasProjectCover(entry));
  }

  if (kind === "video") {
    return /^[A-Za-z0-9_-]{11}$/.test(entry.id)
      && entry.data === null
      && entry.url === `https://www.youtube.com/watch?v=${entry.id}`;
  }

  if (kind === "reel") {
    return /^[A-Za-z0-9_-]{11}$/.test(entry.id)
      && entry.data === null
      && entry.veiculo === "Instagram"
      && entry.url === `https://www.instagram.com/reel/${entry.id}/`
      && hasProjectCover(entry);
  }

  return false;
}

function appendMetadata(card, entry, kind) {
  const metadata = textElement("p", "media-card__metadata", entry.veiculo);
  metadata.dataset.i18nIgnore = "";
  if (kind === "publication" && entry.autoria) {
    metadata.append(document.createTextNode(` · ${entry.autoria}`));
  }
  if (entry.data) {
    const date = new Date(`${entry.data}T12:00:00`);
    const time = document.createElement("time");
    time.dateTime = entry.data;
    time.textContent = date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    metadata.append(document.createTextNode(" · "), time);
  }
  card.append(metadata);
}

function addMediaImage(card, entry, kind) {
  if (kind === "publication" && !entry.capa) return;

  const image = document.createElement("img");
  image.className = "media-card__cover";
  image.loading = "lazy";
  image.decoding = "async";
  if (kind === "video") {
    image.src = `https://i.ytimg.com/vi/${entry.id}/hqdefault.jpg`;
    image.alt = "Miniatura do vídeo";
  } else {
    image.src = new URL(`../${entry.capa}`, import.meta.url).href;
    image.alt = entry.capa_alt;
  }
  card.append(image);
}

function createMediaCard(entry, kind) {
  const card = document.createElement("article");
  card.className = "media-card";

  addMediaImage(card, entry, kind);
  card.append(textElement(
    "p",
    "media-card__kind",
    kind === "video"
      ? "Vídeo"
      : kind === "reel"
        ? "Reel do Instagram"
        : entry.tipo === "noticia" ? "Notícia" : "Reportagem",
  ));
  const title = textElement("h3", "media-card__title", entry.titulo);
  if (kind !== "reel") title.dataset.i18nIgnore = "";
  card.append(title);
  appendMetadata(card, entry, kind);
  card.append(textElement("p", "media-card__summary", entry.resumo));

  const action = textElement(
    "a",
    "button button--secondary media-card__action",
    kind === "video"
      ? "Assistir vídeo"
      : kind === "reel" ? "Abrir Reel no Instagram" : "Ler reportagem",
  );
  action.href = entry.url;
  action.target = "_blank";
  action.rel = "noopener noreferrer";
  card.append(action);
  return card;
}

function createReelEntry(entry) {
  const article = document.createElement("article");
  article.className = "media-reel";
  article.id = `reel-${entry.id}`;

  const media = document.createElement("div");
  media.className = "media-reel__media";
  const frame = document.createElement("iframe");
  frame.className = "media-reel__video";
  frame.src = `https://www.instagram.com/reel/${entry.id}/embed`;
  frame.title = `Vídeo: ${entry.titulo}`;
  frame.loading = "lazy";
  frame.allowFullscreen = true;
  frame.scrolling = "no";
  media.append(frame);

  const body = document.createElement("div");
  body.className = "media-reel__body";
  body.append(
    textElement("p", "media-reel__eyebrow", "Reel do Instagram"),
    textElement("h3", "media-reel__title", entry.titulo),
    textElement("p", "media-reel__summary", entry.resumo),
  );

  const actions = document.createElement("div");
  actions.className = "media-reel__actions";
  const watch = textElement("a", "button button--secondary", "Assistir no Instagram");
  watch.href = entry.url;
  watch.target = "_blank";
  watch.rel = "noopener noreferrer";
  actions.append(watch);
  body.append(actions);

  article.append(media, body);
  return article;
}

function isValidTestimonial(entry) {
  return entry
    && typeof entry.id === "string"
    && /^[a-z0-9-]+$/.test(entry.id)
    && typeof entry.autoria === "string"
    && typeof entry.texto === "string"
    && entry.texto.trim()
    && Number.isInteger(entry.nota)
    && entry.nota >= 1
    && entry.nota <= 5
    && typeof entry.data === "string"
    && /^\d{4}-\d{2}$/.test(entry.data)
    && entry.veiculo === "Google · Avaliação pública"
    && /^https:\/\/www\.google\.com\/maps\/place\//.test(entry.url);
}

function createTestimonialCard(entry) {
  const card = document.createElement("article");
  card.className = "media-card media-testimonial";

  const stars = textElement(
    "span",
    "media-testimonial__stars",
    `${"★".repeat(entry.nota)}${"☆".repeat(5 - entry.nota)}`,
  );
  stars.setAttribute("role", "img");
  stars.setAttribute("aria-label", formatStarLabel(entry.nota));
  stars.dataset.i18nIgnore = "";
  document.addEventListener("vila:language-change", () => {
    stars.setAttribute("aria-label", formatStarLabel(entry.nota));
  });

  const source = textElement("span", "media-testimonial__source", entry.veiculo);
  const header = document.createElement("div");
  header.className = "media-testimonial__header";
  header.append(stars, source);

  const quote = textElement("blockquote", "media-testimonial__quote", `“${entry.texto}”`);
  const attribution = document.createElement("p");
  attribution.className = "media-testimonial__attribution";
  const author = document.createElement("strong");
  author.textContent = entry.autoria;
  author.dataset.i18nIgnore = "";
  const date = new Date(`${entry.data}-01T12:00:00`);
  const time = document.createElement("time");
  time.dateTime = entry.data;
  time.textContent = date.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
  attribution.append(author, document.createTextNode(" · "), time);

  const link = textElement("a", "button button--secondary media-card__action", "Ver avaliações no Google Maps");
  link.href = entry.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  card.append(header, quote, attribution, link);
  return card;
}

export async function initMedia() {
  const publicationList = document.querySelector("#media-publications");
  const videoList = document.querySelector("#media-videos");
  const reelList = document.querySelector("#media-reels");
  const testimonialList = document.querySelector("#media-testimonials");
  if (!publicationList || !videoList || !reelList || !testimonialList) return;

  const status = document.querySelector("#media-status");
  const error = document.querySelector("#media-error");
  const lists = [publicationList, videoList, reelList, testimonialList];
  for (const list of lists) {
    showSkeleton(list, { count: list === reelList ? 1 : 3 });
  }

  try {
    const response = await fetch(new URL("../data/midia.json", import.meta.url));
    if (!response.ok) {
      throw new Error(`Conteúdo de mídia indisponível: HTTP ${response.status}`);
    }

    const data = await response.json();
    if (
      !data
      || !Array.isArray(data.publicacoes)
      || !data.publicacoes.length
      || data.publicacoes.some((entry) => !isValidEntry(entry, "publication"))
      || !Array.isArray(data.videos)
      || data.videos.some((entry) => !isValidEntry(entry, "video"))
      || !Array.isArray(data.reels)
      || data.reels.some((entry) => !isValidEntry(entry, "reel"))
      || !Array.isArray(data.depoimentos)
      || data.depoimentos.some((entry) => !isValidTestimonial(entry))
    ) {
      throw new Error("O arquivo de mídia possui formato inválido.");
    }

    for (const list of lists) list.removeAttribute("aria-busy");
    publicationList.replaceChildren(...data.publicacoes.map((entry) => createMediaCard(entry, "publication")));
    videoList.replaceChildren(...data.videos.map((entry) => createMediaCard(entry, "video")));
    reelList.replaceChildren(...data.reels.map(createReelEntry));
    testimonialList.replaceChildren(...data.depoimentos.map(createTestimonialCard));
    status.textContent = `${data.publicacoes.length} publicações, ${data.videos.length} vídeos, ${data.reels.length} Reels e ${data.depoimentos.length} depoimentos.`;
  } catch (loadError) {
    console.error("Falha ao carregar as publicações da Vila.", loadError);
    for (const list of lists) clearSkeleton(list);
    status.textContent = "";
    error.hidden = false;
  }
}
