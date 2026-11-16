// Revela elementos com animação quando entram na tela.
// Sem JavaScript (ou sem IntersectionObserver) o conteúdo continua visível:
// o estado inicial escondido só existe quando <html> recebe .js-reveal.

const AUTO_TARGETS = [
  '.home-section .section-heading',
  '.home-introduction__text',
  '.segment-card',
  '.home-highlights article',
  '.gallery-slot',
  '.home-editorial > *',
  '.mascot-card',
  '.location-card',
  '.instagram-card',
  '.artisan-catalog-card',
  '.story-card',
  '.event-calendar-card',
].join(',');

const STAGGER_MS = 70;
const MAX_STAGGER = 6;

export function initReveal() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('js-reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  const register = (root) => {
    const nodes = root.matches?.(AUTO_TARGETS) ? [root] : [];
    nodes.push(...root.querySelectorAll(AUTO_TARGETS));

    nodes.forEach((node) => {
      if (node.hasAttribute('data-reveal-ready')) return;
      node.setAttribute('data-reveal-ready', '');
      if (!node.hasAttribute('data-reveal')) node.setAttribute('data-reveal', '');

      // Atraso escalonado entre irmãos do mesmo tipo (cards de uma grade).
      const siblings = node.parentElement
        ? [...node.parentElement.children].filter((el) => el.matches(AUTO_TARGETS))
        : [];
      const index = Math.max(0, siblings.indexOf(node));
      node.style.setProperty('--reveal-delay', `${Math.min(index, MAX_STAGGER) * STAGGER_MS}ms`);

      observer.observe(node);
    });
  };

  const main = document.querySelector('main') || document.body;
  register(main);

  // Cards criados depois pelo JS (artesãos, histórias, eventos).
  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((added) => {
        if (added.nodeType === 1) register(added);
      });
    });
  }).observe(main, { childList: true, subtree: true });
}
