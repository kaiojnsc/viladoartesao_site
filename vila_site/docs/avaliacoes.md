# Vídeos e avaliações

## Vídeos

Edite os dois registros em `data/avaliacoes.json`. `id` deve ser o identificador de 11 caracteres do vídeo no YouTube; `titulo` e `descricao` aparecem no card e o título também identifica o player para tecnologias assistivas. Os embeds usam `youtube-nocookie.com` e carregamento adiado.

## Formulário externo

O site é estático e não recebe nem armazena avaliações. Para ativar o recebimento:

1. Crie um formulário no serviço aprovado pela equipe e configure nome opcional, avaliação de 1 a 5 estrelas, comentário e data opcional da visita.
2. No Google Forms, personalize também a mensagem de confirmação após o envio.
3. Atualize `formulario_externo_url` em `data/avaliacoes.json` com o link HTTPS público de resposta, no formato `https://docs.google.com/forms/d/e/ID/viewform`.
4. Verifique a permissão pública de respostas, o formulário incorporado e o link de abertura em outra aba.

Somente URLs de resposta do Google Forms são aceitos pelo módulo. Sem URL configurado, os campos aparecem desabilitados e identificados como prévia: não podem ser enviados. Quando o URL estiver presente, o formulário real será incorporado e a mensagem de confirmação será a configurada no próprio Google Forms. O site não apresenta confirmação fictícia nem armazena respostas.

## Avaliações publicadas

Publique somente avaliações reais e autorizadas. Não reproduza respostas coletadas pelo formulário sem consentimento explícito para divulgação. O estado inicial da página informa que ainda não há relatos autorizados para publicação.
