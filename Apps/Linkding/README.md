# Linkding

> Gerenciador de bookmarks auto-hospedado, rápido e minimalista

## O que é

Linkding é um gerenciador de bookmarks rápido, minimalista e auto-hospedado. Projetado para ser leve (Django + SQLite, ~100 MB RAM), com tags, snapshots arquivados via Web Archive single-file, busca full-text, API REST e UI dark-mode limpa. Extensões para Chrome/Firefox.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                                                         | Serviço  |
| ---- | --------- | --------- | -------------------------------------------------------------------------------------- | -------- |
| 9092 | 9090      | tcp       | Porta da interface web (mapeada para 9092 no host para evitar conflito com Prometheus) | linkding |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container       | Serviço  |
| ------------------------- | ------------------ | -------- |
| /DATA/AppData/$AppID/data | /etc/linkding/data | linkding |

## Variáveis de ambiente

| Variável                    | Valor padrão             | Serviço  |
| --------------------------- | ------------------------ | -------- |
| LD_SUPERUSER_NAME           | admin                    | linkding |
| LD_SUPERUSER_PASSWORD       | ${LD_SUPERUSER_PASSWORD} | linkding |
| LD_DISABLE_BACKGROUND_TASKS | False                    | linkding |
| LD_DISABLE_URL_VALIDATION   | False                    | linkding |
| LD_ENABLE_AUTH_PROXY        | False                    | linkding |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:9092/`.

- LD_SUPERUSER_PASSWORD (usuário admin) é gerada pelo RoqueOS na instalação, única para este servidor, e aparece uma vez logo depois de instalar: guarde-a.
- Após o boot, instale a extensão Linkding no navegador e aponte para http://SEU_IP:9092.

## Imagens

| Serviço  | Imagem                       |
| -------- | ---------------------------- |
| linkding | sissbruecker/linkding:1.40.0 |

## Fonte oficial

Projeto original: **sissbruecker**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
