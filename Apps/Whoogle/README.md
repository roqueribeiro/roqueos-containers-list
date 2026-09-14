# Whoogle Search

> Proxy de busca do Google auto-hospedado, sem anúncios e focado em privacidade

## O que é

O Whoogle Search é um mecanismo de meta-busca auto-hospedado, sem anúncios e focado em privacidade que retorna resultados do Google sem propagandas, JavaScript, AMP, cookies, rastreamento de IP ou identificação por user agent.

Categoria na App Store do RoqueOS: **Network**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve         | Serviço |
| ---- | --------- | --------- | ---------------------- | ------- |
| 5000 | 5000      | tcp       | Porta da interface web | whoogle |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço |
| --------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/config | /config      | whoogle |

## Variáveis de ambiente

| Variável                | Valor padrão | Serviço |
| ----------------------- | ------------ | ------- |
| WHOOGLE_CONFIG_THEME    | system       | whoogle |
| WHOOGLE_CONFIG_LANGUAGE | lang_pt-BR   | whoogle |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5000/`.

- Whoogle faz proxy da busca do Google e remove rastreamento. Sem conta ou API keys necessárias.
- Configure como mecanismo de busca padrão do seu navegador em http://SEU_IP:5000.

### Por que este app pede privilégio

- `capAdd`: capacidade exigida pelo upstream para a função declarada do container

## Imagens

| Serviço | Imagem                        |
| ------- | ----------------------------- |
| whoogle | benbusby/whoogle-search:0.9.4 |

## Fonte oficial

Projeto original: **benbusby**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
