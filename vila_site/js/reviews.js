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
  iframe.loading = "lazy";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  player.append(iframe);

  const body = document.createElement("div");
  body.className = "review-video-card__body";
  body.append(
    textElement("h3", "review-video-card__title", video.titulo),
    textElement("p", "review-video-card__description", video.descricao),
  );
  card.append(player, body);
  return card;
}

function isValidFormUrl(value) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:"
      && url.hostname === "docs.google.com"
      && /^\/forms\/d\/(?:e\/)?[^/]+\/viewform\/?$/.test(url.pathname);
  } catch {
    return false;
  }
}

function configureForm(formUrl) {
  const area = document.querySelector("#review-form-area");
  const notice = document.querySelector("#review-form-notice");
  if (!formUrl) return;

  if (!isValidFormUrl(formUrl)) {
    throw new Error("O endereço do formulário externo não é um URL válido do Google Forms.");
  }

  const formUrlObject = new URL(formUrl);
  const embeddedFormUrl = new URL(formUrl);
  embeddedFormUrl.searchParams.set("embedded", "true");
  notice.textContent = "Este formulário é hospedado pelo Google Forms. O site não recebe nem armazena as respostas.";

  const form = document.createElement("iframe");
  form.className = "review-form-embed";
  form.src = embeddedFormUrl.href;
  form.title = "Formulário externo para avaliação da visita";
  form.loading = "lazy";
  form.referrerPolicy = "strict-origin-when-cross-origin";
  form.setAttribute("allow", "fullscreen");
  form.setAttribute("aria-describedby", "review-form-notice");
  form.addEventListener("load", () => {
    notice.textContent = "Formulário externo carregado. Ao enviar, confira a confirmação apresentada pelo Google Forms.";
  }, { once: true });

  const externalLink = document.createElement("a");
  externalLink.className = "review-form-card__external-link";
  externalLink.href = formUrlObject.href;
  externalLink.target = "_blank";
  externalLink.rel = "noopener noreferrer";
  externalLink.textContent = "Abrir formulário em outra aba";
  area.replaceChildren(notice, form, externalLink);
}

export async function initReviews() {
  const grid = document.querySelector("#review-video-grid");
  if (!grid) return;

  const status = document.querySelector("#reviews-videos-status");
  const error = document.querySelector("#reviews-videos-error");

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
      || typeof data.formulario_externo_url !== "string"
    ) {
      throw new Error("O arquivo de avaliações possui formato inválido.");
    }

    grid.replaceChildren(...data.videos.map(createVideoCard));
    status.textContent = `${data.videos.length} vídeos disponíveis.`;
    configureForm(data.formulario_externo_url);
  } catch (loadError) {
    console.error("Falha ao carregar os vídeos e o formulário de avaliações.", loadError);
    status.textContent = "";
    error.hidden = false;
  }
}
