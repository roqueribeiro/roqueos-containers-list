# MySpeed

> Software de análise que mostra a velocidade da sua internet por até 30 dias.

## O que é

MySpeed ​​é um software de análise de teste de velocidade que armazena a velocidade da sua internet por até 30 dias. Isso também pode ser útil se você quiser saber quando sua rede pode sofrer quedas ou se quiser verificar se sua internet corresponde aos valores contratados em seu contrato.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço |
| ---- | --------- | --------- | --------------- | ------- |
| 5216 | 5216      | tcp       | WebUI HTTP Port | myspeed |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container  | Serviço |
| ------------------------- | ------------- | ------- |
| /DATA/AppData/$AppID/data | /myspeed/data | myspeed |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5216/`.

## Imagens

| Serviço | Imagem                        |
| ------- | ----------------------------- |
| myspeed | germannewsmaker/myspeed:1.0.9 |

## Fonte oficial

Projeto original: **Mathias Wagner**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
