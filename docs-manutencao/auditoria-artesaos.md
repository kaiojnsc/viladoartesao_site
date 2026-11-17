# Revisão do catálogo de artesãos

`data/artesaos.json` é a fonte local utilizada pelo site. A planilha de
recadastramento foi uma fonte histórica de conferência; o navegador não carrega
XLSX ou XML, e atualizações não devem importar a planilha inteira.

## Critérios e indicadores

- O arquivo contém 131 registros e IDs únicos.
- Para a listagem e os indicadores, são exigidos nome, segmento original,
  categoria reconhecida e número de chalé numérico identificado. Registros
  incompletos, inativos, sem autorização de publicação e duplicidades
  confirmadas são excluídos.
- Com esses critérios, 128 registros completos e 74 números distintos de
  chalés são identificados no arquivo atual. Esses valores descrevem apenas a
  listagem completa do catálogo e não representam todos os artesãos ou chalés
  existentes na Vila.
- O arquivo atual não possui campo de situação de atividade ou autorização de
  publicação. O JSON deve continuar sendo mantido como a relação pública
  revisada; confirme a situação com a equipe antes de adicionar registros. Os
  campos booleanos opcionais `ativo`, `publicacao_autorizada` e
  `duplicado_confirmado` são respeitados pelo catálogo quando presentes.
- Há três registros sem segmento original e um registro sem número de chalé;
  um deles está nos dois grupos. Eles permanecem preservados no JSON, mas não
  aparecem como cadastros completos na listagem nem nos indicadores.
- Não há duplicidades confirmadas por ID. Pares de nomes semelhantes e
  telefones ou chalés compartilhados continuam sem fusão até confirmação
  administrativa; um chalé compartilhado, por si só, não prova duplicidade.

## Contatos

O responsável autorizou adicionar `+5583` aos 130 telefones não vazios da base
atual: 128 registros com 9 dígitos, um com 8 e um com 11. O único telefone
vazio permaneceu sem alteração. Após a normalização, os 128 registros completos
exibidos no catálogo têm telefone autorizado e link válido de WhatsApp; esse
indicador descreve apenas os contatos disponíveis no catálogo, não todos os
artesãos da Vila. A autorização do prefixo vale para esta base atual e não deve
ser presumida para novos registros.

Quando houver um contato válido e autorizado, o link deve usar a mensagem
institucional definida em `js/artisans.js`, codificada para URL, e abrir em
nova aba com `rel="noopener noreferrer"`. Relatórios e documentação não devem
expor números pessoais.
