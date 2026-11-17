# Vila do Artesão — site institucional

Site estático do projeto de extensão universitária da UNIFACISA, em parceria com a Vila do Artesão e a Casa do Empreendedor.

## Conteúdo publicado

- `vila_site\index.html` — apresentação, catálogo, galeria e informações para a visita.
- `vila_site\pages\sobre.html` — história institucional e fontes.
- `vila_site\pages\artesaos.html` — catálogo público de artesãos.
- `vila_site\pages\visite.html` — horário, localização, programação confirmada e canais oficiais.
- `vila_site\pages\mapa.html` — endereço e link para a localização geral da Vila.
- `vila_site\pages\roteiros.html` — orientações para consultar o catálogo, chegar à Vila e acompanhar o Instagram.
- `vila_site\pages\avaliacoes.html` — vídeos públicos da Vila.
- `vila_site\pages\faq.html` e `vila_site\pages\midia.html` — perguntas frequentes e publicações.

As páginas antigas de calendário e contato redirecionam para `vila_site\pages\visite.html`. A página de agendamento oferece orientações e não coleta dados pessoais. Eventos só são exibidos quando têm título, descrição, data válida e status publicado ou confirmado.

## Manutenção

- O horário e o endereço ficam centralizados em `vila_site\js\site-config.js`.
- O catálogo público fica em `vila_site\data\artesaos.json`.
- A programação fica em `vila_site\data\eventos.json`.
- Os links oficiais de localização e Instagram são usados diretamente na interface.
- Guias de manutenção foram retirados da pasta publicada e preservados em `docs-manutencao\`.
- A planilha de recadastramento ainda requer transferência para armazenamento institucional restrito antes de ser removida da pasta publicada.

Sirva `vila_site\` com um servidor estático local para validar módulos JavaScript, traduções e arquivos JSON.
