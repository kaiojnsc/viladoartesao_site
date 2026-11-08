# Componente de mapa

A página `pages/mapa.html` contém o componente reutilizável `.mapa-container`. Sem configuração de arquivo, o componente mantém a mensagem provisória definida na própria página.

Para substituir o conteúdo, atualize os atributos no elemento:

- `data-map-src`: caminho relativo para um arquivo dentro de `assets/mapa/`.
- `data-map-type`: `image`, `svg`, `pdf` ou `interactive`.
- `data-map-alt`: descrição acessível do mapa ou título do documento incorporado.

Exemplos: `data-map-src="mapa-vila.svg"` com `data-map-type="svg"`; `data-map-src="mapa-vila.pdf"` com `data-map-type="pdf"`; `data-map-src="mapa-interativo.html"` com `data-map-type="interactive"`. Imagens aceitam SVG, AVIF, GIF, JPEG, PNG e WebP. Mapas interativos locais são carregados em um iframe com sandbox de scripts, sem acesso à geolocalização do visitante.

Mantenha os arquivos do mapa em `assets/mapa/`, valide-os e inclua texto alternativo ou título descritivo. O componente não implementa geolocalização nem inventaria localização de chalés. O botão para chegar à Vila usa o link oficial informado pela equipe.
