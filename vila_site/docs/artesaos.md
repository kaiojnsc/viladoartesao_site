# Atualizar o catálogo de artesãos

O catálogo público é carregado de `data/artesaos.json`. A página inicia sem exibir a lista; a relação aparece apenas quando a pessoa visitante seleciona **Fale com um dos nossos artesãos**.

## Atualizar registros

1. Trabalhe a partir da planilha oficial mais recente e validada pela equipe responsável.
2. Edite o registro correspondente ou acrescente um novo objeto ao array JSON.
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
- `nome`, `telefone`, `chale` e `segmento_original`: dados da fonte, preservados como texto. Não complete valores vazios por suposição.
- `categoria`: uma das categorias de pesquisa existentes: `Couro`, `Madeira`, `Tecidos e bordados`, `Crochê e trabalhos manuais`, `Gastronomia`, `Bebidas e licores`, `Arte e decoração`, `Artesanato geral` ou `Não informado`.
- `contato_autorizado`: `true` apenas se houver autorização explícita de divulgação por WhatsApp; caso contrário, `false`.

4. Confirme com a equipe qualquer nome, número, chalé ou autorização duvidosa. Um chalé repetido não é, sozinho, evidência de duplicidade.
5. Salve como UTF-8 e valide a sintaxe JSON.
6. Em servidor local, abra `pages/artesaos.html`, confirme que a listagem começa fechada, clique para abrir e teste busca, segmentos, “Ver todos os artesãos” e “Limpar filtros”.

## Privacidade e WhatsApp

Os números não aparecem como texto nos cartões, mas os dados e os destinos dos links ficam públicos porque o site é estático. Mantenha apenas contatos autorizados. Para registros com oito ou nove dígitos, o código atual aplica DDD 83 e código internacional +55 conforme autorização informada ao projeto. Números com formatos diferentes não recebem link automaticamente; confirme-os antes de ajustar o código.

Não altere a categoria original da planilha: use `segmento_original` para preservá-la e `categoria` para pesquisa.
