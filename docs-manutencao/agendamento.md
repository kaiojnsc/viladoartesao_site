# Solicitações de visita

O formulário da página `pages/agendamento.html` envia dados diretamente a um endpoint Formspree quando configurado. O site não inclui backend e não grava dados pessoais em `localStorage`, cookies próprios ou arquivos estáticos.

## Habilitar o envio

1. Crie um formulário no Formspree e valide o recebimento, as notificações, quem terá acesso às respostas, a retenção dos dados e as condições de uso aplicáveis.
2. Atualize `formspree_endpoint` em `data/agendamento-config.json` com o endpoint HTTPS público fornecido pelo Formspree, no formato `https://formspree.io/f/IDENTIFICADOR`. Esse endpoint é público por natureza; não use tokens privados neste arquivo.
3. Obtenha as informações institucionais pendentes listadas fora da pasta publicada e aprove o aviso definitivo antes de disponibilizá-lo no site.
4. Somente após essa revisão, altere `privacy_notice_approved` para `true`.
5. Teste o envio em hospedagem HTTPS, inclusive validação, entrega ao responsável e mensagem de confirmação.

Enquanto o endpoint estiver vazio ou o aviso de privacidade não estiver aprovado, os campos e o botão de envio permanecem desabilitados. A página não afirma que recebeu uma solicitação. Após uma resposta HTTP bem-sucedida do Formspree, informa que a solicitação foi recebida, mas que a visita só será confirmada após contato da equipe responsável.

## Campos e validação

Nome, e-mail, telefone com DDD informado pelo visitante, data desejada, quantidade, tipo de visita e concordância com o aviso são necessários para enviar. Observações são opcionais. O telefone deve conter 10 ou 11 dígitos, com DDD e sem código de país; nenhum DDD ou código é presumido. Não existe limite inventado para o tamanho do grupo. A data mínima é o dia corrente no fuso local do navegador.

O telefone recebe máscara visual brasileira para DDD e número nacional. Antes do envio, a máscara é removida; o serviço externo recebe apenas os dígitos informados pela pessoa visitante.

## Privacidade

O formulário solicita dados de contato e contexto para tratar a solicitação. No momento, o endpoint está vazio e o aviso não está aprovado, portanto os campos e o envio permanecem desabilitados e nenhum dado é transmitido. Antes de habilitar a coleta, confirme controlador, base legal, retenção, destinatários e canal para exercício de direitos.
