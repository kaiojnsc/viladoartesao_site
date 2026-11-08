export function initNavigation() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");

  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      button.focus();
    }
  });

  function setMenuOpen(isOpen) {
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação");
    button.querySelector(".menu-toggle__label").textContent = isOpen ? "Fechar" : "Menu";
    nav.classList.toggle("is-open", isOpen);
  }
}
