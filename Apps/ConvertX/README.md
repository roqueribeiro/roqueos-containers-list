# ConvertX

> A versatile file conversion tool that supports multiple formats.

## O que é

ConvertX is a self-hosted file conversion service that allows users to convert files between different formats through an intuitive web interface. It supports a wide range of file types including documents, images, videos, and audio files, making it a comprehensive solution for all your file conversion needs.

The service is designed with simplicity and ease of use in mind. Users can simply upload their files, select the desired output format, and let ConvertX handle the conversion process. The web interface provides a clean and user-friendly experience, with drag-and-drop support and batch conversion capabilities.

ConvertX runs entirely on your own infrastructure, ensuring that your files remain private and secure. There's no need to upload sensitive documents to third-party services, giving you full control over your data. The service is containerized for easy deployment and can be integrated into existing home server setups.

**Key Features:**
- Support for multiple file formats (documents, images, videos, audio)
- Intuitive web interface with drag-and-drop support
- Batch conversion capabilities
- Self-hosted for privacy and security
- Containerized for easy deployment
- No file size limitations

**Learn More:**
- [ConvertX GitHub Repository](https://github.com/c4illin/convertx)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço  |
| ---- | --------- | --------- | --------------- | -------- |
| 3333 | 3000      | tcp       | WebUI HTTP Port | convertx |


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
