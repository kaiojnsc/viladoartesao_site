# Cadastro de histórias

Adicione histórias em `data/historias.json`. A página `pages/historias.html` monta os cards automaticamente; não é necessário criar markup para cada nova história.

```json
{
  "id": "identificador-em-minusculas",
  "tema": "Tema editorial confirmado",
  "titulo": "Título aprovado, opcional",
  "artesao_nome": "Nome confirmado e autorizado, ou string vazia",
  "segmento": "Segmento confirmado",
  "chale": "Número confirmado, ou string vazia",
  "fotografia": "assets/img/foto-autorizada.webp",
  "fotografia_alt": "Descrição objetiva da fotografia",
  "resumo": "Resumo aprovado, ou string vazia",
  "trajetoria": "Relato aprovado pelo protagonista, ou string vazia",
  "status": "pendente",
  "agendamento_url": ""
}
```

Use um `id` único formado por letras minúsculas, números e hífens. Fotografia, identificação, biografia e número de chalé só devem ser preenchidos após confirmação e autorização. Sem associação confirmada ao perfil, o botão “Encontre este artesão” permanece indisponível. O agendamento só aparece quando houver chalé e destino confirmados.

Quando o relato estiver aprovado, defina `status` como `publicada` e preencha `trajetoria`. Os campos vazios devem permanecer vazios até a confirmação; não substitua por conteúdo fictício.
