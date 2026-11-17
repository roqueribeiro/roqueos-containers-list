# Onda 0 da loja curada: estancar o que quebra ou expõe o usuário

> Aprovada pelo founder em 17/11/2026 ("Aprovo, Onda 0"), a partir da auditoria
> dos 249 apps publicada no mesmo dia. Cada goal fecha com teste, evidência,
> produção e principal atualizada.

## Goals

| # | Nome | Objetivo | Critério de aceite medível | Evidência |
| --- | --- | --- | --- | --- |
| 29 | aposentados | Tirar da loja os apps sem upstream | 21 apps fora, cada um com motivo, data, evidência e substituto em `docs/APOSENTADOS.md`; nenhum nome órfão nas listas curadas (teste) | PR #11, boot do PR verde, revisor APROVADO |
| 30 | apps que não sobem | Consertar os que falhavam no boot do CI | os 16 que falharam em 15/11 consertados ou fora da loja com condição de volta; laboratório que espera a porta, recheca o estado e manda a evidência | PR #12, boot dos apps tocados no runner Linux |
| 31 | segredo no catálogo | Nenhum segredo escrito no repo público | `x-roqueos.gerar` no schema; P3 reprova literal, placeholder, senha em URL ou `command`, `$VAR` sem origem; 221/221 fechados | testes da P3 com mutante, revisor |
| 32 | server instala o compose inteiro | A loja instala todos os serviços, com `$AppID` e segredo gerado | instalação real num Docker Linux: app e banco sobem, dados em `/DATA/AppData/<app>`, zero reinício, HTTP 200, credencial devolvida uma vez, remoção leva o stack | roqueos-server PR #48, gate do server, prova em dind |
| 33 | front mostra a credencial | A senha gerada aparece uma vez, fora da janela | teste que fecha o App Manager no meio da instalação e a senha continua no aviso | roqueos-front PR #136 |
| 34 | senha padrão da imagem | Nenhum app com senha fraca embutida sem dizer | ver abaixo | a definir no goal |

## Goal 34, descoberto no Goal 31

A revisão do Goal 31 achou senha padrão fraca que não está no nosso manifesto,
e sim na imagem ou na tip: Grafana `admin/admin`, CopyParty `casaos/casaos`,
PocketBase, Calibre-web `admin/admin123`, Crafty, Deluge `deluge`, Shiori
`shiori/gopher`, SwingMusic `admin/admin`, BookStack `admin@admin.com/password`,
qBittorrent (senha temporária no log). `x-roqueos.gerar` não alcança o que a
imagem cria sozinha. A P3 lê `environment` e `command`, não as tips, então o
gate deixava passar.

Critério de aceite: cada um desses apps (1) passa a receber a senha gerada por
variável, quando a imagem aceita (o Grafana aceita `GF_SECURITY_ADMIN_PASSWORD`),
ou (2) declara `x-roqueos.senhaPadraoDaImagem` dizendo qual credencial e que ela
tem de ser trocada no primeiro acesso, e o gate reprova tip com senha padrão sem
essa declaração.

## Decisões tomadas no caminho (sem reabrir decisão do founder)

- **Segredo:** em vez de esconder os 53 apps até o server gerar, o server passou a
  gerar na mesma onda (Goal 32), e o catálogo é compatível com server antigo.
- **Instalador:** a loja instalava só o serviço principal. Isso virou o Goal 32,
  em vez de inchar o Goal 30.
- **Fora da loja até voltar:** Gluetun, Twingate, Zigbee2MQTT e MatrixSynapse
  precisam de configuração que a instalação ainda não pede. Dify, RagFlow e
  LibrePhotos precisam ser reescritos do compose oficial.

## O que fica para as próximas ondas

- Laboratório: boot em matriz amd64 e arm64 e pelo instalador real (Onda 1).
- `[YOUR_CASAOS_IP]` resolvido por uma variável de sistema com o endereço do
  servidor (Baserow, Healthchecks e Rallly usam `localhost` por enquanto).
- Duplicati (falta `SETTINGS_ENCRYPTION_KEY`) e BookStack (falta `APP_KEY`), achados
  pelo boot de diagnóstico de 17/11/2026, entram no Goal 31 por serem segredo.
