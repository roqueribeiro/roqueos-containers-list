# Tabby

> Alternativa auto-hospedada ao GitHub Copilot (API de code completion)

## O que é

Tabby é um assistente de IA para programação auto-hospedado — alternativa open-source ao GitHub Copilot. Oferece completion de código em tempo real na sua IDE (VS Code, JetBrains, Vim/Neovim) sem enviar código para serviços externos. Indexa sua codebase para completions context-aware, suporta múltiplos backends LLM (StarCoder, CodeLlama, DeepSeek-Coder).

Categoria na App Store do RoqueOS: **AI**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve                                           | Serviço |
| ---- | --------- | --------- | -------------------------------------------------------- | ------- |
| 8098 | 8080      | tcp       | Porta da API + interface web (mapeada para 8098 no host) | tabby   |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço |
| ------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/data | /data        | tabby   |

## Variáveis de ambiente

| Variável        | Valor padrão | Serviço |
| --------------- | ------------ | ------- |
| TABBY_LOG_LEVEL | info         | tabby   |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8098/`.

- Configuração padrão roda StarCoder-1B em CPU (lento mas funcional). Para performance aceitável, use modelo 7B+ em GPU Nvidia — mude `--device cpu` para `--device cuda` e garanta que nvidia-container-toolkit está instalado.
- Após o boot, instale a extensão Tabby na sua IDE e aponte para http://SEU_IP:8098.
- Conecte um repositório Git em admin > Code Repositories para completions context-aware.

## Imagens

| Serviço | Imagem               |
| ------- | -------------------- |
| tabby   | tabbyml/tabby:0.21.0 |

## Fonte oficial

Projeto original: **TabbyML**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
