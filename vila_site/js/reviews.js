import { clearSkeleton, showSkeleton } from "./skeleton.js";
function textElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function createVideoCard(video) {
  const card = document.createElement("article");
  card.className = "review-video-card";

  const player = document.createElement("div");
  player.className = "review-video-card__player";
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${video.id}`;
  iframe.title = video.titulo;
  iframe.dataset.i18nIgnore = "";
  iframe.loading = "lazy";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  player.append(iframe);

  const body = document.createElement("div");
  body.className = "review-video-card__body";
  const title = textElement("h3", "review-video-card__title", video.titulo);
  body.append(
    title,
    textElement("p", "review-video-card__description", video.descricao),
  );
  const link = document.createElement("a");
  link.className = "review-video-card__link";
  link.href = `https://www.youtube.com/watch?v=${video.id}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Abrir vídeo no YouTube";
  body.append(link);
  card.append(player, body);
  return card;
}

export async function initReviews() {
  const grid = document.querySelector("#review-video-grid");
  if (!grid) return;

  const status = document.querySelector("#reviews-videos-status");
  const error = document.querySelector("#reviews-videos-error");
  showSkeleton(grid, { count: 3 });

  try {
    const response = await fetch(new URL("../data/avaliacoes.json", import.meta.url));
    if (!response.ok) {
      throw new Error(`Avaliações indisponíveis: HTTP ${response.status}`);
    }

    const data = await response.json();
    if (
      !data
      || !Array.isArray(data.videos)
      || data.videos.length !== 2
      || data.videos.some((video) => (
        !video
        || typeof video.id !== "string"
        || !/^[A-Za-z0-9_-]{11}$/.test(video.id)
        || typeof video.titulo !== "string"
        || !video.titulo.trim()
        || typeof video.descricao !== "string"
      ))
    ) {
      throw new Error("O arquivo de avaliações possui formato inválido.");
    }

    grid.removeAttribute("aria-busy");
    grid.replaceChildren(...data.videos.map(createVideoCard));
    status.textContent = `${data.videos.length} vídeos disponíveis.`;
  } catch (loadError) {
    console.error("Falha ao carregar os vídeos da Vila.", loadError);
    clearSkeleton(grid);
    status.textContent = "";
    error.hidden = false;
  }
}
