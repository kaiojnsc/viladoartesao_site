# Vila do Artesão

Site institucional estático da Vila do Artesão, em Campina Grande, Paraíba. Feito com HTML, CSS, JavaScript ES modules e arquivos JSON. Não exige backend, etapa de build, dependências pagas ou instalação de pacotes.

## Começar a usar

1. Baixe ou clone o repositório.
2. Para visualizar, abra `index.html` em um navegador. Para testar os módulos JavaScript e os arquivos JSON localmente, use um servidor estático, pois alguns navegadores bloqueiam `fetch()` quando a página é aberta como `file://`.
3. Faça as alterações nos arquivos indicados neste README e nos guias em `docs/`.
4. Antes de publicar, confira as páginas e os dados em um servidor local e revise o checklist de [`docs/publicacao-github-pages.md`](docs/publicacao-github-pages.md).

O site não tem etapa de compilação. O arquivo `index.html` na raiz é a página inicial. Recursos compartilhados, páginas e conteúdo JSON usam caminhos relativos ao projeto, para funcionar tanto em um domínio próprio quanto em endereços de projeto do GitHub Pages (`usuario.github.io/nome-do-repositorio/`).

## Estrutura do projeto

| Caminho | Responsabilidade |
|---|---|
| `index.html` | Página inicial e ponto de entrada do site. |
| `pages/` | Páginas institucionais: sobre, artesãos, histórias, calendário, roteiros, avaliações, mapa, FAQ, agendamento, contato e privacidade. |
| `assets/img/` | Fotografias autorizadas e imagens de conteúdo. |
| `assets/logos/` | Logos da Vila do Artesão e da UNIFACISA. |
| `assets/mascote/` | Arquivos da mascote. |
| `assets/mapa/` | Arquivo do mapa a ser fornecido para substituir o espaço provisório. |
| `css/` | Reset, variáveis visuais, estilos globais, componentes, responsividade e estilos por página. |
| `js/` | Inicialização do site, cabeçalho/rodapé compartilhados e módulos interativos. |
| `data/` | Conteúdos JSON carregados no navegador; não é banco de dados. |
| `docs/` | Guias de manutenção, conteúdo, formulários e publicação. |
| `favicon.svg`, `robots.txt`, `sitemap.xml`, `.nojekyll` | Arquivos auxiliares de publicação e SEO. |

Mais detalhes: [`docs/estrutura.md`](docs/estrutura.md).

## Atualizar conteúdo

- **Artesãos:** altere `data/artesaos.json`, preservando cada registro e os campos de origem. Consulte [`docs/artesaos.md`](docs/artesaos.md).
- **Eventos:** altere `data/eventos.json`; só use datas e informações confirmadas. Consulte [`docs/calendario.md`](docs/calendario.md).
- **Histórias:** inclua registros em `data/historias.json`, com relatos e imagens autorizados. Consulte [`docs/historias.md`](docs/historias.md).
- **Página inicial:** os segmentos exibidos seguem as categorias do recadastramento disponibilizado ao projeto. Perfis, galeria, conteúdos editoriais e depoimentos permanecem como espaços de preparação até que existam dados, fotografias e autorizações confirmados.
- **Mapa:** coloque o arquivo em `assets/mapa/` e atualize os atributos do componente em `pages/mapa.html`. Consulte [`docs/mapa.md`](docs/mapa.md).
- **Telefone/WhatsApp oficial:** atualize `data/contato.json` somente após confirmação. Consulte [`docs/contato.md`](docs/contato.md).
- **Agendamento:** configure o endpoint e a aprovação do aviso antes de ativar o envio. Consulte [`docs/agendamento.md`](docs/agendamento.md).
- **Avaliações:** o recebimento depende de um formulário externo aprovado. Consulte [`docs/avaliacoes.md`](docs/avaliacoes.md).

Não publique dados de contato, imagens, biografias, eventos, horários ou serviços sem autorização ou confirmação. O site é público: arquivos em `data/` podem ser baixados por qualquer pessoa.

## Publicar no GitHub Pages

1. Envie o projeto para um repositório GitHub e confirme que a branch principal se chama `main`.
2. Confirme que `index.html` está na raiz do repositório, e não dentro de uma subpasta.
3. No GitHub, abra **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Selecione a branch **main** e a pasta **/(root)**; clique em **Save**.
6. Aguarde a conclusão da publicação e abra o endereço mostrado na seção Pages.
7. Teste o endereço inicial e as páginas internas, além dos JSON, imagens, CSS e JavaScript. O endereço de projeto normalmente inclui o nome do repositório no caminho.

Não é necessário definir comando de build nem pasta de saída. O arquivo `.nojekyll` solicita que o GitHub Pages publique os arquivos sem processamento Jekyll. Veja o checklist completo em [`docs/publicacao-github-pages.md`](docs/publicacao-github-pages.md).

**Limitação deste ambiente:** a pasta de trabalho atual não contém diretório `.git` nem conexão com um repositório remoto. Assim, a seleção da branch `main` e da pasta `/(root)` deve ser feita depois que o projeto estiver enviado ao GitHub.

## Formulários e serviços externos

O projeto não coleta respostas sem integração configurada. O formulário de visita começa desabilitado até que exista um endpoint válido e o aviso de privacidade tenha sido aprovado. O formulário de avaliações também permanece em prévia até que um Google Forms público seja configurado. WhatsApp permanece inativo sem o contato oficial.

Não inclua chaves privadas, tokens, credenciais ou dados pessoais não autorizados em arquivos do site. Configurações que ficam em JSON ou JavaScript são públicas.

## Verificação antes de publicar

- Abra a página inicial e todas as páginas pelo site publicado.
- Teste o menu, os botões, filtros, busca e links do catálogo.
- Confirme que os artesãos só aparecem após o botão de abertura.
- Verifique imagens e JSON na aba Network do navegador.
- Confira Instagram, Google Maps e vídeos.
- Teste formulários apenas depois de configurá-los e revise os textos de sucesso/erro.
- Teste em celular e desktop; navegue também com teclado.
- Confira o guia [`docs/publicacao-github-pages.md`](docs/publicacao-github-pages.md).
