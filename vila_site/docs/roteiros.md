# Cadastro de roteiros

Adicione sugestões em `data/roteiros.json`. A página `pages/roteiros.html` gera os cards a partir desse arquivo, sem exigir mudanças no módulo de exibição.

Cada registro deve incluir:

- `id`: identificador único em letras minúsculas, números e hífens.
- `titulo` e `descricao`: texto revisado e aprovado.
- `ilustracao`: um dos identificadores conceituais disponíveis (`vila`, `artesanato`, `cultura` ou `gastronomia`).
- `imagem` e `imagem_alt`: caminho de imagem autorizada em `assets/img/` e texto alternativo.
- `duracao`: deixe vazio enquanto não houver duração confirmada.
- `pontos_visitacao`, `enderecos`, `horarios` e `distancias`: listas; inclua somente informações validadas.
- `coordenadas`: lista de pontos com `latitude` e `longitude` em graus decimais, quando confirmados.
- `informacoes_turisticas`: informação confirmada ou texto vazio.
- `status`: situação editorial, por exemplo `em_preparacao` ou `publicado`.

Os cards usam ilustrações conceituais quando ainda não há fotografias. Elas não representam locais ou atividades reais. O botão de localização abre o mapa oficial da Vila; os botões de roteiros ainda não integram um mapa interativo. O link de planejamento direciona à página institucional de agendamento, sem pressupor disponibilidade ou confirmação de visita.

Não publique horários, durações, distâncias, endereços, paradas ou serviços sem validação. Para integração futura com mapas, associe as coordenadas confirmadas aos pontos de visitação correspondentes; não preencha coordenadas estimadas.
