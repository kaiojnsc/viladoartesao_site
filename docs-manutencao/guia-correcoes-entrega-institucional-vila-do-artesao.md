# Guia de Correções e Entrega Institucional --- Vila do Artesão

**Documento de continuidade do projeto**\
**Projeto:** Site institucional da Vila do Artesão --- Campina
Grande/PB\
**Tecnologia:** HTML5, CSS3, JavaScript ES6+ e JSON

## 1. Finalidade

Este documento reúne os prompts finais para corrigir, validar e preparar
o site Vila do Artesão para publicação e manutenção institucional. Foi
organizado para que outra pessoa consiga dar continuidade ao
desenvolvimento.

A auditoria arquitetural concluiu que a solução está adequada como site
institucional estático. Não é necessário reconstruir o projeto nem
adicionar backend, banco de dados ou frameworks para atender ao escopo
atual.

Os principais cuidados são:

1.  Evitar a exposição pública da planilha original de recadastramento.
2.  Confirmar autorização para divulgar telefones e contatos dos
    artesãos.
3.  Não ativar formulários que coletem dados pessoais antes da definição
    institucional sobre privacidade.
4.  Garantir que o repositório e a manutenção não dependam
    exclusivamente de um estudante.
5.  Criar verificações simples para reduzir erros antes de cada
    publicação.

> **Importante:** execute os prompts individualmente no GitHub Copilot,
> preferencialmente no modo Agent. Após cada etapa, revise os arquivos
> alterados e os resultados apresentados antes de avançar.

## 2. Orientações para quem dará continuidade

Antes de começar:

-   Abra a pasta raiz do projeto no VS Code.
-   Confirme que está trabalhando na versão mais recente do repositório.
-   Verifique se existe cópia de segurança dos arquivos importantes.
-   Não publique alterações sem revisar o diff do Git.
-   Não invente nomes, telefones, autorizações, horários, eventos ou
    informações institucionais.
-   Preserve a identidade visual e as funcionalidades já aprovadas.
-   Faça um commit após cada etapa validada, para facilitar a
    recuperação caso algo dê errado.

### Ordem recomendada

  -----------------------------------------------------------------------
  Ordem             Prompt            Objetivo          Prioridade
  ----------------- ----------------- ----------------- -----------------
  1                 19                Segurança,        Crítica
                                      privacidade e     
                                      exposição de      
                                      dados             

  2                 20                Validação         Alta
                                      automática antes  
                                      da publicação     

  3                 21                Simplificação do  Média
                                      calendário e      
                                      contingência      

  4                 22                Manual de         Alta
                                      manutenção e      
                                      entrega           
                                      institucional     

  5                 Auditoria final   Verificar se as   Obrigatória
                                      correções foram   
                                      aplicadas         
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 3. Prompt 19 --- Correção de segurança e privacidade

**Prioridade crítica: executar antes de publicar o site.**

Copie e envie ao GitHub Copilot Agent:

> Atue como engenheiro de software sênior especializado em segurança,
> privacidade e proteção de dados.
>
> Com base na auditoria arquitetural do projeto Vila do Artesão,
> implemente as correções necessárias para evitar a exposição indevida
> de informações pessoais.
>
> **PROBLEMA 1 --- PLANILHA ORIGINAL**
>
> O projeto pode conter o arquivo
> `RELAÇÃO DOS RECADASTRADOS VILA DO ARFTESÃO-1.xlsx`. Esse arquivo
> contém informações de artesãos e não deve fazer parte da publicação
> pública do site.
>
> AÇÕES: 1. Identifique sua localização. 2. Verifique se existem outras
> cópias da planilha dentro da pasta pública. 3. Retire os arquivos
> originais da estrutura destinada à publicação. 4. Não exclua
> definitivamente os arquivos sem criar ou confirmar uma cópia de
> segurança fora da pasta pública. 5. Atualize o README para explicar
> que a planilha original deve ficar em armazenamento institucional
> restrito. 6. Verifique se algum arquivo público contém dados que não
> deveriam ser divulgados.
>
> **PROBLEMA 2 --- TELEFONES DOS ARTESÃOS**
>
> Analise `data/artesaos.json`. Os telefones só poderão ser publicados
> quando houver autorização expressa para divulgação pública.
>
> AÇÕES: 1. Identifique todos os campos que contenham telefone. 2.
> Verifique todos os links de WhatsApp gerados. 3. Não considere a
> simples ocultação dos dados na interface como medida de segurança. 4.
> Preserve os registros dos artesãos. 5. Mantenha os campos de telefone
> vazios ou indisponíveis para publicação enquanto a autorização não
> estiver confirmada. 6. Preserve os campos necessários para futura
> integração de contatos autorizados.
>
> Não invente autorizações.
>
> **PROBLEMA 3 --- FORMULÁRIOS**
>
> Verifique a página de agendamento e a política de privacidade.
> Enquanto não houver definição institucional sobre responsável pelo
> tratamento, finalidade, acesso, retenção e canal de atendimento aos
> titulares:
>
> -   Não habilite coleta de dados pessoais.
> -   Mantenha o formulário em estado provisório.
> -   Exiba uma mensagem explicando que o agendamento ainda está sendo
>     preparado.
>
> **REGRAS**
>
> -   Não remover funcionalidades que não tenham relação com os
>     problemas identificados.
> -   Não modificar a identidade visual.
> -   Não inventar dados.
> -   Não apagar arquivos sem backup.
> -   Não afirmar que uma autorização ou adequação legal foi obtida.
>
> Ao final, apresente todos os arquivos modificados e um relatório das
> correções realizadas.
>
> Importante: se o projeto já tiver sido publicado em repositório
> público, não considere a remoção do arquivo da versão atual suficiente
> para eliminar sua exposição no histórico Git. Sinalize essa situação
> para avaliação institucional.

### Conferência humana após o Prompt 19

-   [ ] A planilha original não está na pasta publicada.
-   [ ] Existe cópia de segurança em local institucional restrito.
-   [ ] Não há cópias da planilha em outras pastas públicas.
-   [ ] Telefones não autorizados não estão no JSON público.
-   [ ] Links de WhatsApp não expõem contatos sem autorização.
-   [ ] Formulários de coleta permanecem desabilitados enquanto as
    definições institucionais estiverem pendentes.
-   [ ] A política de privacidade não contém informações inventadas.
-   [ ] Foi verificado se a planilha já esteve em repositório público ou
    no histórico Git.

**Atenção:** remover um arquivo da versão atual não apaga
necessariamente cópias presentes no histórico do Git. Se houve
publicação indevida, encaminhe o caso à instituição para avaliação.

------------------------------------------------------------------------

## 4. Prompt 20 --- Validação automática antes da publicação

**Prioridade alta: executar depois das correções de privacidade.**

> Atue como engenheiro de software especializado em qualidade e
> automação de projetos frontend.
>
> Implemente uma rotina simples e gratuita de validação do projeto Vila
> do Artesão.
>
> **OBJETIVO:** identificar problemas antes que uma alteração seja
> publicada no GitHub Pages.
>
> **IMPLEMENTAR VERIFICAÇÕES PARA:** 1. Validar a sintaxe de todos os
> arquivos JSON. 2. Identificar campos obrigatórios ausentes nos
> registros dos artesãos. 3. Verificar a estrutura dos eventos. 4.
> Identificar imagens inexistentes. 5. Identificar caminhos internos
> inválidos. 6. Identificar páginas sem título ou meta description. 7.
> Verificar se os arquivos CSS e JavaScript referenciados existem. 8.
> Identificar links internos quebrados. 9. Identificar arquivos
> desnecessários na pasta pública. 10. Verificar se a planilha original
> ou outros documentos restritos estão na estrutura publicada.
>
> **TECNOLOGIA:** priorizar JavaScript com Node.js apenas para a
> execução das verificações de desenvolvimento. O site em produção deve
> continuar funcionando sem Node.js ou backend.
>
> Criar um script, por exemplo `scripts/validar-projeto.js`.
>
> Criar instruções no README explicando como executar a validação.
>
> Configurar também um GitHub Actions gratuito para executar as
> verificações antes da publicação.
>
> **REGRAS:** - Não adicionar frameworks. - Não introduzir dependências
> desnecessárias. - Não modificar o funcionamento das páginas. - Não
> impedir a publicação por avisos que sejam apenas informativos. - Erros
> críticos devem interromper a publicação.
>
> Ao final, documentar os testes implementados e demonstrar como
> executá-los.

### Conferência humana após o Prompt 20

-   [ ] O script de validação foi criado.
-   [ ] O comando para executá-lo está documentado.
-   [ ] Os arquivos JSON são validados.
-   [ ] Os caminhos de imagens, CSS e JavaScript são verificados.
-   [ ] Links internos quebrados são identificados.
-   [ ] Arquivos restritos na pasta pública são sinalizados.
-   [ ] O GitHub Actions foi configurado.
-   [ ] Um teste com erro proposital demonstrou que erros críticos
    interrompem a publicação.
-   [ ] Um teste sem erros demonstrou que a validação é aprovada.

**Observação:** a automação ajuda a detectar problemas técnicos, mas não
substitui a revisão humana de autorizações, conteúdo e privacidade.

------------------------------------------------------------------------

## 5. Prompt 21 --- Simplificação do calendário e contingência

**Prioridade média: executar depois das correções críticas.**

> Faça uma revisão das funcionalidades que dependem de informações ou
> serviços externos no projeto Vila do Artesão.
>
> **1. CALENDÁRIO**
>
> Atualmente existem eventos sem datas confirmadas.
>
> Simplifique a página `calendario.html` para apresentar: - Datas
> comemorativas importantes. - Categorias de eventos. - Cards de
> eventos. - Aviso "Programação em atualização" quando não houver
> eventos confirmados.
>
> Não exibir um calendário mensal vazio com doze meses sem programação.
> Manter a estrutura JSON para inclusão futura de datas.
>
> **2. SERVIÇOS EXTERNOS**
>
> Verificar Google Maps, YouTube, Instagram, Google Fonts e formulários
> externos.
>
> Criar alternativas visuais para situações em que esses serviços não
> carreguem: - Vídeos: exibir miniatura e link para abrir no YouTube. -
> Mapa: exibir botão para abrir o Google Maps. - Instagram: manter link
> externo funcional mesmo sem incorporação. - Formulários: apresentar
> orientação alternativa de contato quando não estiverem configurados.
>
> **3. PERFORMANCE**
>
> Avaliar carregamento de imagens, vídeos e scripts. Implementar
> carregamento sob demanda quando isso melhorar a experiência.
>
> **4. CONSISTÊNCIA**
>
> Não alterar a identidade visual, as funcionalidades já aprovadas ou a
> organização geral do projeto.
>
> Ao finalizar, apresentar os arquivos modificados e os resultados dos
> testes.

### Conferência humana após o Prompt 21

-   [ ] O calendário não apresenta meses vazios como se houvesse
    programação.
-   [ ] Eventos sem confirmação estão identificados como provisórios ou
    com data a definir.
-   [ ] O link do Google Maps funciona mesmo sem mapa incorporado.
-   [ ] Os vídeos têm alternativa de acesso direto ao YouTube.
-   [ ] O Instagram continua acessível por link externo.
-   [ ] Formulários não configurados exibem orientação clara.
-   [ ] A página continua informativa quando serviços externos estão
    indisponíveis.
-   [ ] A identidade visual foi preservada.

------------------------------------------------------------------------

## 6. Prompt 22 --- Continuidade e entrega institucional

**Prioridade alta: etapa necessária para transferência do projeto.**

> Prepare o projeto Vila do Artesão para transferência e manutenção
> institucional após o encerramento do projeto de extensão
> universitária.
>
> **OBJETIVO:** permitir que pessoas sem conhecimento avançado de
> programação consigam atualizar o conteúdo e manter o site.
>
> Criar um **MANUAL DE MANUTENÇÃO** contendo: 1. Como atualizar a lista
> de artesãos. 2. Como incluir novos artesãos. 3. Como alterar o número
> de um chalé. 4. Como incluir novas histórias. 5. Como adicionar
> eventos. 6. Como alterar fotografias. 7. Como atualizar o Instagram.
> 8. Como configurar o WhatsApp. 9. Como inserir o mapa interativo. 10.
> Como configurar os formulários. 11. Como publicar alterações. 12. Como
> recuperar uma versão anterior.
>
> Criar também uma **MATRIZ DE RESPONSABILIDADES**: - Responsável pelo
> conteúdo. - Responsável pelos contatos dos artesãos. - Responsável
> pelos agendamentos. - Responsável técnico pelo repositório. -
> Responsável pela aprovação institucional.
>
> Não inventar nomes de responsáveis.
>
> Criar documentação que possa ser entregue à UNIFACISA e à
> administração da Vila do Artesão.
>
> O projeto deve continuar funcional mesmo que o estudante responsável
> pelo desenvolvimento deixe de participar da iniciativa.
>
> Manter a arquitetura simples e sem dependência de serviços pagos.

### Conferência humana após o Prompt 22

-   [ ] O manual está dentro do repositório.
-   [ ] As instruções correspondem à estrutura real do projeto.
-   [ ] O procedimento de atualização dos artesãos está explicado.
-   [ ] A inclusão de eventos e histórias está documentada.
-   [ ] A configuração de formulários e contatos está explicada.
-   [ ] A publicação no GitHub Pages está documentada.
-   [ ] A recuperação de versões anteriores está explicada.
-   [ ] A matriz de responsabilidades está criada, sem nomes inventados.
-   [ ] A instituição recebeu orientação sobre a transferência de acesso
    ao repositório.

------------------------------------------------------------------------

## 7. Prompt de auditoria final

Depois de executar os quatro prompts, envie o seguinte ao Copilot Agent:

> Atue como engenheiro de software sênior responsável pela homologação
> final do projeto Vila do Artesão.
>
> Foram executadas etapas de correção de privacidade, validação
> automática, simplificação de funcionalidades e preparação para
> continuidade institucional.
>
> Faça uma nova auditoria completa, comparando a situação atual do
> projeto com os seguintes requisitos:
>
> **SEGURANÇA E PRIVACIDADE** - A planilha original não está na
> estrutura pública. - Os telefones sem autorização não são
> publicados. - Os formulários não coletam dados enquanto as definições
> institucionais estiverem pendentes. - A documentação de privacidade
> não contém informações inventadas.
>
> **QUALIDADE TÉCNICA** - Os arquivos JSON são válidos. - Os caminhos
> internos estão corretos. - As imagens e dependências locais existem. -
> As páginas possuem metadados básicos. - Os links internos funcionam. -
> O processo de validação automática está operacional.
>
> **FUNCIONALIDADES** - O catálogo de artesãos funciona. - A lista só
> aparece após a ação solicitada pelo usuário. - Os filtros e a busca
> funcionam. - O calendário apresenta apenas informações adequadamente
> identificadas. - Os vídeos e links externos possuem alternativas. - O
> mapa está preparado para receber o arquivo do outro grupo.
>
> **CONTINUIDADE INSTITUCIONAL** - O manual de manutenção existe. - As
> instruções correspondem ao código atual. - A matriz de
> responsabilidades está documentada. - O procedimento de publicação
> está explicado.
>
> Não modifique arquivos durante a primeira etapa desta auditoria.
>
> Apresente uma tabela contendo: - Requisito. - Situação: aprovado,
> pendente ou reprovado. - Evidência encontrada. - Arquivo
> relacionado. - Ação necessária.
>
> Não marque um requisito como aprovado sem verificar sua implementação.
>
> Ao final, apresente um parecer técnico sobre a possibilidade de
> publicação institucional.

------------------------------------------------------------------------

## 8. Checklist geral de aprovação

Marque cada item somente após verificar o resultado no projeto.

### Segurança e privacidade

-   [ ] Planilha original fora da pasta pública.
-   [ ] Contatos divulgados somente com autorização apropriada.
-   [ ] Formulários habilitados somente após definição institucional.
-   [ ] Política de privacidade revisada.
-   [ ] Histórico do Git avaliado caso tenha ocorrido exposição
    anterior.

### Funcionamento

-   [ ] Todas as páginas carregam corretamente.
-   [ ] Menu e rodapé funcionam.
-   [ ] Catálogo e filtros funcionam.
-   [ ] Lista de artesãos aparece somente após o clique.
-   [ ] Links de localização e redes sociais funcionam.
-   [ ] Vídeos possuem alternativa de acesso.
-   [ ] Mapa está preparado para receber o arquivo futuro.

### Qualidade

-   [ ] Validação automática executada.
-   [ ] Nenhum erro crítico identificado.
-   [ ] Testes em celular e computador realizados.
-   [ ] Caminhos dos arquivos verificados.
-   [ ] Identidade visual preservada.

### Entrega institucional

-   [ ] Manual de manutenção concluído.
-   [ ] Responsáveis institucionais definidos.
-   [ ] Repositório sob controle institucional.
-   [ ] Pelo menos dois mantenedores com acesso.
-   [ ] Publicação testada no endereço definitivo.

------------------------------------------------------------------------

## 9. Arquitetura que deve ser preservada

A auditoria indicou que a arquitetura atual é suficiente para a escala
do projeto.

**Manter:**

-   HTML5 para estrutura das páginas.
-   CSS3 para identidade visual e responsividade.
-   JavaScript ES Modules para interações.
-   JSON para conteúdo atualizado periodicamente.
-   GitHub Pages para hospedagem estática gratuita.

**Não adicionar sem justificativa técnica:**

-   React ou Next.js.
-   Banco de dados.
-   Backend próprio.
-   Firebase.
-   CMS complexo.
-   Serviços pagos de hospedagem.

O objetivo é manter um site profissional, econômico e sustentável, sem
criar uma estrutura que a instituição tenha dificuldade de administrar.

------------------------------------------------------------------------

## 10. Resultado esperado

Ao concluir este roteiro, o projeto deverá estar preparado para:

1.  Ser publicado com menor risco de exposição de dados.
2.  Ser validado automaticamente antes das atualizações.
3.  Continuar funcionando mesmo quando serviços externos apresentarem
    indisponibilidade.
4.  Ser transferido à administração responsável.
5.  Receber atualizações sem depender do estudante que iniciou o
    desenvolvimento.
6.  Permanecer hospedado sem custo de infraestrutura, observados os
    limites e termos do serviço utilizado.

**Orientação final:** não considere o projeto concluído apenas porque o
Copilot informou que executou as correções. A aprovação deve ocorrer
após conferir os arquivos, executar os testes e validar a publicação
real.

**Documento destinado à continuidade do projeto de extensão
universitária da UNIFACISA em parceria com a Vila do Artesão e a Casa do
Empreendedor.**
