# Estrutura do projeto

O site é estático: o navegador carrega documentos HTML, folhas CSS, módulos JavaScript e arquivos JSON. Não existe servidor próprio nem banco de dados. Como os módulos carregam JSON usando `fetch()`, teste em um servidor HTTP estático; abrir páginas por `file://` pode ser bloqueado pelo navegador.

```text
index.html                 Página inicial
pages/                     Páginas internas
assets/
  img/                     Fotografias autorizadas
  logos/                   Logos institucionais
  mascote/                 Arquivos da mascote
  mapa/                    Arquivo futuro do mapa
css/
  reset.css                Regras básicas
  variables.css            Cores, tipografia, medidas e sombras
  global.css               Estilos gerais
  components.css           Componentes compartilhados
  responsive.css           Layout adaptável
  accessibility.css        Movimento reduzido
  pages/                   Estilos específicos das páginas
js/
  main.js                  Inicialização
  components.js            Cabeçalho e rodapé compartilhados
  navigation.js            Menu responsivo
  artisans.js              Catálogo, busca e filtros
  events.js                Calendário
  stories.js               Histórias
  itineraries.js           Roteiros
  reviews.js               Vídeos e formulário externo
  map.js                   Componente reutilizável do mapa
  faq.js                   Perguntas frequentes
  booking.js               Formulário de interesse em visita
  contact.js               Canais de contato
data/                      Conteúdo editável em JSON
docs/                      Instruções para responsáveis pelo conteúdo
```

## Como manter

- Preserve os nomes dos arquivos e a estrutura JSON esperada pelos módulos JavaScript.
- Use caminhos relativos. Não comece caminhos locais com `/`, pois isso aponta para a raiz do domínio e quebra em páginas de projeto do GitHub Pages.
- Coloque fotografias autorizadas em `assets/img/` e escreva texto alternativo objetivo.
- Valide o JSON com um editor que destaque erros de sintaxe. Vírgulas finais não são permitidas em JSON.
- Após editar, carregue a página correspondente em servidor local e verifique o console do navegador.
- O cabeçalho e o rodapé são gerados por `js/components.js`; não replique sua marcação nas páginas.

Os registros e os números presentes nos arquivos estáticos são acessíveis publicamente. Não use esses arquivos para guardar segredos ou informações que não tenham autorização de divulgação.
