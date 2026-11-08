# Auditoria da planilha de recadastramento

Fonte analisada: `RELAÇÃO DOS RECADASTRADOS VILA DO ARFTESÃO-1.xlsx`.

## Importação e categorias

- 131 registros foram importados, sem excluir ou mesclar linhas.
- Nome, telefone, chalé e segmento original foram preservados como texto no JSON.
- Cada registro recebeu um identificador sequencial interno e uma categoria de pesquisa.
- As 58 descrições de segmento não vazias foram agrupadas em nove categorias: Couro (10), Madeira (8), Tecidos e bordados (51), Crochê e trabalhos manuais (20), Gastronomia (9), Bebidas e licores (2), Arte e decoração (16), Artesanato geral (12) e Não informado (3).
- As descrições originais, inclusive grafia e campos vazios, permanecem em `segmento_original`.

## Verificações

- Um par tem o mesmo nome exato, mas telefones e chalés diferentes. Ambos foram mantidos.
- Um par de nomes é semelhante e compartilha telefone e chalé. É uma possível duplicidade para confirmação manual; ambos foram mantidos.
- Três grupos de telefone compartilhado, envolvendo seis registros; foram mantidos como entradas independentes.
- Há 38 grupos com chalé repetido. Chalé compartilhado não foi tratado como duplicidade.
- Três segmentos e um chalé estão vazios; os campos foram preservados sem completar por suposição.
- Os telefones têm 128 entradas com nove dígitos, uma com oito, uma com onze e uma vazia. Foram gerados 129 links WhatsApp: os 128 contatos com nove dígitos e o contato com oito dígitos usam o DDD 83 e o código +55 informados. O contato de onze dígitos não começa com 83 e não recebe link até que o número seja confirmado. Os campos originais continuam preservados.

## Privacidade e contatos

Os números não são exibidos como texto nos cards. O usuário confirmou o uso de links individuais do WhatsApp e a aplicação de DDD 83 e código internacional +55. Como a hospedagem é estática, os telefones preservados em `data/artesaos.json` e os destinos dos links podem ser consultados publicamente no código-fonte e na URL; não há proteção de segredo no navegador.
