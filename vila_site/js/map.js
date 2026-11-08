const mapAssetRoot = new URL("../assets/mapa/", import.meta.url);
const supportedMapTypes = new Set(["image", "pdf", "svg", "interactive"]);

function renderMap(container) {
  const source = container.dataset.mapSrc?.trim();
  const type = container.dataset.mapType?.trim();
  if (!source && !type) return;

  if (!source || !supportedMapTypes.has(type)) {
    throw new Error("Informe um arquivo e um tipo válido para o componente mapa-container.");
  }

  if (
    source.startsWith("/")
    || source.includes("\\")
    || source.split("/").includes("..")
  ) {
    throw new Error("O arquivo do mapa deve estar em assets/mapa/.");
  }

  const resource = new URL(source, mapAssetRoot);
  if (
    resource.origin !== mapAssetRoot.origin
    || !resource.pathname.startsWith(mapAssetRoot.pathname)
    || resource.search
    || resource.hash
  ) {
    throw new Error("O arquivo do mapa deve ser um recurso local dentro de assets/mapa/.");
  }

  const title = container.dataset.mapAlt?.trim() || "Mapa da Vila do Artesão";
  let content;

  if (type === "image" || type === "svg") {
    if (!/\.(?:avif|gif|jpe?g|png|webp|svg)$/i.test(resource.pathname)) {
      throw new Error("O arquivo de imagem do mapa deve ser SVG ou uma imagem compatível.");
    }

    content = document.createElement("img");
    content.src = resource.href;
    content.alt = title;
    content.loading = "lazy";
  } else {
    const isPdf = type === "pdf";
    if (isPdf !== /\.pdf$/i.test(resource.pathname)) {
      throw new Error(
        isPdf
          ? "O arquivo do mapa em PDF deve ter a extensão .pdf."
          : "O mapa interativo deve ser um arquivo HTML dentro de assets/mapa/.",
      );
    }
    if (type === "interactive" && !/\.html?$/i.test(resource.pathname)) {
      throw new Error("O mapa interativo deve ser um arquivo HTML dentro de assets/mapa/.");
    }

    content = document.createElement("iframe");
    content.src = resource.href;
    content.title = title;
    content.loading = "lazy";
    if (type === "interactive") {
      content.setAttribute("sandbox", "allow-scripts");
    }
  }

  content.className = "mapa-container__content";
  container.replaceChildren(content);
  container.dataset.mapState = "loaded";
}

export function initMapContainers() {
  for (const container of document.querySelectorAll(".mapa-container")) {
    try {
      renderMap(container);
    } catch (error) {
      console.error("Não foi possível carregar o conteúdo do mapa.", error);
      container.dataset.mapState = "error";
      container.setAttribute("aria-label", "O conteúdo do mapa configurado não pôde ser carregado.");
    }
  }
}
