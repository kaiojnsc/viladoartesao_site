# Programação de visitas

Adicione ou atualize registros em `data/eventos.json`. A página `pages/visite.html` mostra somente eventos confirmados ou publicados com título (`nome`), data válida (`AAAA-MM-DD`) e descrição preenchida. Os próximos eventos aparecem primeiro; eventos passados, se houver, vêm depois.

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

Use `status: "confirmado"` ou `status: "publicado"` somente depois da confirmação. Registros com `status: "a_definir"`, campos obrigatórios vazios, datas inválidas ou textos provisórios não aparecem na página. Se nenhum evento atender aos critérios, a página orienta o visitante a consultar o Instagram oficial; não exibe meses vazios nem conteúdos genéricos.

Categorias, imagens, informações adicionais e links são opcionais para a exibição básica. Preencha links externos somente com destinos HTTPS confirmados. As antigas páginas `pages/calendario.html` e `pages/contato.html` redirecionam para `pages/visite.html`.

Para disponibilizar os títulos e as descrições em inglês e espanhol, inclua cada texto aprovado nos dicionários correspondentes em `js/i18n/static-catalog.js`. O módulo registra traduções ausentes durante a navegação.
