# Perguntas frequentes

As perguntas e respostas ficam em `data/faq.json`; a página `pages/faq.html` agrupa os registros por categoria e oferece busca instantânea.

Cada registro contém:

- `id`: identificador único em letras minúsculas, números e hífens.
- `pergunta`, `categoria` e `resposta`: textos exibidos no acordeão.
- `provisoria`: use `true` para marcar uma resposta que precisa de revisão da equipe responsável.
- `link`: opcional; informe um texto e uma URL HTTPS ou caminho para uma página interna.

Use respostas simples baseadas em informações confirmadas. Marque como provisórias respostas sobre agendamento, disponibilidade, atendimento e outras informações que ainda precisem de validação. Não publique horários, preços, serviços ou localização de chalés sem confirmação.

O acordeão usa elementos nativos `details` e `summary`, com suporte a teclado e tecnologia assistiva; a busca considera perguntas e respostas, sem exigir conexão ou serviço externo.
