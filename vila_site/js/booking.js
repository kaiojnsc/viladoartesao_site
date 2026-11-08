const phoneInput = "#booking-phone";
const fieldErrors = {
  "booking-name": "Informe o nome do responsável.",
  "booking-email": "Informe um e-mail válido.",
  "booking-phone": "Informe um telefone com DDD, contendo 10 ou 11 dígitos.",
  "booking-date": "Escolha a data desejada. Ela deve ser hoje ou uma data futura.",
  "booking-count": "Informe uma quantidade inteira de visitantes maior que zero.",
  "booking-type": "Selecione o tipo de visita.",
  "booking-consent": "É necessário concordar com o aviso de privacidade para enviar a solicitação.",
};

function localDateIso(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatPhone(digits) {
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  const areaCode = digits.slice(0, 2);
  const subscriber = digits.slice(2);
  const splitAt = digits.length > 10 ? 5 : 4;
  const formattedSubscriber = subscriber.length > splitAt
    ? `${subscriber.slice(0, splitAt)}-${subscriber.slice(splitAt)}`
    : subscriber;
  return `(${areaCode}) ${formattedSubscriber}`;
}

function setupPhoneMask(input) {
  input.addEventListener("input", () => {
    const digitsBeforeCursor = input.value.slice(0, input.selectionStart ?? input.value.length)
      .replace(/\D/g, "").length;
    const digits = input.value.replace(/\D/g, "");
    input.value = formatPhone(digits);

    let cursor = 0;
    let countedDigits = 0;
    while (cursor < input.value.length && countedDigits < digitsBeforeCursor) {
      if (/\d/.test(input.value[cursor])) countedDigits += 1;
      cursor += 1;
    }
    input.setSelectionRange(cursor, cursor);
  });
}

function validateBookingForm(form, dateInput) {
  let valid = true;

  for (const [fieldId, message] of Object.entries(fieldErrors)) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}-error`);
    field.setCustomValidity("");

    if (fieldId === "booking-phone") {
      const digits = field.value.replace(/\D/g, "");
      if (digits.length !== 10 && digits.length !== 11) {
        field.setCustomValidity(message);
      }
    } else if (fieldId === "booking-date" && field.value) {
      if (field.value < dateInput.min) field.setCustomValidity(message);
    } else if (
      fieldId === "booking-count"
      && field.value
      && (!Number.isInteger(Number(field.value)) || Number(field.value) < 1)
    ) {
      field.setCustomValidity(message);
    }

    const fieldValid = field.checkValidity();
    field.setAttribute("aria-invalid", String(!fieldValid));
    error.textContent = fieldValid ? "" : message;
    valid = fieldValid && valid;
  }

  return valid && form.checkValidity();
}

function isValidFormspreeEndpoint(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:"
      && url.hostname === "formspree.io"
      && /^\/f\/[A-Za-z0-9]+$/.test(url.pathname)
      && !url.search
      && !url.hash;
  } catch {
    return false;
  }
}

function showStatus(status, message, kind) {
  status.textContent = message;
  status.className = `booking-status alert alert--${kind}`;
}

export async function initBooking() {
  const form = document.querySelector("#booking-form");
  if (!form) return;

  const fieldset = document.querySelector("#booking-fields");
  const submitButton = document.querySelector("#booking-submit");
  const setupNotice = document.querySelector("#booking-setup-notice");
  const status = document.querySelector("#booking-status");
  const dateInput = document.querySelector("#booking-date");
  const phone = document.querySelector(phoneInput);

  dateInput.min = localDateIso();
  setupPhoneMask(phone);

  let endpoint;
  try {
    const response = await fetch(new URL("../data/agendamento-config.json", import.meta.url));
    if (!response.ok) {
      throw new Error(`Configuração de agendamento indisponível: HTTP ${response.status}`);
    }

    const config = await response.json();
    if (!config || typeof config.formspree_endpoint !== "string") {
      throw new Error("A configuração de agendamento possui formato inválido.");
    }

    if (typeof config.privacy_notice_approved !== "boolean") {
      throw new Error("Informe se o aviso de privacidade foi revisado e aprovado.");
    }

    if (config.formspree_endpoint) {
      if (!isValidFormspreeEndpoint(config.formspree_endpoint)) {
        throw new Error("Configure somente um endpoint HTTPS público do Formspree.");
      }

      endpoint = config.formspree_endpoint;
      if (config.privacy_notice_approved) {
        setupNotice.textContent = "Sua solicitação será enviada ao Formspree e compartilhada com a equipe responsável para análise. O envio não confirma a visita.";
        fieldset.disabled = false;
        submitButton.disabled = false;
      } else {
        setupNotice.textContent = "O serviço externo foi configurado, mas o envio permanecerá indisponível até que o aviso de privacidade seja revisado e aprovado.";
      }
    }
  } catch (configError) {
    console.error("Falha ao carregar a configuração do formulário de visita.", configError);
    setupNotice.textContent = "Não foi possível verificar a configuração do formulário. Por segurança, o envio permanece indisponível.";
    setupNotice.className = "booking-setup-notice alert alert--error";
    return;
  }

  if (!endpoint || fieldset.disabled) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";
    status.className = "booking-status";

    if (!validateBookingForm(form, dateInput)) {
      showStatus(status, "Revise os campos destacados antes de enviar sua solicitação.", "error");
      form.querySelector('[aria-invalid="true"], input[type="checkbox"]:invalid')?.focus();
      return;
    }

    const payload = new FormData(form);
    payload.set("telefone", phone.value.replace(/\D/g, ""));
    submitButton.disabled = true;
    submitButton.textContent = "Enviando solicitação...";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`O serviço externo recusou a solicitação (HTTP ${response.status}).`);
      }

      form.reset();
      dateInput.min = localDateIso();
      for (const [fieldId] of Object.entries(fieldErrors)) {
        document.getElementById(fieldId).removeAttribute("aria-invalid");
        document.getElementById(`${fieldId}-error`).textContent = "";
      }
      showStatus(
        status,
        "Sua solicitação foi recebida. A visita ainda não está confirmada; a confirmação depende do contato da equipe responsável pela Vila.",
        "success",
      );
    } catch (submissionError) {
      console.error("Falha ao enviar solicitação de visita.", submissionError);
      showStatus(
        status,
        "Não foi possível enviar a solicitação. Seus dados não foram salvos neste site. Tente novamente mais tarde.",
        "error",
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Enviar solicitação de visita";
    }
  });
}
