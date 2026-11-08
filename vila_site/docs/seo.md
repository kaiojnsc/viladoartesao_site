# SEO e publicação

As páginas têm títulos e descrições individuais, metadados Open Graph básicos e usam `favicon.svg`. O site inclui `robots.txt` permitindo rastreamento.

O domínio canônico ainda não foi informado. Por isso, `sitemap.xml` está intencionalmente sem URLs: sitemaps exigem URLs absolutas, e inventar um domínio criaria um arquivo inválido para publicação. Assim que o endereço final for definido, adicione URLs absolutas de todas as páginas públicas e publique o sitemap na raiz do domínio. Opcionalmente, acrescente `Sitemap: https://DOMINIO-CONFIRMADO/sitemap.xml` em `robots.txt` e os metadados `og:image` com uma imagem pública e endereço absoluto.

As imagens disponíveis são mantidas nos formatos de origem; conversores WebP/AVIF não estão instalados neste ambiente. Elas já têm dimensões declaradas no HTML para reservar espaço durante o carregamento.

## Verificação Lighthouse

O Lighthouse não está instalado neste ambiente e não foi executado. Não há pontuações reportadas. Para avaliar o ambiente publicado, execute Lighthouse no Chrome para desktop e mobile e priorize os avisos de acessibilidade e performance; a avaliação responsiva manual realizada neste projeto não substitui essa auditoria.
