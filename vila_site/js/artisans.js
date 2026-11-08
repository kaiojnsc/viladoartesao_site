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

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function whatsappUrl(phone) {
  const digits = String(phone ?? "").replace(/\D/g, "");
  let internationalNumber = "";

  if (digits.length === 8 || digits.length === 9) {
    internationalNumber = `5583${digits}`;
  } else if ((digits.length === 10 || digits.length === 11) && digits.startsWith("83")) {
    internationalNumber = `55${digits}`;
  }

  if (!internationalNumber) return "";
  return `https://wa.me/${internationalNumber}`;
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
  chalet.append(chaletLabel, chaletValue);
  card.append(chalet);

  card.append(createTextElement("p", "artisan-catalog-card__segment", `Segmento: ${artisan.categoria}`));

  const contactUrl = artisan.contato_autorizado ? whatsappUrl(artisan.telefone) : "";
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

    selectionStatus.textContent = category
      ? catalog.hidden
        ? `${category} selecionado. Clique em “Fale com um dos nossos artesãos” para ver os resultados.`
        : `Exibindo o segmento: ${category}.`
      : "";

    if (artisans) renderResults();
  }

  function populateCategoryFilter() {
    const categories = [...new Set(artisans.map((artisan) => artisan.categoria))];
    categories.sort((first, second) => {
      const firstIndex = preferredCategories.indexOf(first);
      const secondIndex = preferredCategories.indexOf(second);
      if (firstIndex === -1 && secondIndex === -1) return first.localeCompare(second, "pt-BR");
      if (firstIndex === -1) return 1;
      if (secondIndex === -1) return -1;
      return firstIndex - secondIndex;
    });

    for (const category of categories) {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.append(option);
    }
  }

  function renderResults() {
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
  }

  async function loadArtisans() {
    const response = await fetch(new URL("../data/artesaos.json", import.meta.url));
    if (!response.ok) {
      throw new Error(`Catálogo indisponível: HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data) || data.some((artisan) => (
      typeof artisan.nome !== "string"
      || typeof artisan.categoria !== "string"
      || typeof artisan.chale !== "string"
      || typeof artisan.telefone !== "string"
    ))) {
      throw new Error("O arquivo do catálogo possui formato inválido.");
    }

    return data;
  }

  async function showCatalog() {
    if (catalog.hidden) {
      catalog.hidden = false;
      openButton.setAttribute("aria-expanded", "true");
      openButton.textContent = "Ocultar catálogo de artesãos";
      catalog.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      catalog.hidden = true;
      openButton.setAttribute("aria-expanded", "false");
      openButton.textContent = "Fale com um dos nossos artesãos";
      openButton.focus();
      return;
    }

    errorMessage.hidden = true;
    resultsStatus.textContent = "Carregando o catálogo...";

    if (!artisans) {
      try {
        artisans = await loadArtisans();
        populateCategoryFilter();
      } catch (error) {
        console.error("Falha ao carregar o catálogo de artesãos.", error);
        resultsStatus.textContent = "";
        errorMessage.hidden = false;
        return;
      }
    }

    categoryFilter.value = selectedCategory;
    renderResults();
    search.focus({ preventScroll: true });
  }

  openButton.addEventListener("click", showCatalog);
  search.addEventListener("input", renderResults);
  categoryFilter.addEventListener("change", () => setSelectedCategory(categoryFilter.value));

  for (const button of segmentButtons) {
    button.addEventListener("click", () => {
      const category = selectedCategory === button.dataset.category ? "" : button.dataset.category;
      setSelectedCategory(category);
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
