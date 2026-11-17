# Pendências de informações que foram removidas do site

Este documento reúne as informações que ainda faltam no site da Vila do Artesão. Até agora, elas apareciam no site como avisos internos visíveis ao público, por exemplo "as fotografias aguardam envio" ou "os dados serão incluídos após validação". Esses textos faziam sentido para a equipe do projeto, mas davam ao visitante a impressão de um site inacabado. Por isso, foram retirados das páginas (e das traduções em inglês e espanhol) e registrados aqui. Cada item abaixo diz onde o aviso estava, o que ele dizia e o que precisa ser providenciado para resolver a pendência. Quando a informação chegar, basta incluí-la no local indicado.

---

## 1. Fotografias dos espaços da Vila (home, topo da página)

- **Onde estava:** `vila_site/index.html`, legenda da ilustração do mascote Lino, na primeira seção da página inicial.
- **Texto removido:** "Ilustração oficial. As fotografias dos espaços aguardam envio."
- **Como ficou:** a legenda agora diz "Lino, o mascote da Vila do Artesão". O texto alternativo da imagem deixou de dizer "não é uma fotografia da Vila".
- **Pendência:** receber fotografias oficiais dos espaços da Vila (fachada, chalés, ambientes internos), com autorização de uso e crédito do fotógrafo.
- **Responsável sugerido:** administração da Vila / equipe de comunicação.

## 2. Cronologia e dados históricos institucionais (home, seção "Um lugar de encontros, saberes e criação")

- **Onde estava:** `vila_site/index.html`, segundo parágrafo da seção de introdução.
- **Texto removido:** "A cronologia e outros dados históricos institucionais serão incluídos após validação com a equipe responsável."
- **Como ficou:** o parágrafo termina em "...valorizar as pessoas que fazem parte da Vila."
- **Pendência:** levantar e validar com a equipe responsável a cronologia da Vila (marcos, gestões, reformas, eventos importantes) e outros dados institucionais. Depois de validados, podem entrar na página "Sobre a Vila".
- **Responsável sugerido:** administração da Vila / Agência Municipal de Desenvolvimento (AMDE).

## 3. Explicação do funcionamento dos segmentos (página Artesãos)

- **Onde estava:** `vila_site/pages/artesaos.html`, abaixo dos botões de segmento.
- **Textos removidos:**
  - "Os botões acima selecionam um segmento, mas não abrem a lista. Para ver os resultados, use 'Fale com um dos nossos artesãos'."
  - "Escolha um segmento para preparar sua pesquisa. A lista só aparece quando você abrir o catálogo."
  - O botão "Segmento não informado".
- **Como ficou:** um clique no segmento já abre o catálogo filtrado. Por isso o aviso deixou de ser necessário, e a descrição passou a ser "Toque em um segmento para ver quem trabalha com ele."
- **Pendência:** alguns artesãos estão cadastrados com a categoria "Não informado" em `vila_site/data/artesaos.json`. Eles continuam aparecendo em "Todos os segmentos", mas não podem ser encontrados por segmento. É preciso confirmar com cada um deles o segmento correto e atualizar o cadastro.
- **Responsável sugerido:** administração da Vila (recadastramento).
