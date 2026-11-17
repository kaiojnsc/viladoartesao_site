// Fotos com carregamento preguiçoso aparecem com fade quando terminam de carregar,
// em vez de "pularem" na tela. Imagens já carregadas não são afetadas.
// Sem JavaScript ou com movimento reduzido, nada muda (estilos em css/animations.css).

const SELECTOR = 'main img[loading="lazy"]';

function prepare(image) {
  if (image.hasAttribute("data-fade")) return;
  image.setAttribute("data-fade", "");
  if (image.complete && image.naturalWidth > 0) return;

  image.classList.add("is-loading");
  const done = () => image.classList.remove("is-loading");
  image.addEventListener("load", done, { once: true });
  image.addEventListener("error", done, { once: true });
}

export function initImageFade() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const main = document.querySelector("main");
  if (!main) return;

  main.querySelectorAll(SELECTOR).forEach(prepare);

  // Imagens criadas depois pelo JavaScript (catálogo, mídia, vídeos).
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const added of mutation.addedNodes) {
        if (added.nodeType !== Node.ELEMENT_NODE) continue;
        if (added.matches('img[loading="lazy"]')) prepare(added);
        added.querySelectorAll?.('img[loading="lazy"]').forEach(prepare);
      }
    }
  }).observe(main, { childList: true, subtree: true });
}
