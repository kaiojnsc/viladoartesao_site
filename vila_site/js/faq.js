import { translate } from "./i18n.js";

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function createAnswerLink(link, root) {
  if (!link || typeof link.texto !== "string" || typeof link.url !== "string") {
    throw new Error("Link de resposta do FAQ possui formato inválido.");
  }

  const href = link.url.startsWith("https:")
    ? new URL(link.url)
    : new URL(link.url, root);
  if (href.protocol !== "https:" && href.origin !== root.origin) {
    throw new Error("Link de resposta do FAQ deve usar HTTPS ou apontar para uma página local.");
  }

  const anchor = createTextElement("a", "faq-answer__link", link.texto);
  anchor.href = href.href;
  if (href.origin !== root.origin) {
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  }
  return anchor;
}

function createQuestionItem(question, root) {
  const item = document.createElement("details");
  item.className = "faq-item";
  item.dataset.searchText = normalizeText(
    `${translate(question.categoria)} ${translate(question.pergunta)} ${translate(question.resposta)}`,
  );

  const summary = document.createElement("summary");
  summary.className = "faq-item__question";
  summary.id = `faq-question-${question.id}`;
  summary.setAttribute("aria-controls", `faq-answer-${question.id}`);
  summary.setAttribute("aria-expanded", "false");
  summary.append(createTextElement("span", "", question.pergunta));

  const icon = document.createElement("span");
  icon.className = "faq-item__icon";
  icon.setAttribute("aria-hidden", "true");
  summary.append(icon);

  const answer = document.createElement("div");
  answer.className = "faq-item__panel";
  answer.id = `faq-answer-${question.id}`;
  const inner = document.createElement("div");
  inner.className = "faq-item__answer";
  inner.append(createTextElement("p", "", question.resposta));

  if (question.link) inner.append(createAnswerLink(question.link, root));

  answer.append(inner);
  item.append(summary, answer);

  // A animação de abrir/fechar é controlada pela classe .is-expanded.
  // O <details> só é fechado depois que a resposta termina de recolher,
  // senão o navegador esconde o conteúdo antes da animação.
  let collapseTimer = 0;

  function finishCollapse() {
    window.clearTimeout(collapseTimer);
    if (!item.classList.contains("is-expanded")) item.open = false;
  }

  function expand() {
    window.clearTimeout(collapseTimer);
    item.open = true;
    void answer.offsetHeight;
    item.classList.add("is-expanded");
    summary.setAttribute("aria-expanded", "true");
  }

  function collapse() {
    item.classList.remove("is-expanded");
    summary.setAttribute("aria-expanded", "false");
    if (reducedMotionQuery.matches) {
      finishCollapse();
      return;
    }
    collapseTimer = window.setTimeout(finishCollapse, 400);
  }

  summary.addEventListener("click", (event) => {
    event.preventDefault();
    if (item.classList.contains("is-expanded")) {
      collapse();
    } else {
      expand();
    }
  });

  answer.addEventListener("transitionend", (event) => {
    if (event.target === answer && event.propertyName === "grid-template-rows") finishCollapse();
  });

  // Abertura feita pelo navegador (ex.: busca na página) também sincroniza o estado.
  item.addEventListener("toggle", () => {
    if (item.open && !item.classList.contains("is-expanded")) {
      item.classList.add("is-expanded");
    } else if (!item.open) {
      item.classList.remove("is-expanded");
    }
    summary.setAttribute("aria-expanded", String(item.open));
  });

  return item;
}

function isValidQuestion(question) {
  return question
    && typeof question.id === "string"
    && /^[a-z0-9-]+$/.test(question.id)
    && typeof question.pergunta === "string"
    && question.pergunta.trim().length > 0
    && typeof question.categoria === "string"
    && question.categoria.trim().length > 0
    && typeof question.resposta === "string"
    && question.resposta.trim().length > 0
    && (!question.link || (
      typeof question.link.texto === "string"
      && typeof question.link.url === "string"
    ));
}

export async function initFaq() {
  const list = document.querySelector("#faq-categories");
  if (!list) return;

  const input = document.querySelector("#faq-search-input");
  const clearButton = document.querySelector("#faq-search-clear");
  const status = document.querySelector("#faq-results-status");
  const emptyState = document.querySelector("#faq-empty-state");
  const errorMessage = document.querySelector("#faq-error");

  try {
    const response = await fetch(new URL("../data/faq.json", import.meta.url));
    if (!response.ok) {
      throw new Error(`Perguntas frequentes indisponíveis: HTTP ${response.status}`);
    }

    const questions = await response.json();
    if (
      !Array.isArray(questions)
      || questions.some((question) => !isValidQuestion(question))
      || new Set(questions.map((question) => question.id)).size !== questions.length
    ) {
      throw new Error("O arquivo de perguntas frequentes possui formato inválido.");
    }

    const root = new URL("../", import.meta.url);
    const categories = new Map();
    const searchableItems = [];
    for (const question of questions) {
      if (!categories.has(question.categoria)) {
        const section = document.createElement("section");
        section.className = "faq-category";
        const heading = createTextElement("h3", "faq-category__title", question.categoria);
        const items = document.createElement("div");
        items.className = "faq-category__items";
        section.append(heading, items);
        categories.set(question.categoria, { section, items });
        list.append(section);
      }

      const category = categories.get(question.categoria);
      const item = createQuestionItem(question, root);
      category.items.append(item);
      searchableItems.push({ item, question });
    }

    function renderResults() {
      const query = normalizeText(input.value);
      let visibleCount = 0;

      for (const category of categories.values()) {
        let categoryCount = 0;
        const items = category.items.querySelectorAll(".faq-item");
        for (const item of items) {
          const matches = !query || item.dataset.searchText.includes(query);
          item.hidden = !matches;
          categoryCount += Number(matches);
        }
        category.section.hidden = categoryCount === 0;
        visibleCount += categoryCount;
      }

      emptyState.hidden = visibleCount > 0;
      status.textContent = query
        ? `${visibleCount} ${visibleCount === 1 ? "pergunta encontrada" : "perguntas encontradas"}.`
        : `${visibleCount} perguntas em ${categories.size} categorias.`;
    }

    input.addEventListener("input", renderResults);
    document.addEventListener("vila:language-change", () => {
      for (const { item, question } of searchableItems) {
        item.dataset.searchText = normalizeText(
          `${translate(question.categoria)} ${translate(question.pergunta)} ${translate(question.resposta)}`,
        );
      }
      renderResults();
    });
    clearButton.addEventListener("click", () => {
      input.value = "";
      input.focus();
      renderResults();
    });
    renderResults();
  } catch (loadError) {
    console.error("Falha ao carregar as perguntas frequentes da Vila.", loadError);
    status.textContent = "";
    errorMessage.hidden = false;
  }
}
