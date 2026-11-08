# Publicação no GitHub Pages

Este projeto não usa build: publique os arquivos existentes diretamente da branch `main`, na pasta raiz (`/(root)`).

## Preparar o repositório

1. Crie ou use um repositório GitHub para o projeto.
2. Envie todas as pastas e arquivos desta pasta do projeto, incluindo `index.html`, `pages/`, `assets/`, `css/`, `js/`, `data/` e `.nojekyll`.
3. Na branch principal, confirme que `index.html` está na raiz. A estrutura correta é `index.html` e `pages/`; não `vila_site/index.html` dentro de uma pasta adicional.
4. Faça commit e envie as alterações para `main`.

## Ativar a publicação

No repositório GitHub:

1. Acesse **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **Deploy from a branch**.
3. Em **Branch**, selecione `main` e `/ (root)`.
4. Clique em **Save**.
5. Aguarde o workflow automático do GitHub Pages concluir. O endereço publicado aparece na mesma tela.

Se `main` ou `/ (root)` não estiver disponível, confirme que a branch existe e que os arquivos já foram enviados. A configuração do painel não pode ser aplicada por arquivos locais; precisa ser salva no repositório do GitHub.

## Conferir a publicação

Abra o endereço de Pages informado pelo GitHub. Para um repositório de projeto, normalmente será parecido com `https://USUARIO.github.io/REPOSITORIO/`; não use esse exemplo como endereço real.

Confira pelo menos:

- página inicial em `/REPOSITORIO/` e `/REPOSITORIO/index.html`;
- páginas internas, por exemplo `/REPOSITORIO/pages/artesaos.html`;
- `data/artesaos.json`, `data/eventos.json`, `data/historias.json` e demais JSON;
- uma imagem em `assets/`, um CSS, um JavaScript e `favicon.svg`;
- menu, links do rodapé, busca e filtros de artesãos, mapa e links externos;
- console e aba Network do navegador, sem erros 404 nos recursos do próprio site.

Em GitHub Pages de projeto, caminhos locais iniciados por `/` apontam para a raiz do domínio e podem quebrar os recursos. Os arquivos atuais devem ser referenciados relativamente. Não remova o prefixo do repositório nem fixe o domínio dentro dos módulos.

Os formulários de agendamento/avaliação e o WhatsApp só funcionarão depois de configurados com os endereços oficiais. Valide-os também no endereço HTTPS publicado; não habilite configurações de teste.

## Atualizações

Para publicar conteúdo atualizado, faça commit e envie as alterações para `main`. O GitHub Pages publica novamente os arquivos. Aguarde o término da implantação e recarregue o site sem cache para verificar os JSON e recursos atualizados.

O `sitemap.xml` não deve receber domínio de exemplo. Preencha URLs absolutas apenas depois de confirmar o endereço final publicado; consulte [`seo.md`](seo.md).
