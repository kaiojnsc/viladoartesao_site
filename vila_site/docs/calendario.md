# Cadastro da programação

Adicione ou atualize registros em `data/eventos.json`. A página `pages/calendario.html` monta os cards, filtros de categoria e navegação mensal automaticamente.

```json
{
  "id": "identificador-unico",
  "nome": "Nome confirmado do evento",
  "data": "AAAA-MM-DD",
  "descricao": "Descrição aprovada",
  "imagem": "assets/img/foto-autorizada.webp",
  "imagem_alt": "Descrição objetiva da imagem",
  "categoria": "Feiras e exposições",
  "informacoes_adicionais": "Informação confirmada",
  "saiba_mais_url": "",
  "status": "confirmado"
}
```

Categorias previstas: São João, Natal, Dia do Artesão, Datas comemorativas, Feiras e exposições e Eventos especiais. Para uma pauta ainda sem confirmação, mantenha nome, data, descrição, imagem, informações adicionais e link vazios, e use `status: "a_definir"`. O card exibirá “Data a definir” e identificará o conteúdo como pendente.

Use data válida em formato ISO `AAAA-MM-DD` e publique somente após confirmação. Imagens devem estar em `assets/img/`; links “Saiba mais” só devem ser preenchidos quando houver destino confirmado. A navegação mensal exibe apenas eventos confirmados naquela data; pautas pendentes são mostradas sem associação a mês no modo “Todas as datas”.
