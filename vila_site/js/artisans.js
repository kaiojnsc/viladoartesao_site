import { getCurrentLanguage } from "./i18n.js";
import { clearSkeleton, showSkeleton } from "./skeleton.js";

const preferredCategories = [
  "Couro",
  "Madeira",
  "Tecidos e bordados",
  "Crochê e trabalhos manuais",
  "Gastronomia",
  "Bebidas e licores",
  "Arte e decoração",
  "Artesanato geral",
  "Não informado",
];

const categorySet = new Set(preferredCategories);
const optionalPublicationFlags = [
  "ativo",
  "publicacao_autorizada",
  "duplicado_confirmado",
];
const contactMessage = "Olá, encontrei seu contato no site da Vila e desejo mais informações.";

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function getChaletNumber(value) {
  const chalet = value.trim();
  if (!/^\d+$/.test(chalet)) return null;

  const number = Number(chalet);
  return Number.isSafeInteger(number) && number > 0 ? String(number) : null;
}

function isCompletePublicRecord(artisan) {
  return artisan.ativo !== false
    && artisan.publicacao_autorizada !== false
    && artisan.duplicado_confirmado !== true
    && Boolean(artisan.nome.trim())
    && Boolean(artisan.segmento_original.trim())
    && categorySet.has(artisan.categoria)
    && getChaletNumber(artisan.chale) !== null;
}

function validateArtisanData(data) {
  if (!Array.isArray(data)) {
    throw new Error("O arquivo do catálogo possui formato inválido.");
  }

  const identifiers = new Set();
  for (const artisan of data) {
    if (
      !artisan
      || !Number.isSafeInteger(artisan.id)
      || artisan.id < 1
      || typeof artisan.nome !== "string"
      || typeof artisan.telefone !== "string"
      || typeof artisan.chale !== "string"
      || typeof artisan.segmento_original !== "string"
      || typeof artisan.categoria !== "string"
      || !categorySet.has(artisan.categoria)
      || typeof artisan.contato_autorizado !== "boolean"
      || optionalPublicationFlags.some((flag) => (
        artisan[flag] !== undefined && typeof artisan[flag] !== "boolean"
      ))
    ) {
      throw new Error("O arquivo do catálogo possui campos inválidos.");
    }

    if (identifiers.has(artisan.id)) {
      throw new Error("O catálogo contém identificadores duplicados.");
    }
    identifiers.add(artisan.id);
  }

  return data;
}

async function loadArtisanData() {
  const response = await fetch(new URL("../data/artesaos.json", import.meta.url));
  if (!response.ok) {
    throw new Error(`Catálogo indisponível: HTTP ${response.status}`);
  }

  return validateArtisanData(await response.json());
}

function getPublicArtisans(data) {
  return data.filter(isCompletePublicRecord);
}

function getInternationalPhoneDigits(phone) {
  const formattedPhone = phone.trim();
  if (!/^\+[0-9\s().-]+$/.test(formattedPhone)) return "";

  const normalizedPhone = formattedPhone.replace(/[\s().-]/g, "");
  return /^\+[1-9]\d{7,14}$/.test(normalizedPhone)
    ? normalizedPhone.slice(1)
    : "";
}

function whatsappUrl(artisan) {
  if (!artisan.contato_autorizado) return "";
  const internationalDigits = getInternationalPhoneDigits(artisan.telefone);
  if (!internationalDigits) return "";

  return `https://wa.me/${internationalDigits}?text=${encodeURIComponent(contactMessage)}`;
}

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function createArtisanCard(artisan) {
  const card = document.createElement("article");
  card.className = "artisan-catalog-card";

  card.append(createTextElement("h3", "artisan-catalog-card__name", artisan.nome));

  const chalet = document.createElement("p");
  chalet.className = "artisan-catalog-card__chalet";
  const chaletLabel = document.createElement("span");
  chaletLabel.textContent = "Chalé";
  const chaletValue = document.createElement("strong");
  chaletValue.textContent = artisan.chale || "Não informado";
  if (artisan.chale) chaletValue.dataset.i18nIgnore = "";
  const name = card.querySelector(".artisan-catalog-card__name");
  name.dataset.i18nIgnore = "";
  chalet.append(chaletLabel, chaletValue);
  card.append(chalet);

  const segment = document.createElement("p");
  segment.className = "artisan-catalog-card__segment";
  segment.append(
    createTextElement("span", "", "Segmento: "),
    createTextElement("span", "", artisan.categoria),
  );
  card.append(segment);

  const contactUrl = whatsappUrl(artisan);
  if (contactUrl) {
    const contact = createTextElement("a", "artisan-catalog-card__contact", "Falar com o artesão");
    contact.href = contactUrl;
    contact.target = "_blank";
    contact.rel = "noopener noreferrer";
    contact.setAttribute("aria-label", `Falar com ${artisan.nome} pelo WhatsApp`);
    card.append(contact);
  } else {
    card.append(createTextElement("p", "artisan-catalog-card__contact-note", "Contato não disponível"));
  }

  return card;
}

export function initArtisans() {
  const catalog = document.querySelector("#artisan-catalog");
  const openButton = document.querySelector("#open-artisan-catalog");
  if (!catalog || !openButton) return;

  const search = document.querySelector("#artisan-search");
  const categoryFilter = document.querySelector("#artisan-category");
  const resultContainer = document.querySelector("#artisan-results");
  const resultsStatus = document.querySelector("#artisan-results-status");
  const emptyState = document.querySelector("#artisan-empty-state");
  const errorMessage = document.querySelector("#artisan-data-error");
  const selectionStatus = document.querySelector("#artisan-selection-status");
  const segmentButtons = [...document.querySelectorAll(".artisan-segment")];
  const showAllButton = document.querySelector("#show-all-artisans");
  const clearButton = document.querySelector("#clear-artisan-filters");
  let artisans = null;
  let selectedCategory = "";

  const requestedName = new URLSearchParams(window.location.search).get("nome");
  if (requestedName) search.value = requestedName;

  function setSelectedCategory(category) {
    selectedCategory = category;
    categoryFilter.value = category;

    for (const button of segmentButtons) {
      button.setAttribute("aria-pressed", String(button.dataset.category === category));
    }

    selectionStatus.textContent = category && !catalog.hidden
      ? `Exibindo o segmento: ${category}.`
      : "";

    if (artisans) renderResults({ animate: true });
  }

  function populateCategoryFilter() {
    const categories = [...new Set(artisans.map((artisan) => artisan.categoria))];
    const availableCategories = new Set(categories);
    categories.sort((first, second) => {
      const firstIndex = preferredCategories.indexOf(first);
      const secondIndex = preferredCategories.indexOf(second);
      if (firstIndex === -1 && secondIndex === -1) return first.localeCompare(second, "pt-BR");
      if (firstIndex === -1) return 1;
      if (secondIndex === -1) return -1;
      return firstIndex - secondIndex;
    });

    for (const category of categories) {
      if (category === "Não informado") continue;
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.append(option);
    }

    for (const button of segmentButtons) {
      button.hidden = !availableCategories.has(button.dataset.category);
    }

    if (selectedCategory && !availableCategories.has(selectedCategory)) {
      setSelectedCategory("");
    }
  }

  function renderResults({ animate = false } = {}) {
    if (!artisans) return;

    const nameQuery = normalizeText(search.value);
    const selectedFilter = categoryFilter.value;
    const filteredArtisans = artisans.filter((artisan) => {
      const matchesName = normalizeText(artisan.nome).includes(nameQuery);
      const matchesCategory = !selectedFilter || artisan.categoria === selectedFilter;
      return matchesName && matchesCategory;
    });

    resultContainer.replaceChildren(...filteredArtisans.map(createArtisanCard));
    resultsStatus.textContent = filteredArtisans.length === 1
      ? "1 artesão encontrado."
      : `${filteredArtisans.length} artesãos encontrados.`;
    emptyState.hidden = filteredArtisans.length > 0;

    // Ao trocar de segmento, reinicia o fade da lista para indicar a mudança.
    if (animate) {
      for (const element of [resultsStatus, resultContainer]) {
        element.classList.remove("is-updated");
        void element.offsetWidth;
        element.classList.add("is-updated");
      }
    } else {
      resultsStatus.classList.remove("is-updated");
      resultContainer.classList.remove("is-updated");
    }
  }

  function closeCatalog() {
    catalog.hidden = true;
    openButton.setAttribute("aria-expanded", "false");
    openButton.textContent = "Fale com um dos nossos artesãos";
    selectionStatus.textContent = "";
    openButton.focus();
  }

  async function openCatalog({ focusSearch = true } = {}) {
    const wasHidden = catalog.hidden;
    if (wasHidden) {
      catalog.hidden = false;
      openButton.setAttribute("aria-expanded", "true");
      openButton.textContent = "Ocultar catálogo de artesãos";
    }
    catalog.scrollIntoView({ behavior: "smooth", block: "start" });

    if (!artisans) {
      errorMessage.hidden = true;
      resultsStatus.textContent = "Carregando o catálogo...";
      showSkeleton(resultContainer, { count: 3, variant: "text" });
      try {
        artisans = getPublicArtisans(await loadArtisanData());
        resultContainer.removeAttribute("aria-busy");
        populateCategoryFilter();
      } catch (error) {
        console.error("Falha ao carregar o catálogo de artesãos.", error);
        clearSkeleton(resultContainer);
        resultsStatus.textContent = "";
        errorMessage.hidden = false;
        return;
      }
    }

    setSelectedCategory(selectedCategory);
    if (focusSearch) search.focus({ preventScroll: true });
  }

  openButton.addEventListener("click", () => {
    if (catalog.hidden) {
      openCatalog();
    } else {
      closeCatalog();
    }
  });
  search.addEventListener("input", () => renderResults());
  categoryFilter.addEventListener("change", () => setSelectedCategory(categoryFilter.value));

  for (const button of segmentButtons) {
    button.addEventListener("click", () => {
      const isSameCategory = selectedCategory === button.dataset.category && !catalog.hidden;
      selectedCategory = isSameCategory ? "" : button.dataset.category;
      openCatalog({ focusSearch: false });
    });
  }

  showAllButton.addEventListener("click", () => {
    search.value = "";
    setSelectedCategory("");
    search.focus();
  });

  clearButton.addEventListener("click", () => {
    search.value = "";
    setSelectedCategory("");
    search.focus();
  });
}

export async function initArtisanIndicators() {
  const indicators = document.querySelector("#artisan-indicators");
  if (!indicators) return;

  const errorMessage = document.querySelector("#artisan-indicator-error");
  const emptyMessage = document.querySelector("#artisan-indicator-empty");
  const countElements = new Map(
    [...indicators.querySelectorAll("[data-indicator-item]")].map((item) => [
      item.dataset.indicatorItem,
      {
        item,
        value: item.querySelector("[data-indicator-value]"),
      },
    ]),
  );
  let counts = null;

  function renderCounts() {
    if (!counts) return;

    let visibleIndicators = 0;
    for (const [name, count] of Object.entries(counts)) {
      const indicator = countElements.get(name);
      if (!indicator) {
        throw new Error(`Indicador do catálogo ausente: ${name}`);
      }

      const isAvailable = Number.isSafeInteger(count) && count > 0;
      indicator.item.hidden = !isAvailable;
      if (isAvailable) {
        indicator.value.textContent = new Intl.NumberFormat(getCurrentLanguage()).format(count);
        visibleIndicators += 1;
      }
    }

    indicators.hidden = visibleIndicators === 0;
    emptyMessage.hidden = visibleIndicators > 0;
  }

  document.addEventListener("vila:language-change", renderCounts);

  let data;
  try {
    data = await loadArtisanData();
  } catch (error) {
    console.error("Falha ao carregar os indicadores do catálogo.", error);
    indicators.hidden = true;
    emptyMessage.hidden = true;
    errorMessage.hidden = false;
    return;
  }

  const artisans = getPublicArtisans(data);
  const chaletNumbers = new Set(
    artisans.map((artisan) => getChaletNumber(artisan.chale)),
  );
  counts = {
    records: artisans.length,
    chalets: chaletNumbers.size,
    contacts: artisans.filter((artisan) => Boolean(whatsappUrl(artisan))).length,
  };
  errorMessage.hidden = true;
  renderCounts();
}
