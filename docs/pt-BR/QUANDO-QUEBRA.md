# Quando um app quebra

*Tradução de [WHEN-IT-BREAKS.md](../WHEN-IT-BREAKS.md), a versão principal, em inglês. Se as duas divergirem, vale a em inglês.*

Cada linha é uma falha que já aconteceu neste catálogo, o que a causou e o que conserta. Procure o sintoma; a coluna da direita diz qual checagem pega o problema agora.

## Não sobe

| Sintoma | Causa | Conserto | Quem pega |
| --- | --- | --- | --- |
| `Restarting (1)` para sempre, `permission denied` no log | a imagem escreve como um usuário fixo (o Grafana é uid 472) numa pasta que o instalador criou como `root:root` | `PUID`/`PGID` quando a imagem respeita essas variáveis, ou um serviço seed que entrega a pasta para esse usuário; um `user:` não root não resolve, a pasta continua `root:root` | P10, boot |
| O container nunca é criado: `error gathering device information` | uma entrada em `devices:` que o host não tem (`/dev/vchiq` só existe num Raspberry Pi) | tire o dispositivo; explique o passo opcional de hardware na ficha da loja | boot |
| Sai na hora, `config file not found` | a imagem precisa de uma configuração e o instalador entrega uma pasta vazia | um serviço seed com `restart: 'no'` que escreve a primeira configuração uma vez, e `depends_on` com `condition: service_completed_successfully` | boot |
| O app sobe antes do banco e desiste | sem `depends_on`, ou uma lista simples que só espera o container existir | `depends_on` com `condition: service_healthy` e um `healthcheck` no banco | boot |
| `pull access denied`, `manifest unknown`, `401` | a imagem foi removida, mudou de lugar ou ficou privada | fixe uma versão que o registry entrega, ou aposente o app ([APOSENTADOS.md](APOSENTADOS.md)) | P4 (checagem do registry), boot |
| Reinicia num servidor sem GPU | o manifesto usa a imagem CUDA ou um runtime de GPU | a variante de CPU da imagem; um app separado para a variante de GPU | boot (aparece como inconclusivo no runner) |
| `Restarting (137)` | falta de memória | um padrão mais leve, ou uma nota sobre memória na ficha da loja | boot |

## Sobe, mas não funciona

| Sintoma | Causa | Conserto | Quem pega |
| --- | --- | --- | --- |
| **Open** na loja dá erro de TLS | `scheme: https` numa porta que fala HTTP puro | `scheme: http`, ou aponte o `port_map` para a porta HTTPS | boot |
| **Open** não leva a lugar nenhum | o `port_map` aponta para uma porta que o serviço principal não publica, ou para um serviço que escuta em outro lugar | publique a porta em que o app escuta de verdade | schema, boot |
| Login recusado logo depois de instalar | uma senha com valor diferente no app e no banco | uma entrada só de `x-roqueos.gerar`, referenciada pelos dois | P3 |
| Uma variável chega vazia | um `$VAR` que não é variável de sistema nem está declarado em `x-roqueos.gerar` | declare em `gerar`, ou use uma de `$AppID`, `$PUID`, `$PGID`, `$TZ` | P3 |
| Uma URL com `[YOUR_IP]` dentro | um placeholder que a pessoa deveria ter trocado | derive da requisição, ou pergunte na tela; placeholder não é aceito | P3 |
| Uma URL com `localhost` que só funciona no próprio servidor | o app precisa do endereço do servidor e ainda não tem como recebê-lo | limite conhecido (Baserow, Healthchecks, Rallly) até o instalador oferecer essa variável | nenhuma ainda |
| Dois apps brigam pela mesma porta | os dois publicam a mesma porta do host | mude um deles, ou declare `x-roqueos.portaCompartilhada` quando a colisão é conhecida e aceita | P2 |
| Dados perdidos depois de recriar o container | o volume está montado num caminho em que a imagem não escreve | monte o caminho que a imagem usa de verdade (o Forgejo rootful escreve em `/data`, não em `/var/lib/gitea`) | revisão |

## Num painel CasaOS

| Sintoma | Causa | Conserto |
| --- | --- | --- |
| Uma senha ou chave está vazia | o CasaOS não lê `x-roqueos.gerar` | preencha as variáveis `${NAME}` à mão antes da primeira subida |
| Sem a pasta `/shared` | o CasaOS ignora `x-roqueos.mountShared` | adicione o bind à mão se o app precisar |

## Relatando

Abra uma issue **Broken app** com o app, o sintoma, a saída de `docker compose ps` e as últimas linhas do log. Se for um problema de segurança (um segredo exposto, uma imagem que faz algo que não deveria), siga o [SECURITY.md](../../SECURITY.md) (em inglês) em vez disso.
