import { dynamicCatalog } from "./i18n/dynamic-catalog.js";
import { staticCatalog } from "./i18n/static-catalog.js";

const STORAGE_KEY = "vila-artesao-language";
const LANGUAGES = ["pt-BR", "en", "es"];
const catalogs = {
  en: { ...staticCatalog.en, ...dynamicCatalog.en },
  es: { ...staticCatalog.es, ...dynamicCatalog.es },
};
const textSources = new WeakMap();
const attributeSources = new WeakMap();
const missingTranslations = new Map();
let currentLanguage = "pt-BR";
let observer;

function normalize(value) {
  return value.replace(/\s+/g, " ").trim();
}

function recordMissing(source) {
  if (!source || !/[A-Za-zÀ-ÿ]/.test(source)) return;
  const locales = missingTranslations.get(source) || new Set();
  locales.add(currentLanguage);
  missingTranslations.set(source, locales);
}

function translatePattern(source) {
  let match = /^© (\d{4}) Vila do Artesão\. Todos os direitos reservados\.$/.exec(source);
  if (match) {
    return currentLanguage === "en"
      ? `© ${match[1]} Vila do Artesão. All rights reserved.`
      : `© ${match[1]} Vila do Artesão. Todos los derechos reservados.`;
  }

  match = /^(\d+) publicações, (\d+) vídeos, (\d+) Reels e (\d+) depoimentos\.$/.exec(source);
  if (match) {
    const [, publications, videos, reels, testimonials] = match;
    if (currentLanguage === "en") {
      return `${publications} publications, ${videos} videos, ${reels} Reels, and ${testimonials} testimonials.`;
    }
    return `${publications} publicaciones, ${videos} videos, ${reels} Reels y ${testimonials} testimonios.`;
  }

  match = /^(\d+) vídeos disponíveis\.$/.exec(source);
  if (match) {
    return currentLanguage === "en"
      ? `${match[1]} videos available.`
      : `${match[1]} videos disponibles.`;
  }

  match = /^(\d+) sugestões de roteiro em preparação\.$/.exec(source);
  if (match) {
    return currentLanguage === "en"
      ? `${match[1]} itinerary suggestions in preparation.`
      : `${match[1]} sugerencias de itinerarios en preparación.`;
  }

  match = /^(\d+) perguntas em (\d+) categorias\.$/.exec(source);
  if (match) {
    return currentLanguage === "en"
      ? `${match[1]} questions in ${match[2]} categories.`
      : `${match[1]} preguntas en ${match[2]} categorías.`;
  }

  match = /^(\d+) perguntas? encontradas?\.$/.exec(source);
  if (match) {
    const singular = match[1] === "1";
    return currentLanguage === "en"
      ? `${match[1]} ${singular ? "question found" : "questions found"}.`
      : `${match[1]} ${singular ? "pregunta encontrada" : "preguntas encontradas"}.`;
  }

  match = /^(\d+) artesãos? encontrados?\.$/.exec(source);
  if (match) {
    const singular = match[1] === "1";
    return currentLanguage === "en"
      ? `${match[1]} ${singular ? "artisan found" : "artisans found"}.`
      : `${match[1]} ${singular ? "artesano encontrado" : "artesanos encontrados"}.`;
  }

  match = /^(\d+) evento\(s\) confirmado\(s\) e (\d+) tema\(s\) em preparação\.$/.exec(source);
  if (match) {
    return currentLanguage === "en"
      ? `${match[1]} confirmed event(s) and ${match[2]} topics in preparation.`
      : `${match[1]} evento(s) confirmado(s) y ${match[2]} temas en preparación.`;
  }

  match = /^(\d+) tema\(s\) em preparação; ainda sem datas confirmadas\.$/.exec(source);
  if (match) {
    return currentLanguage === "en"
      ? `${match[1]} topics in preparation; dates are not confirmed yet.`
      : `${match[1]} temas en preparación; las fechas aún no están confirmadas.`;
  }

  match = /^Período selecionado: (.+)\. As datas só serão exibidas após confirmação\.$/.exec(source);
  if (match) {
    const period = translate(match[1]);
    return currentLanguage === "en"
      ? `Selected period: ${period}. Dates will appear only after confirmation.`
      : `Período seleccionado: ${period}. Las fechas se mostrarán solo después de su confirmación.`;
  }

  match = /^Exibindo o segmento: (.+)\.$/.exec(source);
  if (match) {
    const category = translate(match[1]);
    return currentLanguage === "en"
      ? `Showing the ${category} segment.`
      : `Mostrando el segmento: ${category}.`;
  }

  match = /^(.+) selecionado\. Clique em “Fale com um dos nossos artesãos” para ver os resultados\.$/.exec(source);
  if (match) {
    const category = translate(match[1]);
    return currentLanguage === "en"
      ? `${category} selected. Click “Contact one of our artisans” to see the results.`
      : `${category} seleccionado. Haz clic en “Contactar a uno de nuestros artesanos” para ver los resultados.`;
  }

  match = /^Nenhuma data confirmada para (.+)\. Consulte novamente em breve\.$/.exec(source);
  if (match) {
    const month = translate(match[1]);
    return currentLanguage === "en"
      ? `No confirmed dates for ${month}. Please check again soon.`
      : `No hay fechas confirmadas para ${month}. Consulta de nuevo pronto.`;
  }

  match = /^Falar com (.+) pelo WhatsApp$/.exec(source);
  if (match) {
    return currentLanguage === "en"
      ? `Contact ${match[1]} via WhatsApp`
      : `Contactar a ${match[1]} por WhatsApp`;
  }

  match = /^Imagem de (.+)$/.exec(source);
  if (match) {
    const subject = translate(match[1]);
    return currentLanguage === "en" ? `Image of ${subject}` : `Imagen de ${subject}`;
  }

  return null;
}

function preserveNode(node) {
  return !node
    || node.closest("[data-i18n-ignore]")
    || node.closest("script, style, svg, time[datetime]");
}

export function getCurrentLanguage() {
  return currentLanguage;
}

export function formatStarLabel(rating) {
  if (currentLanguage === "en") return `${rating} out of 5 stars`;
  if (currentLanguage === "es") return `${rating} de 5 estrellas`;
  return `${rating} de 5 estrelas`;
}

export function translate(source) {
  if (typeof source !== "string" || currentLanguage === "pt-BR") return source;
  const key = normalize(source);
  const translation = catalogs[currentLanguage][key] || translatePattern(key);
  if (typeof translation === "string") return translation;
  recordMissing(source);
  return source;
}

function translateTextNode(node) {
  if (!node.parentElement || preserveNode(node.parentElement)) return;
  const current = node.nodeValue;
  let state = textSources.get(node);
  if (!state || current !== state.translated) {
    state = { source: current, translated: current };
    textSources.set(node, state);
  }
  if (!state.source.trim()) return;

  const leading = state.source.match(/^\s*/)[0];
  const trailing = state.source.match(/\s*$/)[0];
  const translated = translate(state.source.trim());
  const value = `${leading}${translated}${trailing}`;
  state.translated = value;
  if (current !== value) node.nodeValue = value;
}

function translateAttribute(element, attribute) {
  if (element.closest("[data-i18n-ignore]")) return;
  if (
    attribute === "content"
    && element.matches("meta")
    && !element.matches('meta[name="description"], meta[property="og:title"], meta[property="og:description"]')
  ) {
    return;
  }
  let attributes = attributeSources.get(element);
  if (!attributes) {
    attributes = new Map();
    attributeSources.set(element, attributes);
  }

  const current = element.getAttribute(attribute);
  if (current === null) return;
  let state = attributes.get(attribute);
  if (!state || current !== state.translated) {
    state = { source: current, translated: current };
    attributes.set(attribute, state);
  }

  const translated = translate(state.source);
  state.translated = translated;
  if (current !== translated) {
    element.setAttribute(attribute, translated);
  }
}

function formatTimeElement(element) {
  const value = element.dateTime;
  const isMonth = /^\d{4}-\d{2}$/.test(value);
  const date = new Date(`${value}${isMonth ? "-01" : ""}T12:00:00`);
  if (Number.isNaN(date.getTime())) return;

  const options = isMonth
    ? { month: "long", year: "numeric" }
    : { day: "numeric", month: "long", year: "numeric" };
  element.textContent = new Intl.DateTimeFormat(currentLanguage, options).format(date);
}

function translateSubtree(root) {
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;

  if (root.nodeType === Node.ELEMENT_NODE) {
    for (const attribute of ["alt", "aria-label", "aria-description", "placeholder", "title", "content"]) {
      if (root.hasAttribute(attribute)) translateAttribute(root, attribute);
    }
    if (root.matches("time[datetime]")) formatTimeElement(root);
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) translateTextNode(node);

  if (root.querySelectorAll) {
    for (const element of root.querySelectorAll("[alt], [aria-label], [aria-description], [placeholder], [title], meta[content], time[datetime]")) {
      if (element.matches("time[datetime]")) {
        formatTimeElement(element);
      } else {
        for (const attribute of ["alt", "aria-label", "aria-description", "placeholder", "title", "content"]) {
          if (element.hasAttribute(attribute)) translateAttribute(element, attribute);
        }
      }
    }
  }
}

function updateDocumentLanguage() {
  document.documentElement.lang = currentLanguage;
  const localeMeta = document.querySelector('meta[property="og:locale"]');
  if (localeMeta) {
    localeMeta.content = currentLanguage === "pt-BR"
      ? "pt_BR"
      : currentLanguage === "en" ? "en_US" : "es_ES";
  }
}

function readSavedLanguage() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.includes(saved) ? saved : "pt-BR";
  } catch (error) {
    console.warn("Não foi possível ler a preferência de idioma salva.", error);
    return "pt-BR";
  }
}

export function setLanguage(language) {
  if (!LANGUAGES.includes(language)) {
    throw new Error(`Idioma não suportado: ${language}`);
  }

  currentLanguage = language;
  updateDocumentLanguage();
  translateSubtree(document);

  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch (error) {
    console.warn("Não foi possível salvar a preferência de idioma.", error);
  }

  document.dispatchEvent(new CustomEvent("vila:language-change", {
    detail: { language },
  }));
}

export function getMissingTranslations() {
  return [...missingTranslations]
    .map(([source, locales]) => ({ source, locales: [...locales].sort() }))
    .sort((first, second) => first.source.localeCompare(second.source));
}

export function initI18n() {
  currentLanguage = readSavedLanguage();
  updateDocumentLanguage();
  translateSubtree(document);

  if (!observer && document.documentElement) {
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          translateTextNode(mutation.target);
        } else if (mutation.type === "attributes") {
          translateAttribute(mutation.target, mutation.attributeName);
        } else {
          for (const node of mutation.addedNodes) translateSubtree(node);
        }
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["alt", "aria-label", "aria-description", "placeholder", "title", "content"],
      characterData: true,
      childList: true,
      subtree: true,
    });
  }

  window.vilaI18n = {
    getLanguage: getCurrentLanguage,
    getMissingTranslations,
    setLanguage,
    translate,
  };
}
