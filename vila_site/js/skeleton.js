// Placeholders em formato de card enquanto os dados (JSON) carregam.
// São decorativos (aria-hidden); o texto de status da página continua
// informando o carregamento para leitores de tela.

export function showSkeleton(container, { count = 3, variant = "card" } = {}) {
  if (!container) return;

  const items = Array.from({ length: count }, () => {
    const card = document.createElement("div");
    card.className = `skeleton skeleton--${variant}`;
    card.setAttribute("aria-hidden", "true");

    if (variant === "card") {
      const media = document.createElement("span");
      media.className = "skeleton__block";
      card.append(media);
    }

    for (const size of ["lg", "md", "sm"]) {
      const line = document.createElement("span");
      line.className = `skeleton__line skeleton__line--${size}`;
      card.append(line);
    }

    return card;
  });

  container.setAttribute("aria-busy", "true");
  container.replaceChildren(...items);
}

export function clearSkeleton(container) {
  if (!container) return;
  container.removeAttribute("aria-busy");
  container.querySelectorAll(":scope > .skeleton").forEach((element) => element.remove());
}
