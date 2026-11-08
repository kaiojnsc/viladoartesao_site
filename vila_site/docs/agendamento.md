# Solicitações de visita

O formulário da página `pages/agendamento.html` envia dados diretamente a um endpoint Formspree quando configurado. O site não inclui backend e não grava dados pessoais em `localStorage`, cookies próprios ou arquivos estáticos.

## Habilitar o envio

1. Crie um formulário no Formspree e valide o recebimento, as notificações, quem terá acesso às respostas, a retenção dos dados e as condições de uso aplicáveis.
2. Atualize `formspree_endpoint` em `data/agendamento-config.json` com o endpoint HTTPS público fornecido pelo Formspree, no formato `https://formspree.io/f/IDENTIFICADOR`. Esse endpoint é público por natureza; não use tokens privados neste arquivo.
3. Revise e publique o aviso de privacidade em `pages/privacidade.html` com a identificação e o contato da pessoa/instituição responsável, a base legal aplicável e os prazos e meios de exercício dos direitos.
4. Somente após essa revisão, altere `privacy_notice_approved` para `true`.
5. Teste o envio em hospedagem HTTPS, inclusive validação, entrega ao responsável e mensagem de confirmação.

Enquanto o endpoint estiver vazio ou o aviso de privacidade não estiver aprovado, os campos e o botão de envio permanecem desabilitados. A página não afirma que recebeu uma solicitação. Após uma resposta HTTP bem-sucedida do Formspree, informa que a solicitação foi recebida, mas que a visita só será confirmada após contato da equipe responsável.

## Campos e validação

Nome, e-mail, telefone com DDD informado pelo visitante, data desejada, quantidade, tipo de visita e concordância com o aviso são necessários para enviar. Observações são opcionais. O telefone deve conter 10 ou 11 dígitos, com DDD e sem código de país; nenhum DDD ou código é presumido. Não existe limite inventado para o tamanho do grupo. A data mínima é o dia corrente no fuso local do navegador.

O telefone recebe máscara visual brasileira para DDD e número nacional. Antes do envio, a máscara é removida; o serviço externo recebe apenas os dígitos informados pela pessoa visitante.

## Privacidade

O formulário solicita apenas dados de contato e contexto necessários para tratar a solicitação. As respostas serão encaminhadas ao serviço externo e à equipe responsável. O site estático não mantém cópia dos campos no navegador ou em arquivo. A revisão do aviso ainda deve confirmar controlador, base legal, retenção, destinatários e canal de direitos antes de qualquer coleta estar habilitada.
