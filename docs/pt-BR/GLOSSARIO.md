# Glossário

*Tradução de [GLOSSARY.md](../GLOSSARY.md), a versão principal, em inglês. Se as duas divergirem, vale a em inglês.*

| Termo | Significado |
| --- | --- |
| **App** | uma pasta em `Apps/`: um manifesto, um ícone e uma ficha da loja |
| **Manifesto** | o `docker-compose.yml` do app, com metadados em `x-casaos` e `x-roqueos` |
| **Ficha da loja** | a página do app na loja, e o `README.md` gerado a partir do manifesto pelo `yarn readme` |
| **Serviço principal** | o serviço nomeado em `x-casaos.main`: o que a loja abre e apresenta como o app |
| **Seed** | um serviço com `restart: 'no'` que escreve uma primeira configuração numa pasta vazia e sai; o app espera por ele com `service_completed_successfully` |
| **Stack** | todos os serviços de um manifesto, instalados e removidos juntos |
| **Variável de sistema** | `$AppID`, `$PUID`, `$PGID` ou `$TZ`, substituídas pelo instalador |
| **Segredo gerado** | um valor declarado em `x-roqueos.gerar` e criado a cada instalação pelo servidor do RoqueOS, nunca escrito no repositório |
| **Login padrão da imagem** | um login que a imagem cria sozinha e que nenhuma variável consegue mudar; declarado em `x-roqueos.senhaPadraoDaImagem` e mostrado na ficha |
| **Premissa** | uma das dez checagens do `yarn revisao`, de P1 a P10 ([CRITERIOS-DE-TESTE.md](CRITERIOS-DE-TESTE.md)) |
| **Fechada / aberta** | uma premissa que passa / reprova para um app; o CI reprova enquanto houver alguma aberta |
| **Teste de boot** | `yarn boot`: subir o app no Linux e checar que ele fica de pé e responde |
| **Inconclusivo** | um boot que não conseguiu decidir por um motivo do laboratório (sem GPU, um limite do registry), relatado separado de uma falha |
| **Bind mount** | uma pasta do host montada dentro do container; aqui, em `/DATA/AppData/$AppID/`, fora as montagens do sistema que a P4 aceita e os caminhos justificados em `x-roqueos.motivo.volumeHost` |
| **Imagem fixada** | uma imagem referenciada por uma tag exata ou por um digest `sha256`, nunca `:latest` |
| **Aposentado** | um app que saiu da loja de vez ([APOSENTADOS.md](APOSENTADOS.md)) |
| **Fora da loja até voltar** | um app removido até que um conserto nomeado seja feito |
| **CasaOS** | o sistema de servidor doméstico cujo formato de loja de apps (`x-casaos`) este catálogo mantém compatível |
| **Servidor do RoqueOS** | o `roqueos-server`, o backend self-hosted que lê este catálogo e instala os apps |
