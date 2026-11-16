// Revela elementos com animação quando eles entram na tela.
// Sem JavaScript, sem IntersectionObserver ou com movimento reduzido,
// o conteúdo continua visível: o estado escondido só existe quando
// <html> recebe a classe .js-reveal (estilos em css/animations.css).

const AUTO_TARGETS = [
  // Página inicial
  ".home-section .section-heading",
  ".home-introduction__text",
  ".segment-card",
  ".home-about-highlight",
  ".about-gallery__carousel",
  ".mascot-card",
  ".location-card",
  ".instagram-card",
  // Sobre
  ".about-page h2",
  // Artesãos
  ".artisan-segment",
  // Visite e orientações
  ".visit-card",
  ".visit-event-card",
  // Na mídia e vídeos
  ".media-section",
  ".media-card",
  ".media-reel",
  ".review-video-card",
  // Perguntas frequentes e agendamento
  ".faq-category",
  ".booking-form-card",
].join(",");

const STAGGER_MS = 70;
const MAX_STAGGER = 6;

export function initReveal() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  const main = document.querySelector("main");
  if (!main) return;

  document.documentElement.classList.add("js-reveal");

  const finish = (node) => {
    node.classList.add("is-revealed");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const node = entry.target;
        node.classList.add("is-visible");
        observer.unobserve(node);

        // Ao fim da entrada, devolve ao elemento as transições próprias.
        const delay = parseFloat(node.style.getPropertyValue("--reveal-delay")) || 0;
        const onEnd = (event) => {
          if (event.target !== node || event.propertyName !== "transform") return;
          node.removeEventListener("transitionend", onEnd);
          finish(node);
        };
        node.addEventListener("transitionend", onEnd);
        window.setTimeout(() => finish(node), delay + 800);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

  const register = (root) => {
    const nodes = root.matches?.(AUTO_TARGETS) ? [root] : [];
    nodes.push(...root.querySelectorAll(AUTO_TARGETS));

    for (const node of nodes) {
      if (node.hasAttribute("data-reveal")) continue;
      node.setAttribute("data-reveal", "");

      // Atraso escalonado entre irmãos (cards de uma mesma grade).
      const siblings = node.parentElement
        ? [...node.parentElement.children].filter((element) => element.matches(AUTO_TARGETS))
        : [];
      const index = Math.max(0, siblings.indexOf(node));
      node.style.setProperty("--reveal-delay", `${Math.min(index, MAX_STAGGER) * STAGGER_MS}ms`);

      observer.observe(node);
    }
  };

  register(main);

  // Elementos criados depois pelo JavaScript (catálogo, mídia, FAQ, eventos).
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const added of mutation.addedNodes) {
        if (added.nodeType === Node.ELEMENT_NODE) register(added);
      }
    }
  }).observe(main, { childList: true, subtree: true });
}
