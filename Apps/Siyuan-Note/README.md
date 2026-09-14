# SiYuan Note

> Gestão de conhecimento pessoal, e só sua

## O que é

SiYuan repensa a gestão de conhecimento pessoal integrando a TV de casa, o celular e outras telas. Diferente dos sistemas tradicionais, oferece um ambiente coeso e flexível que se adapta à sua rotina.

Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço     |
| ---- | --------- | --------- | --------------- | ----------- |
| 6806 | 6806      | tcp       | WebUI HTTP Port | siyuan-note |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                        | No container      | Serviço     |
| ------------------------------ | ----------------- | ----------- |
| /DATA/AppData/$AppID/workspace | /siyuan/workspace | siyuan-note |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço     |
| -------- | ------------ | ----------- |
| PUID     | 1000         | siyuan-note |
| PGID     | 1000         | siyuan-note |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:6806/`.

- | accessAuthCode |
- | -------- |
- | `roqueos`    |

## Imagens

| Serviço     | Imagem              |
| ----------- | ------------------- |
| siyuan-note | b3log/siyuan:v3.0.1 |

## Fonte oficial

Projeto original: **siyuan-note**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
