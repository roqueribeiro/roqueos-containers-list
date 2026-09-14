# ConvertX

> Uma ferramenta de conversão de arquivos versátil que suporta múltiplos formatos.

## O que é

ConvertX é um serviço de conversão de ficheiros auto-hospedado que permite aos utilizadores converter ficheiros entre diferentes formatos através de uma interface web intuitiva. Suporta uma vasta gama de tipos de ficheiros incluindo documentos, imagens, vídeos e ficheiros de áudio, tornando-o uma solução abrangente para todas as suas necessidades de conversão de ficheiros.

O serviço é concebido com simplicidade e facilidade de utilização em mente. Os utilizadores podem simplesmente carregar os seus ficheiros, selecionar o formato de saída desejado e deixar o ConvertX tratar do processo de conversão. A interface web proporciona uma experiência limpa e amigável, com suporte para arrastar e largar e capacidades de conversão em lote.

ConvertX funciona inteiramente na sua própria infraestrutura, garantindo que os seus ficheiros permanecem privados e seguros. Não há necessidade de carregar documentos sensíveis para serviços de terceiros, dando-lhe controlo total sobre os seus dados. O serviço é contentorizado para fácil implementação e pode ser integrado em configurações existentes de servidores domésticos.

**Características Principais:**
- Suporte para múltiplos formatos de ficheiros (documentos, imagens, vídeos, áudio)
- Interface web intuitiva com suporte para arrastar e largar
- Capacidades de conversão em lote
- Auto-hospedado para privacidade e segurança
- Contentorizado para fácil implementação
- Sem limitações de tamanho de ficheiro

**Saiba Mais:**
- [ConvertX GitHub Repository](https://github.com/c4illin/convertx)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve   | Serviço  |
| ---- | --------- | --------- | ---------------- | -------- |
| 3333 | 3000      | tcp       | Porta HTTP WebUI | convertx |

> A porta host deste app é sabidamente disputada com outro app do catálogo. O instalador realoca; se você instalar os dois, confira o endereço na tela do app.

## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container | Serviço  |
| ------------------------- | ------------ | -------- |
| /DATA/AppData/$AppID/data | /app/data    | convertx |

## Variáveis de ambiente

| Variável     | Valor padrão                                      | Serviço  |
| ------------ | ------------------------------------------------- | -------- |
| JWT_SECRET   | aLongAndSecretStringUsedToSignTheJSONWebToken1234 | convertx |
| HTTP_ALLOWED | true                                              | convertx |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:3333/`.

## Imagens

| Serviço  | Imagem                   |
| -------- | ------------------------ |
| convertx | c4illin/convertx:v0.14.1 |

## Fonte oficial

Projeto original: **c4illin**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
