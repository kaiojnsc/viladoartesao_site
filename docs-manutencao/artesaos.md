# Atualizar o catálogo de artesãos

`data/artesaos.json` é a fonte local do catálogo. O navegador não carrega
planilhas XLSX nem arquivos XML. A página inicia sem exibir a lista; os
cadastros completos aparecem apenas quando a pessoa visitante seleciona
**Fale com um dos nossos artesãos**.

## Atualizar registros

1. Edite o JSON atual somente com dados confirmados e autorizados para publicação.
   Não importe a planilha inteira nem presuma que seus registros continuam ativos.
2. Edite o registro correspondente ou acrescente um novo objeto ao array JSON,
   após confirmar com a equipe que o cadastro pode ser publicado.
3. Mantenha os campos e os tipos:

```json
{
  "id": 132,
  "nome": "Nome conforme autorizado",
  "telefone": "",
  "chale": "00",
  "segmento_original": "Descrição original da planilha",
  "categoria": "Couro",
  "contato_autorizado": false
}
```

- `id`: identificador numérico único; não reutilize IDs.
- `nome`, `telefone`, `chale` e `segmento_original`: dados da fonte, preservados como texto. Não complete valores vazios por suposição. Na base atual, os 130 telefones não vazios receberam `+5583` por autorização explícita; o único telefone vazio permanece sem link.
- `categoria`: uma das categorias de pesquisa existentes: `Couro`, `Madeira`, `Tecidos e bordados`, `Crochê e trabalhos manuais`, `Gastronomia`, `Bebidas e licores`, `Arte e decoração`, `Artesanato geral` ou `Não informado`.
- `contato_autorizado`: `true` apenas se houver autorização explícita de divulgação por WhatsApp; caso contrário, `false`.
- Para que um registro seja exibido e contado como completo, confirme nome, segmento original, categoria e número de chalé. Registros incompletos, inativos, sem autorização de publicação ou com duplicidade confirmada não entram na listagem pública.
- Se houver os campos opcionais `ativo`, `publicacao_autorizada` ou `duplicado_confirmado`, eles devem ser booleanos; `false` nos dois primeiros ou `true` no último exclui o registro da listagem.

4. Confirme com a equipe qualquer nome, número, chalé ou autorização duvidosa. Um chalé repetido não é, sozinho, evidência de duplicidade.
5. Salve como UTF-8 e valide a sintaxe JSON.
6. Em servidor local, abra `pages/artesaos.html`, confirme que a listagem começa fechada, clique para abrir e teste busca, segmentos, “Ver todos os artesãos” e “Limpar filtros”.

## Privacidade e WhatsApp

Os dados e destinos dos links são públicos porque o site é estático. Mantenha
no JSON apenas telefones autorizados para divulgação. Na base atual, o
responsável autorizou o prefixo `+5583` para todos os telefones não vazios;
essa autorização específica não deve ser presumida para novos registros. Um
botão de WhatsApp só é criado quando `contato_autorizado` é `true` e o número
resultante é válido em formato internacional E.164, começando por `+`. Não
complete registros sem telefone. O link inclui a mensagem institucional
definida no código, codificada para URL.

Não altere a categoria original da fonte: use `segmento_original` para
preservá-la e `categoria` para pesquisa. O catálogo identifica números de
chalés distintos apenas entre os registros completos; esse total não representa
todos os artesãos ou chalés existentes na Vila.
