function textElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function createPhotoPlaceholder() {
  const placeholder = document.createElement("div");
  placeholder.className = "story-entry__photo-placeholder";
  placeholder.setAttribute("role", "img");
  placeholder.setAttribute("aria-label", "Espaço reservado para fotografia autorizada do artesão");

  const icon = document.createElement("span");
  icon.className = "story-entry__photo-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML = `
    <svg viewBox="0 0 48 48" focusable="false">
      <rect x="5" y="8" width="38" height="32" rx="3"></rect>
      <circle cx="17" cy="19" r="3"></circle>
      <path d="m8 36 11-11 7 7 5-5 9 9"></path>
    </svg>`;

  placeholder.append(icon, textElement("span", "", "Fotografia autorizada a incluir"));
  return placeholder;
}

function addTag(container, text) {
  if (!text) return;
  container.append(textElement("span", "story-entry__tag", text));
}

function createStoryEntry(story, root) {
  const article = document.createElement("article");
  article.className = "story-entry";
  article.id = `historia-${story.id}`;

  const media = document.createElement("div");
  media.className = "story-entry__media";
  if (story.fotografia) {
    const imagePath = story.fotografia.replace(/^\/+/, "");
    if (!imagePath.startsWith("assets/img/")) {
      throw new Error(`Caminho de fotografia inválido na história ${story.id}.`);
    }

    const image = document.createElement("img");
    image.src = new URL(`../${imagePath}`, import.meta.url).href;
    image.alt = story.fotografia_alt || `Fotografia de ${story.artesao_nome || story.tema}`;
    image.loading = "lazy";
    media.append(image);
  } else {
    media.append(createPhotoPlaceholder());
  }

  const body = document.createElement("div");
  body.className = "story-entry__body";
  body.append(textElement("p", "story-entry__eyebrow", story.tema));
  body.append(textElement("h2", "story-entry__title", story.titulo || story.tema));
  body.append(textElement(
    "p",
    "story-entry__name",
    story.artesao_nome || "Nome do artesão a confirmar",
  ));

  const metadata = document.createElement("div");
  metadata.className = "story-entry__meta";
  addTag(metadata, story.segmento || "Segmento a confirmar");
  if (story.chale) addTag(metadata, `Chalé ${story.chale}`);
  body.append(metadata);

  body.append(textElement(
    "p",
    "story-entry__summary",
    story.resumo || "Trajetória e produção artesanal aguardam um relato confirmado pelo artesão.",
  ));

  if (story.status !== "publicada" || !story.trajetoria) {
    body.append(textElement(
      "p",
      "story-entry__status",
      "Conteúdo pendente: esta história será publicada após confirmação e autorização do protagonista.",
    ));
  }

  const details = document.createElement("details");
  details.className = "story-entry__details";
  const summary = textElement("summary", "button button--secondary", "Conheça a história");
  details.append(summary);
  const storyText = textElement(
    "div",
    "story-entry__full-text",
    story.trajetoria || "O relato desta história ainda está sendo preparado. Volte em breve para conhecer essa trajetória.",
  );
  details.append(storyText);
  body.append(details);

  const actions = document.createElement("div");
  actions.className = "story-entry__actions";
  if (story.artesao_nome) {
    const findArtisan = textElement("a", "button button--primary", "Encontre este artesão");
    findArtisan.href = new URL(
      `pages/artesaos.html?nome=${encodeURIComponent(story.artesao_nome)}`,
      root,
    ).href;
    actions.append(findArtisan);
  } else {
    const findArtisan = textElement("button", "button button--primary", "Encontre este artesão");
    findArtisan.type = "button";
    findArtisan.disabled = true;
    findArtisan.setAttribute("aria-describedby", `${article.id}-association-note`);
    actions.append(findArtisan);
    const note = textElement(
      "span",
      "story-entry__action-note",
      "Disponível após identificar o perfil correspondente.",
    );
    note.id = `${article.id}-association-note`;
    actions.append(note);
  }

  if (story.chale && story.agendamento_url) {
    const bookingUrl = new URL(story.agendamento_url, root);
    if (bookingUrl.protocol !== "https:" && bookingUrl.origin !== root.origin) {
      throw new Error(`Destino de agendamento inválido na história ${story.id}.`);
    }

    const booking = textElement("a", "button button--secondary", "Agendar visita a este chalé");
    booking.href = bookingUrl.href;
    if (bookingUrl.origin !== root.origin) {
      booking.target = "_blank";
      booking.rel = "noopener noreferrer";
    }
    actions.append(booking);
  }

  body.append(actions);
  article.append(media, body);
  return article;
}

function isValidStory(story) {
  return story
    && typeof story.id === "string"
    && /^[a-z0-9-]+$/.test(story.id)
    && typeof story.tema === "string"
    && typeof story.segmento === "string"
    && typeof story.fotografia === "string"
    && typeof story.trajetoria === "string"
    && typeof story.status === "string";
}

export async function initStories() {
  const list = document.querySelector("#story-list");
  if (!list) return;

  const status = document.querySelector("#stories-status");
  const empty = document.querySelector("#stories-empty");
  const error = document.querySelector("#stories-error");

  try {
    const response = await fetch(new URL("../data/historias.json", import.meta.url));
    if (!response.ok) {
      throw new Error(`Histórias indisponíveis: HTTP ${response.status}`);
    }

    const stories = await response.json();
    if (!Array.isArray(stories) || stories.some((story) => !isValidStory(story))) {
      throw new Error("O arquivo de histórias possui formato inválido.");
    }

    const root = new URL("../", import.meta.url);
    list.replaceChildren(...stories.map((story) => createStoryEntry(story, root)));
    status.textContent = stories.length
      ? `${stories.length} histórias em preparação.`
      : "";
    empty.hidden = stories.length > 0;
  } catch (loadError) {
    console.error("Falha ao carregar histórias da Vila.", loadError);
    status.textContent = "";
    error.hidden = false;
  }
}
