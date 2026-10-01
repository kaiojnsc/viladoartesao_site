# Site Institucional — Vila do Artesão

Site institucional desenvolvido como projeto de extensão universitária, em parceria com a Vila do Artesão e a Casa do Empreendedor, com o objetivo de ampliar a visitação da Vila ao longo do ano e apoiar a divulgação dos artesãos.

## Sobre o projeto

Versão inicial do site, com interface amistosa, elementos visuais característicos da Vila (tons terrosos, identidade regional) e possibilidade de mascote como referência simbólica do espaço. Estruturado para ser simples, visualmente atrativo, barato de manter e sustentável após o fim do semestre letivo.

## Identidade visual — paleta de tons terrosos

Paleta sugerida, inspirada em barro, palha, couro e algodão cru. Usar uma cor de base clara para fundo, uma ou duas cores quentes como destaque (botões, títulos) e uma cor escura para texto/contraste:

Fundo / base clara — Areia / palha clara — 
#F2E8D9
Destaque principal — Terracota — 
#C96F4A
Destaque secundário — Marrom couro — 
#8A5A3B
Contraste / texto — Marrom escuro — 
#3E2A20
Acento (detalhes, ícones) — Mostarda / algodão tingido — 
#D9A441
Verde de apoio (natureza/cangaço) — Verde oliva suave — 
#6B7A4F

Evitar tons frios (azul, cinza puro) como cor dominante — usar no máximo como neutro de apoio, nunca como protagonista, para manter a sensação de artesanato/rústico.

## Mecanismos de UX (experiência do usuário)

- **Navegação simples e direta**: menu fixo com no máximo 6–7 itens (Início, Artesãos, Histórias, Roteiros, Calendário, FAQ, Agendar Visita), sem submenus profundos — o público inclui visitantes com baixa familiaridade digital.
- **Hierarquia visual clara**: textos grandes e legíveis, bom contraste entre texto e fundo (especialmente importante para visitantes idosos), botões de ação (CTA) bem destacados, como "Agendar visita" e "Ver no mapa".
- **Mobile-first**: a maioria dos visitantes vai acessar pelo celular antes ou durante a visita — priorizar carregamento rápido, imagens otimizadas e botões grandes o suficiente para toque.
- **Microinterações leves**: pequenas animações de hover/clique (sem exagero) para dar sensação de site "vivo", sem comprometer performance.
- **Call-to-action contextual**: ao final de cada história de artesão, um botão direto para "Ver no mapa" ou "Agendar visita a este chalé" — reduz fricção entre descobrir e agir.
- **Feedback visual em formulários**: confirmação clara após envio do formulário de agendamento ou avaliação (mensagem de sucesso, não só redirecionamento silencioso).
- **Acessibilidade básica**: textos alternativos em imagens, tamanho de fonte ajustável, ícones acompanhados de texto (não só símbolo) — coerente com o público de baixa alfabetização mencionado no diagnóstico original do projeto.
- **Consistência visual**: mascote e paleta de cores repetidos em todas as páginas, para reforçar identidade e facilitar orientação do usuário dentro do site.

## Estrutura de páginas (planejada)

- `index` — Página inicial / apresentação + mascote
- `sobre` — Sobre a Vila e a parceria institucional
- `artesaos` — Mapeamento dos chalés por segmento (gastronomia, roupas e acessórios, madeira, históricos, algodão, couro)
- `historias` — Experiências individuais dos artesãos (pilão, couro, licor, peças do cangaço novo etc.)
- `calendario` — Datas promocionais (São João, Natal, Dia do Artesão)
- `roteiros` — Rotas turísticas e passeios locais
- `avaliacoes` — Espaço de avaliação de visitantes
- `mapa` — Mapa interativo da Vila
- `faq` — Perguntas frequentes
- `agendamento` — Formulário para agendar visitas
- `contato` — Contato e localização

## Stack sugerida (baixo custo)

- Site estático (HTML/CSS/JS ou gerador simples como Astro/Eleventy)
- Hospedagem: GitHub Pages, Netlify ou Vercel (gratuito)
- Formulários (avaliação, agendamento): Formspree, Google Forms embutido ou Netlify Forms (sem backend próprio)
- Mapa: Google Maps / OpenStreetMap incorporado via iframe

## Organização do repositório

```
vila-do-artesao-site/
├── README.md
├── index.html
├── /assets
│   ├── /img          # fotos dos artesãos e da Vila
│   └── /mascote       # artes do mascote
├── /pages             # páginas internas (sobre, artesaos, faq...)
├── /css
├── /js
└── /docs              # resumos expandidos, relatórios do projeto
```

## Próximos passos

- Validar identidade visual e mascote com o demandante
- Coletar fotos e textos reais dos artesãos por segmento
- Aplicar a paleta de tons terrosos definida
- Montar formulário de agendamento e espaço de avaliações
