# O que está provado, e como

*Tradução de [TESTING.md](../TESTING.md), a versão principal, em inglês. Se as duas divergirem, vale a em inglês.*

Três camadas ficam entre um manifesto e a loja. Cada uma diz o que prova, como, e o que a faz reprovar. A última seção diz o que nenhuma delas cobre ainda, porque uma checagem que afirma mais do que mede foi exatamente como um app quebrado chegou à loja antes.

## Camada 1: o schema (`yarn validate`)

O [`scripts/validate-manifests.mjs`](../../scripts/validate-manifests.mjs) checa todo `Apps/*/docker-compose.yml` contra o [`schema/casaos-app.schema.json`](../../schema/casaos-app.schema.json) (JSON Schema Draft-07) e depois roda invariantes entre campos que o schema não consegue expressar.

| O que prova | O que reprova |
| --- | --- |
| O arquivo é um compose com `name` e `services` | chaves faltando, tipos errados |
| Toda imagem está fixada | um nome sem tag, ou `:latest` (uma allowlist curta de apps legados está congelada no script e só pode diminuir) |
| `x-casaos.main` dá o nome de um serviço real | um nome que não bate com nenhum serviço, ou nenhum `main` com mais de um serviço |
| `port_map` é uma porta do host que o serviço principal publica | uma porta que ninguém publica |
| `architectures`, `category`, `scheme` vêm dos enums deles | qualquer outro valor |
| As extensões `x-roqueos` têm o formato declarado | um `mountShared` que não é booleano, um formato de `gerar` desconhecido, um nome de segredo que não é uma variável em maiúsculas |

## Camada 2: as dez premissas (`yarn revisao`)

O [`scripts/revisao-container.mjs`](../../scripts/revisao-container.mjs) lê cada app e fecha ou abre dez premissas. O CI reprova enquanto algum app tiver uma aberta, e a evidência de cada app vai para `.revisao/<App>.json`. O `yarn revisao:app <App>` imprime um veredito com os motivos.

| # | Premissa | O que prova | O que reprova |
| --- | --- | --- | --- |
| P1 | Compatibilidade | a loja consegue posicionar e abrir o app | sem `main`, `main` que não resolve nada, `architectures` vazio, uma categoria que o servidor do RoqueOS não mapeia (ela cairia em "other" em silêncio) |
| P2 | Portas | toda porta publicada diz o que é | uma porta sem descrição, uma descrição que repete o campo (`Container Port: 8080`), uma porta do host dividida com outro app e não declarada em `x-roqueos.portaCompartilhada` |
| P3 | Variáveis | nenhum segredo está escrito no repositório público, e toda variável tem uma origem | um valor literal com nome de segredo (password, token, key, salt, JWT), um placeholder (`change-me`, `replace-with`, `[YOUR_IP]`), uma senha dentro de uma URL ou de um `command` (incluindo `--requirepass`), um `$VAR` que não é variável de sistema nem está declarado em `x-roqueos.gerar`, um segredo declarado que ninguém usa, uma dica que mostra uma senha padrão sem `x-roqueos.senhaPadraoDaImagem` |
| P4 | Configuração | o app é reproduzível e guarda os dados onde o usuário faz backup | uma imagem não fixada, uma imagem que o registry não entrega, um volume fora de `/DATA/` ou de um mount de sistema conhecido, sem `restart` |
| P5 | Privilégio | acesso elevado é uma decisão que alguém escreveu | `privileged`, `network_mode: host` ou `cap_add` sem o motivo em `x-roqueos.motivo` |
| P6 | README | a ficha da loja existe e tem as seções | sem `README.md`, uma ficha curta demais para ser útil, uma seção faltando |
| P7 | Texto | a loja fala os dois idiomas do projeto | `tagline` ou `description` vazio em `en_us` ou `pt_br` |
| P8 | Ícone | a loja consegue desenhar o app | sem `icon.png` na pasta, não é PNG, não é quadrado, menor que 192 px |
| P9 | Coerência | existe uma fonte de verdade por app | um `appfile.json` (um formato que nada lê) que não é JSON válido ou cita uma imagem diferente da do compose |
| P10 | Permissão de dados | o app consegue escrever na pasta que o instalador cria | uma imagem que troca para um usuário fixo e escreve num bind mount sem `PUID`, sem `user:` root e sem um seed que entregue a pasta; um `user:` não root escrito no manifesto também reprova, porque bate na mesma pasta `root:root` |

**Por que a P10 existe.** O instalador cria uma origem de bind que não existe como `root:root 0755`. Uma imagem que escreve como um usuário fixo (o Grafana escreve como uid 472) não consegue escrever ali e reinicia para sempre. As nove premissas estáticas antes dela passavam todas exatamente nesse Grafana, porque nenhuma delas subia um container.

## Camada 3: o teste de boot (`yarn boot`, workflow `Boot`)

O [`scripts/boot-container.mjs`](../../scripts/boot-container.mjs) sobe o app do jeito que o usuário recebe e olha para ele.

| Etapa | O que faz | O que reprova |
| --- | --- | --- |
| Renderizar | substitui `$AppID`, `$PUID`, `$PGID`, `$TZ` e gera todo segredo de `x-roqueos.gerar`, nos mesmos formatos que o instalador usa | |
| Sandbox | reescreve `/DATA/` para uma pasta descartável e tira as portas publicadas, para que o teste nunca toque em dado real nem colida com o runner | |
| Subir | `docker compose up` | uma imagem que não pode ser baixada, um dispositivo que o host não tem, um runtime de GPU faltando |
| Assentar | espera e lê todos os serviços | um serviço reiniciando, um serviço que saiu, um seed que saiu com erro (`Exited (0)` só conta como sucesso para um serviço com `restart: 'no'`) |
| Responder | chama a porta da ficha da loja por até 180 segundos | nada escutando ali; um servidor que aceita a conexão sem falar HTTP (um banco) conta como resposta, TLS onde a ficha promete HTTP não conta |
| Assentar de novo | lê todos os serviços mais uma vez | um app que respondeu e depois caiu |

**Inconclusivo não é aprovado.** Uma falha que o laboratório causa (sem GPU no runner, limite de requisições do registry, sem IPv6 no kernel) aparece como inconclusiva com o motivo, para que ela não seja escondida nem posta na conta do app.

**Só Linux.** No Docker Desktop, o compartilhamento de pastas distribui permissões frouxas, e o Grafana que reinicia para sempre no Linux sobe normalmente lá. O script se recusa a rodar fora do Linux.

**Onde roda.** Todo pull request que mexe num manifesto sobe os apps que ele mexe. O `workflow_dispatch` sobe uma lista de apps. Um agendamento semanal sobe tudo, mas veja os limites abaixo. O último resultado de cada app fica guardado em [`evidence/boot.json`](../evidence/boot.json) e aparece no [QUALIDADE.md](QUALIDADE.md).

## As ferramentas também têm teste

O `yarn test` roda o Vitest sobre os scripts. A regra do repositório é que uma checagem nova entra com um teste que reprova quando a checagem é removida, e que um teste nunca é afrouxado para fazer um pull request passar. Nada roda teste de mutação automaticamente.

## O que ainda não está coberto

- **O boot semanal não termina.** Ele roda em sequência e para em 90 minutos, então a maioria dos apps só é provada quando um pull request mexe neles.
- **O laboratório roda `docker compose up`, não o instalador do RoqueOS.** O instalador foi testado à parte (`roqueos-server` 1.38.0, num daemon Docker Linux em 17/11/2026), mas não neste pipeline.
- **Só amd64 sobe no boot.** arm64 é declarado, não iniciado, e nenhuma checagem compara isso com as plataformas que a imagem publica.
- **Sem teste de atualização.** Uma versão nova sobe do zero, não por cima dos dados da anterior.
- **Sem login, sem tela.** "Responde na porta" é checado; "a tela abre e o login funciona" não é.
- **Os logins padrão da imagem** são declarados, não removidos: a pessoa ainda precisa trocá-los no primeiro acesso.
