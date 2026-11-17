const mobileMenuQuery = window.matchMedia("(max-width: 60rem)");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

export function initNavigation() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");

  if (!button || !nav) return;

  let closeTimer = 0;

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false, { animate: false });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      button.focus();
    }
  });

  function finishClosing() {
    window.clearTimeout(closeTimer);
    nav.classList.remove("is-open", "is-closing");
  }

  function setMenuOpen(isOpen, { animate = true } = {}) {
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação");
    button.querySelector(".menu-toggle__label").textContent = isOpen ? "Fechar" : "Menu";

    if (isOpen) {
      finishClosing();
      nav.classList.add("is-open");
      return;
    }

    const shouldAnimate = animate
      && nav.classList.contains("is-open")
      && mobileMenuQuery.matches
      && !reducedMotionQuery.matches;

    if (!shouldAnimate) {
      finishClosing();
      return;
    }

    // Mantém o menu visível enquanto a animação de saída roda.
    nav.classList.add("is-closing");
    nav.addEventListener("animationend", function onEnd(event) {
      if (event.target !== nav) return;
      nav.removeEventListener("animationend", onEnd);
      if (nav.classList.contains("is-closing")) finishClosing();
    });
    closeTimer = window.setTimeout(finishClosing, 400);
  }
}
