import { getCurrentLanguage } from "./i18n.js";

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function validVisitDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const [, year, month, day] = match;
  const date = new Date(0);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCFullYear(Number(year), Number(month) - 1, Number(day));
  if (
    date.getUTCFullYear() !== Number(year)
    || date.getUTCMonth() !== Number(month) - 1
    || date.getUTCDate() !== Number(day)
  ) {
    return null;
  }

  return date;
}

function isPublishableText(value) {
  return typeof value === "string"
    && value.trim() !== ""
    && !/\b(?:a_definir|a definir|a confirmar|aguardando|em breve|pendente|provisóri[oa]|rascunho|exemplo|placeholder)\b|\blorem ipsum\b/i.test(value);
}

function isVisitEvent(event) {
  return event
    && ["confirmado", "publicado"].includes(
      typeof event.status === "string" ? event.status.trim().toLocaleLowerCase("pt-BR") : "",
    )
    && isPublishableText(event.nome)
    && isPublishableText(event.descricao)
    && validVisitDate(event.data);
}

function createVisitEventCard(event) {
  const card = document.createElement("article");
  card.className = "visit-event-card";

  const title = createTextElement("h3", "", event.nome.trim());
  const eventDate = validVisitDate(event.data);
  const date = createTextElement(
    "time",
    "",
    new Intl.DateTimeFormat(getCurrentLanguage(), {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(eventDate),
  );
  date.dateTime = event.data;

  card.append(
    title,
    date,
    createTextElement("p", "", event.descricao.trim()),
  );

  if (typeof event.saiba_mais_url === "string" && event.saiba_mais_url.trim()) {
    try {
      const detailsUrl = new URL(event.saiba_mais_url, window.location.href);
      if (detailsUrl.protocol === "https:" || detailsUrl.origin === window.location.origin) {
        const link = createTextElement("a", "button button--secondary", "Saiba mais");
        link.href = detailsUrl.href;
        if (detailsUrl.origin !== window.location.origin) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
        card.append(link);
      }
    } catch (error) {
      console.warn(`Link adicional inválido para o evento "${event.nome}".`, error);
    }
  }

  return card;
}

export async function initEvents() {
  const grid = document.querySelector("#visit-event-grid");
  if (!grid) return;

  const emptyState = document.querySelector("#visit-events-empty");
  const errorMessage = document.querySelector("#visit-events-error");

  try {
    const response = await fetch(new URL("../data/eventos.json", import.meta.url));
    if (!response.ok) {
      throw new Error(`Programação indisponível: HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("O arquivo de eventos deve conter uma lista.");
    }

    const today = new Date();
    const todayValue = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    const confirmedEvents = data
      .filter(isVisitEvent)
      .sort((first, second) => {
        const firstDate = validVisitDate(first.data).getTime();
        const secondDate = validVisitDate(second.data).getTime();
        const firstIsUpcoming = firstDate >= todayValue;
        const secondIsUpcoming = secondDate >= todayValue;

        if (firstIsUpcoming !== secondIsUpcoming) return firstIsUpcoming ? -1 : 1;
        return firstIsUpcoming ? firstDate - secondDate : secondDate - firstDate;
      });

    grid.replaceChildren(...confirmedEvents.map(createVisitEventCard));
    emptyState.hidden = confirmedEvents.length > 0;
    errorMessage.hidden = true;
  } catch (loadError) {
    console.error("Falha ao carregar a programação da Vila.", loadError);
    grid.replaceChildren();
    emptyState.hidden = true;
    errorMessage.hidden = false;
  }
}
