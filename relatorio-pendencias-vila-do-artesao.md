# Verificação das pendências do site da Vila do Artesão

**Data da análise:** 16/11/2026
**Escopo:** conferir se as pendências do resumo expandido correspondem à versão atual do site. Nenhum arquivo do site foi alterado nesta etapa.

## Limitação principal: a segunda versão não pôde ser comparada

- A pasta `~/Downloads/viladoartesao_site-main(1)` está **vazia**.
- O `.zip` de mesmo nome tem 208 bytes e contém só uma pasta vazia, sem nenhum arquivo.
- Não foi localizada outra cópia. A busca ampla em Documents estourou o tempo, então só há certeza sobre o que existe em Downloads.
- Para comparar, é preciso reenviar o arquivo ou a pasta completa.

**Referência usada no lugar dela:** a versão atual (`minha-feature`, commit local `7383101`) é o `origin/main` de `kaiojnsc/viladoartesao_site` (`c073916`, 13/11/2026) mais as alterações locais de visual e animações. A única outra branch remota, `alteracao_imagens_walter`, é ancestral da `main`, ou seja, está contida nela. A conclusão sobre "mais recente" vem do histórico do Git, não da data dos arquivos. As conclusões abaixo valem para o repositório da `main`.

## Legenda das fontes de confirmação

- **[L]** leitura de código ou dados.
- **[X]** execução local: servidor em `localhost:8765` e páginas carregadas no navegador, sem enviar formulários nem abrir links de terceiros.
- **[P]** consulta ao que está publicado: API pública do GitHub e requisições HEAD.

Situações usadas: **resolvido**, **parcialmente resolvido**, **pendente** e **não verificável**.

## Tabela de pendências

| # | Item | Situação | Evidência | Arquivo / caminho | Ação necessária |
|---|---|---|---|---|---|
| 1a | Eventos | **Pendente** | Os 6 registros têm `nome`, `data`, `descricao`, `imagem` e `saiba_mais_url` vazios, com `status: a_definir`. Na tela aparecem 6 cards "Data a definir" e "Imagem a incluir". [L][X] | `data/eventos.json`, `js/events.js:33,112,119` | Equipe fornecer eventos confirmados, com data e descrição. |
| 1b | Histórias | **Parcialmente resolvido** | Os 3 registros têm um vídeo do Instagram vinculado, com nome e segmento. `trajetoria`, `tema` e `fotografia` estão vazios e o `status` é `em-preparacao`. A página renderiza 3 cards "Conteúdo pendente". [L][X] | `data/historias.json`, `js/stories.js:88-95` | Obter relatos e fotos aprovados. Confirmar a autorização de nome e vídeo. |
| 1c | Roteiros | **Pendente** | Os 4 registros têm descrição genérica. `duracao`, `pontos_visitacao`, `enderecos`, `horarios` e `coordenadas` estão vazios, e o `status` é `em_preparacao`. A página diz que são "sugestões em preparação". [L][X] | `data/roteiros.json`, `pages/roteiros.html:37` | Definir paradas e dados validados. |
| 1d | Outros textos provisórios | **Pendente** | Na home: "Perfil em preparação", "Aguardando cadastro autorizado", horários, estacionamento e acessibilidade "aguardam confirmação", tópicos editoriais "em preparação". No FAQ, 2 das 9 respostas são provisórias. [L] | `index.html:131-146,244-262`, `data/faq.json` | Preencher ou remover antes de publicar. |
| 2 | Mapa interno com localização dos chalés | **Pendente** | `data-map-src` e `data-map-type` estão vazios. A pasta `assets/mapa/` não existe. A página mostra "Mapa em preparação". O componente que carregaria o arquivo existe, mas nunca foi exercitado com um arquivo real. O link do Google Maps em `contato.json` mostra a Vila, não os chalés. [L][X] | `pages/mapa.html:46-62`, `js/map.js`, `docs/mapa.md` | Fornecer o mapa (SVG, PDF ou HTML) em `assets/mapa/` e testá-lo. |
| 3a | Agendamento | **Pendente** | `formspree_endpoint` está vazio e `privacy_notice_approved` é `false`. Execução local: fieldset e botão desabilitados, com aviso "ainda sendo configurado". O envio nunca foi testado. [L][X] | `data/agendamento-config.json`, `js/booking.js` | Criar o formulário no Formspree, definir o destinatário, aprovar o aviso de privacidade e testar em HTTPS. |
| 3b | Avaliações | **Parcialmente resolvido** | Há 2 vídeos do YouTube configurados, com títulos e descrições genéricos ("Vídeo 1 — Vila do Artesão"). Não foi verificado se os vídeos existem nem se são os corretos. `formulario_externo_url` está vazio, então os 9 campos ficam desabilitados como prévia. [L][X] | `data/avaliacoes.json`, `js/reviews.js` | Confirmar os vídeos e criar o Google Forms. |
| 3c | Formulário de contato | **Pendente** (não existe) | A página de contato só tem cartões de canais, sem formulário. O cartão de localização tem destino configurado. Os links de Instagram e Maps estão no código, mas não foi testado se abrem. [L][X] | `pages/contato.html`, `data/contato.json` | Decidir se um formulário é necessário. Se não for, ajustar a documentação e o resumo. |
| 3d | WhatsApp institucional | **Pendente** | `whatsapp_url` está vazio. Execução local: botão desabilitado e mensagem "pendente de confirmação". [L][X] | `data/contato.json`, `js/contact.js:97-121` | Equipe informar o número oficial. |
| 4 | Catálogo de artesãos | **Parcialmente resolvido** | 131 registros com 7 campos (`id`, `nome`, `telefone`, `chale`, `segmento_original`, `categoria`, `contato_autorizado`). Incompletos: id 52 sem telefone, chalé e segmento; ids 120 e 122 sem segmento. Há 3 registros "Não informado" e 12 "Artesanato geral". Duplicidades: nome idêntico nos ids 52 e 53; nome quase igual, mesmo telefone e chalé nos ids 31 e 32; telefones iguais entre ids 35/104 e 92/116, que parecem pessoas diferentes. A `docs/auditoria-artesaos.md` cita 38 grupos de chalé repetido; não foi recontado, mas as amostras são consistentes. Execução local: o catálogo fica oculto até o clique. Busca "maria" retorna 45, filtro "Couro" retorna 10 (bate com a auditoria), termo inexistente mostra estado vazio. Há 129 links `wa.me` e 2 cards "Contato não disponível". A busca só considera o nome. Os links `wa.me` não foram abertos, para não contatar terceiros. [L][X] | `data/artesaos.json`, `js/artisans.js`, `docs/auditoria-artesaos.md` | Equipe resolver os ids 31/32, 35/104, 92/116 e 52/53, completar os campos vazios e confirmar o DDD 83 aplicado a todos. |
| 5a | Autorização para divulgar contatos | **Não verificável** | `contato_autorizado: true` aparece nos 131 registros, mas é um campo gravado na importação. Nos arquivos não há termo, comprovante ou lista de consentimentos. A auditoria diz que "o usuário confirmou" o uso dos links, o que é declaração de alguém do projeto, não registro de autorização de cada artesão. O guia de entrega lista essa confirmação como item não marcado. [L] | `data/artesaos.json`, `docs/auditoria-artesaos.md`, guia de correções | Equipe anexar ou citar o registro de autorização, ou confirmar formalmente. Não concluir que houve ou não houve. |
| 5b | Planilha original exposta | **Pendente** (confirmado) | O `.xlsx` com 132 linhas de nomes e telefones está versionado em `vila_site/docs/` no repositório público, desde o commit `405b7b1`. O guia de entrega pede que a planilha fique fora da pasta pública. [L][P] | `vila_site/docs/RELAÇÃO DOS RECADASTRADOS…xlsx` | Decisão institucional de remover. Como já está no histórico do Git, avaliar a limpeza do histórico. |
| 5c | Aviso de privacidade | **Parcialmente resolvido** | A página existe, mas se declara "provisória". Cobre só o formulário de visita. Não identifica o responsável pelo tratamento nem a retenção, e não menciona a divulgação de telefones/WhatsApp dos artesãos, nem os embeds de YouTube e Instagram. O `artesaos.json` expõe telefones publicamente, como a própria auditoria reconhece. [L] | `pages/privacidade.html`, `docs/auditoria-artesaos.md` | Revisar o aviso para cobrir o que o site realmente faz. |
| 6a | Endereço público e hospedagem | **Pendente** | O repositório é público, mas `has_pages: false`, o endpoint `/pages` retorna 404, não há deployments, `CNAME` nem workflow. `homepage` está vazio. Não há URL oficial citada nos arquivos. O endereço derivado `kaiojnsc.github.io/viladoartesao_site/` retornou **404**. Isso indica que não está publicado nesse endereço, mas não exclui outro domínio não informado. [L][P] | repositório GitHub, `sitemap.xml` | Equipe informar a URL, se existir. Caso contrário, ativar o Pages. |
| 6b | Preparação para publicar | **Parcialmente resolvido** | Existe guia de publicação, `robots.txt` e caminhos relativos. Mas o site está na subpasta `vila_site/`, e o próprio guia diz que `index.html` precisa estar na raiz da `main`. Além disso, o `.nojekyll` citado no README não existe, `assets/img/` e `assets/mapa/` também não, e o `sitemap.xml` está sem URLs. O README interno ainda diz que não há `.git`, o que está desatualizado. [L] | `README.md`, `docs/publicacao-github-pages.md`, `docs/seo.md` | Mover o conteúdo para a raiz ou configurar o Pages a partir da pasta correta, e atualizar a documentação. |
| 7a | Orientações de atualização | **Parcialmente resolvido** | Há guias para artesãos, eventos, histórias, mapa, contato, agendamento, avaliações e publicação. Lacunas: `docs/README.md` não lista roteiros, FAQ nem SEO, e `docs/historias.md` não documenta o campo `instagram_reel_id`, usado nos dados atuais. [L] | `docs/*.md` | Completar os guias e o índice. |
| 7b | Responsáveis pela manutenção | **Pendente** | Nenhum arquivo nomeia responsável por conteúdo, contatos, agendamentos, repositório ou aprovação. A "matriz de responsabilidades" e o manual de manutenção aparecem só como tarefas não marcadas no guia de entrega, assim como "dois mantenedores com acesso". O histórico mostra vários autores de commits, o que não equivale a responsáveis institucionais. [L] | `docs/guia-correcoes-entrega-institucional-…md`, `git log` | Equipe nomear responsáveis. |
| 8a | Testes com usuários, métricas e efeitos na visitação/vendas | **Pendente** (sem evidências) | Não há relatório de teste com usuários nem pesquisa de satisfação. Nenhum script de analytics (nem Google, Plausible, Matomo etc.) no código. Não há dados de visitação ou de vendas. [L] | todo o repositório | Definir indicadores e coletar. Hoje só dá para dizer que nada foi medido. |
| 8b | Acessibilidade e testes técnicos | **Parcialmente resolvido** | Recursos implementados no código: link "pular para o conteúdo", `aria-live`, `aria-label`, texto alternativo e respeito a `prefers-reduced-motion`. O `docs/seo.md` diz que o Lighthouse não foi executado, e a menção a "avaliação responsiva manual" não tem registro. Não há suíte de testes nem validação automática. Nesta análise só foi feita verificação funcional em desktop. [L][X] | `docs/seo.md`, `js/`, `css/accessibility.css` | Rodar Lighthouse e uma checagem com leitor de tela, e registrar os resultados. |

## O que deve permanecer, sair ou ser confirmado

### Permanecem no resumo expandido

- Conteúdos de eventos, histórias e roteiros (1a, 1b, 1c, 1d).
- Mapa dos chalés (2).
- Agendamento, formulário de avaliações e WhatsApp institucional (3a, 3b, 3d).
- Higiene do catálogo: incompletos e duplicidades (4).
- Aviso de privacidade revisado (5c) e exposição da planilha original (5b).
- Publicação e estrutura do repositório (6a, 6b).
- Responsáveis pela manutenção (7b) e ausência de testes e métricas (8a, 8b).

### Podem sair, com ressalvas

- "Funcionamento de busca, filtros e links do catálogo": funciona localmente [X]. Fica só a validação com usuários reais, que já está em 8a.
- "Existência de guias de manutenção" (7a): existem, mas só podem sair se a lacuna do índice e do `instagram_reel_id` for fechada.
- A ideia de "formulário de contato", se a equipe confirmar que a página de canais é o desenho final (3c).

### Precisam de confirmação da equipe

- Autorização dos artesãos para divulgar telefones e para aparecerem nos vídeos do Instagram (5a). Está **não verificável**.
- URL pública oficial, se existir (6a).
- Número oficial do WhatsApp, destinatário do Formspree e URL do Google Forms (3a, 3b, 3d).
- DDD 83 para todos os contatos (4).
- Se os 2 vídeos do YouTube são os definitivos (3b).
- Qual é a segunda versão do site: o arquivo precisa ser reenviado.

## Parágrafo revisado sobre limitações

> O site é uma versão estática funcional, com catálogo de 131 artesãos, busca por nome, filtro por segmento e links individuais de WhatsApp, verificados em execução local. As seções de eventos, histórias e roteiros ainda não têm conteúdo definitivo: os eventos estão sem data e descrição, as histórias têm vídeos vinculados mas nenhum relato aprovado e os roteiros não trazem paradas nem horários validados. O mapa interno com a localização dos chalés ainda não foi entregue. Agendamento, formulário de avaliações e WhatsApp institucional estão implementados no código, porém desativados por falta de configuração e aprovação do aviso de privacidade, e nenhum deles foi testado em uso real. Os arquivos não permitem verificar a autorização dos artesãos para divulgar seus contatos, e a planilha original de recadastramento está versionada em repositório público. Não há evidência de publicação: o repositório não tem GitHub Pages ativo e não foi encontrada URL oficial. Também não há registro de testes com usuários, auditoria de acessibilidade, métricas de acesso nem avaliação dos efeitos na visitação ou nas vendas. Os responsáveis pela manutenção do conteúdo e do repositório ainda não foram definidos.

## Notas

- O guia `guia-correcoes-entrega-institucional-…md` contém prompts para uso no Copilot. Esse texto foi tratado como conteúdo do projeto e nada dele foi executado.
- Números de telefone não foram reproduzidos neste relatório. Os registros são citados por id.
- Nenhum arquivo do site foi alterado nesta etapa.
