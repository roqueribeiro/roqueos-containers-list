# Swing Music

> O Swing Music é um servidor de streaming de música lindamente projetado e auto-hospedado. Como um Spotify mais cool... mas traga a sua própria música.

## O que é

O Swing Music é um leitor de música rápido, bonito e auto-hospedado, projetado para os seus ficheiros de áudio locais, oferecendo uma experiência elegante semelhante ao Spotify, mas alimentada pela sua própria biblioteca musical. Basta executar a aplicação e aceder à sua coleção de música sem esforço através de um navegador web.

O Swing Music cria misturas diárias com base nos seus hábitos de audição, garante uma biblioteca limpa e consistente com normalização de metadados e suporta versionamento de álbuns (por exemplo, Deluxe, Remaster) juntamente com recomendações de artistas e álbuns relacionados. Navegue pela sua biblioteca musical através da vista de pastas, gira listas de reprodução e desfrute de uma experiência de audição fluida com deteção de silêncio e cross-fade. Funcionalidades adicionais incluem estatísticas de audição, visualização de letras, scrobbling no Last.fm, suporte multiutilizador e coleções personalizadas para agrupar álbuns e artistas.

Com a sua impressionante interface baseada em navegador e funcionalidade robusta, o Swing Music é a escolha perfeita para entusiastas da música que procuram uma forma bonita e prática de gerir e desfrutar da sua coleção de música local.


Categoria na App Store do RoqueOS: **Media**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve                | Serviço    |
| ---- | --------- | --------- | ----------------------------- | ---------- |
| 1970 | 1970      | tcp       | Web interface for Swing Music | swingmusic |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container | Serviço    |
| --------------------------- | ------------ | ---------- |
| /DATA/AppData/$AppID/config | /config      | swingmusic |
| /DATA/Media/Music           | /music       | swingmusic |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:1970/`.

- Quando iniciar o Swing Music pela primeira vez, será solicitado que escolha um diretório de música: Onde deseja procurar música?
- Selecione a opção "Diretórios específicos", escolha "/music" e volte a fazer a varredura.
- Conta padrão
- | Nome | Senha |
- | -------- | -------- |
- | `admin` | `admin` |

## Imagens

| Serviço    | Imagem                            |
| ---------- | --------------------------------- |
| swingmusic | ghcr.io/swingmx/swingmusic:v1.4.8 |

## Fonte oficial

Projeto original: **SwingMX**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
