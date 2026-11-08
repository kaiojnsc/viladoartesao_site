const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const eventCategories = [
  "São João",
  "Natal",
  "Dia do Artesão",
  "Datas comemorativas",
  "Feiras e exposições",
  "Eventos especiais",
];

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function formatEventDate(value) {
  if (!value) return "Data a definir";
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return "Data a definir";

  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    date.getFullYear() !== Number(year)
    || date.getMonth() !== Number(month) - 1
    || date.getDate() !== Number(day)
  ) {
    return "Data a definir";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function createImagePlaceholder() {
  const placeholder = document.createElement("div");
  placeholder.className = "event-card__image-placeholder";
  placeholder.setAttribute("role", "img");
  placeholder.setAttribute("aria-label", "Imagem do evento ainda não disponível");

  const icon = document.createElement("span");
  icon.className = "event-card__image-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML = `
    <svg viewBox="0 0 48 48" focusable="false">
      <rect x="5" y="8" width="38" height="32" rx="3"></rect>
      <circle cx="17" cy="19" r="3"></circle>
      <path d="m8 36 11-11 7 7 5-5 9 9"></path>
    </svg>`;

  placeholder.append(icon, createTextElement("span", "", "Imagem a incluir"));
  return placeholder;
}

function createEventCard(event) {
  const card = document.createElement("article");
  card.className = "event-calendar-card";
  card.dataset.category = event.categoria;

  const media = document.createElement("div");
  media.className = "event-calendar-card__media";
  if (event.imagem) {
    const imagePath = event.imagem.replace(/^\/+/, "");
    if (!imagePath.startsWith("assets/img/")) {
      throw new Error(`Caminho de imagem inválido no evento ${event.id}.`);
    }

    const image = document.createElement("img");
    image.src = new URL(`../${imagePath}`, import.meta.url).href;
    image.alt = event.imagem_alt || `Imagem de ${event.nome || event.categoria}`;
    image.loading = "lazy";
    media.append(image);
  } else {
    media.append(createImagePlaceholder());
  }

  const body = document.createElement("div");
  body.className = "event-calendar-card__body";
  body.append(createTextElement("span", "event-calendar-card__category", event.categoria));
  body.append(createTextElement(
    "h3",
    "event-calendar-card__title",
    event.nome || event.categoria,
  ));
  body.append(createTextElement(
    "p",
    "event-calendar-card__date",
    formatEventDate(event.data),
  ));
  body.append(createTextElement(
    "p",
    "event-calendar-card__description",
    event.descricao || "Descrição a definir após confirmação das informações do evento.",
  ));

  if (event.status !== "confirmado" || !eventMonth(event)) {
    body.append(createTextElement(
      "p",
      "event-calendar-card__pending",
      "Conteúdo a definir — data e programação ainda não confirmadas.",
    ));
  }

  if (event.informacoes_adicionais) {
    body.append(createTextElement(
      "p",
      "event-calendar-card__additional",
      event.informacoes_adicionais,
    ));
  }

  if (event.saiba_mais_url) {
    const detailsUrl = new URL(event.saiba_mais_url, window.location.href);
    if (detailsUrl.protocol !== "https:" && detailsUrl.origin !== window.location.origin) {
      throw new Error(`Link Saiba mais inválido no evento ${event.id}.`);
    }

    const detailsLink = createTextElement(
      "a",
      "button button--secondary event-calendar-card__link",
      "Saiba mais",
    );
    detailsLink.href = detailsUrl.href;
    if (detailsUrl.origin !== window.location.origin) {
      detailsLink.target = "_blank";
      detailsLink.rel = "noopener noreferrer";
    }
    body.append(detailsLink);
  }

  card.append(media, body);
  return card;
}

function isValidEvent(event) {
  return event
    && typeof event.id === "string"
    && /^[a-z0-9-]+$/.test(event.id)
    && typeof event.nome === "string"
    && typeof event.data === "string"
    && typeof event.descricao === "string"
    && typeof event.imagem === "string"
    && typeof event.categoria === "string"
    && typeof event.informacoes_adicionais === "string"
    && typeof event.saiba_mais_url === "string"
    && typeof event.status === "string";
}

function eventMonth(event) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(event.data);
  if (!match) return "";

  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    date.getFullYear() !== Number(year)
    || date.getMonth() !== Number(month) - 1
    || date.getDate() !== Number(day)
  ) {
    return "";
  }

  return match[2];
}

export async function initEvents() {
  const calendar = document.querySelector("#calendar-months");
  if (!calendar) return;

  const categorySelect = document.querySelector("#calendar-category");
  const cardGrid = document.querySelector("#event-card-grid");
  const resultsStatus = document.querySelector("#calendar-results-status");
  const emptyState = document.querySelector("#calendar-empty-state");
  const errorMessage = document.querySelector("#calendar-error");
  const selectionStatus = document.querySelector("#calendar-selection-status");
  let selectedMonth = "";
  let events = [];

  function renderMonths() {
    const allMonthsButton = createTextElement("button", "calendar-month", "Todas as datas");
    allMonthsButton.type = "button";
    allMonthsButton.dataset.month = "";
    allMonthsButton.setAttribute("aria-pressed", String(selectedMonth === ""));
    calendar.append(allMonthsButton);

    monthNames.forEach((name, index) => {
      const month = String(index + 1).padStart(2, "0");
      const button = createTextElement("button", "calendar-month", name);
      button.type = "button";
      button.dataset.month = month;
      button.setAttribute("aria-pressed", String(selectedMonth === month));
      button.append(createTextElement("span", "calendar-month__status", "Datas a confirmar"));
      calendar.append(button);
    });
  }

  function updateMonthSelection() {
    for (const button of calendar.querySelectorAll(".calendar-month")) {
      const month = button.dataset.month;
      const pressed = month ? selectedMonth === month : selectedMonth === "";
      button.setAttribute("aria-pressed", String(pressed));
    }

    const selectedName = selectedMonth
      ? monthNames[Number(selectedMonth) - 1]
      : "Todas as datas";
    selectionStatus.textContent = `Período selecionado: ${selectedName}. As datas só serão exibidas após confirmação.`;
  }

  function renderEvents() {
    const selectedCategory = categorySelect.value;
    const confirmedEvents = events.filter((event) => (
      event.status === "confirmado"
      && eventMonth(event)
      && (!selectedMonth || eventMonth(event) === selectedMonth)
      && (!selectedCategory || event.categoria === selectedCategory)
    ));
    const pendingEvents = events.filter((event) => (
      !(event.status === "confirmado" && eventMonth(event))
      && !selectedMonth
      && (!selectedCategory || event.categoria === selectedCategory)
    ));
    const visibleEvents = [...confirmedEvents, ...pendingEvents];

    cardGrid.replaceChildren(...visibleEvents.map(createEventCard));
    emptyState.hidden = visibleEvents.length > 0;
    resultsStatus.textContent = visibleEvents.length
      ? confirmedEvents.length
        ? `${confirmedEvents.length} evento(s) confirmado(s) e ${pendingEvents.length} tema(s) em preparação.`
        : `${pendingEvents.length} tema(s) em preparação; ainda sem datas confirmadas.`
      : "";

    if (!visibleEvents.length) {
      emptyState.textContent = selectedMonth
        ? `Nenhuma data confirmada para ${monthNames[Number(selectedMonth) - 1]}. Consulte novamente em breve.`
        : "Nenhuma data confirmada para esta seleção. Consulte novamente em breve.";
    }
  }

  function setMonth(value) {
    selectedMonth = value;
    updateMonthSelection();
    renderEvents();
  }

  try {
    const response = await fetch(new URL("../data/eventos.json", import.meta.url));
    if (!response.ok) {
      throw new Error(`Programação indisponível: HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data) || data.some((event) => !isValidEvent(event))) {
      throw new Error("O arquivo de eventos possui formato inválido.");
    }

    events = data;
    const categories = [...new Set(events.map((event) => event.categoria))];
    categories.sort((first, second) => {
      const firstIndex = eventCategories.indexOf(first);
      const secondIndex = eventCategories.indexOf(second);
      if (firstIndex === -1 && secondIndex === -1) return first.localeCompare(second, "pt-BR");
      if (firstIndex === -1) return 1;
      if (secondIndex === -1) return -1;
      return firstIndex - secondIndex;
    });

    for (const category of categories) {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categorySelect.append(option);
    }

    renderMonths();
    updateMonthSelection();
    renderEvents();
  } catch (loadError) {
    console.error("Falha ao carregar o calendário da Vila.", loadError);
    resultsStatus.textContent = "";
    errorMessage.hidden = false;
  }

  calendar.addEventListener("click", (event) => {
    const button = event.target.closest(".calendar-month");
    if (button) setMonth(button.dataset.month);
  });

  categorySelect.addEventListener("change", renderEvents);
}
