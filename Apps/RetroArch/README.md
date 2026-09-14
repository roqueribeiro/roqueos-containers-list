# RetroArch

> Emulador de jogos retro online

## O que é

O RetroArch-web é um emulador de jogos clássicos baseado na web que permite aos utilizadores desfrutar de uma vasta gama de jogos retro diretamente nos navegadores modernos. Suportando plataformas como GBA, N64, jogos DOS e NES (FC), traz à vida a nostalgia dos jogos. Baseado no projeto open source RetroArch, o RetroArch-web oferece funcionalidades robustas, incluindo renderização gráfica de alta qualidade, processamento de áudio, controlos de entrada e guardar/carregar o progresso do jogo, garantindo uma experiência de emulação precisa e suave.

Concebido para ser fácil de usar, o RetroArch-web não requer instalação de software complexa e funciona perfeitamente nos navegadores. As suas opções de configuração flexíveis permitem aos utilizadores personalizar as definições do comando, filtros visuais e definições de áudio de acordo com as preferências individuais. Com ampla compatibilidade entre plataformas, garante um desempenho estável em todos os dispositivos, oferecendo aos entusiastas de jogos retro uma experiência consistente em qualquer lugar.

Apoiado por uma comunidade open source ativa, o RetroArch-web melhora continuamente o desempenho e expande as plataformas de jogos suportadas. Quer esteja a revisitar títulos clássicos de arcada ou a explorar consolas antigas, o RetroArch-web destaca-se como a escolha ideal para os jogadores retro, combinando uma emulação poderosa com uma interface amigável.

**Funcionalidades Principais:**
- Interface polida para navegar coleções de jogos com miniaturas e fundos animados
- Suporta múltiplos emuladores e motores de jogo para executar jogos clássicos e discos
- Tempo de resposta do próximo frame para experiência de baixa latência próxima do hardware nativo
- Definições altamente configuráveis para ajustar o desempenho do jogo e opções de visualização
- Configuração automática de comando para facilitar jogos multijogador
- Shaders para melhorar a renderização de jogos antigos e imitar efeitos de monitor CRT
- Netplay para jogos multijogador e modo espectador
- Sistema de conquistas para desbloquear troféus e distintivos em jogos clássicos
- Gravação e streaming para capturar gameplay ou transmissão ao vivo

**Saiba mais:**
- [Site oficial do RetroArch](https://www.retroarch.com)
- [Repositório GitHub do RetroArch](https://github.com/libretro/RetroArch)


Categoria na App Store do RoqueOS: **Gaming**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve   | Serviço   |
| ---- | --------- | --------- | ---------------- | --------- |
| 8183 | 80        | tcp       | Porta HTTP WebUI | retroarch |


## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

| Variável      | Valor padrão    | Serviço   |
| ------------- | --------------- | --------- |
| ROOT_WWW_PATH | "/var/www/html" | retroarch |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8183/`.

## Imagens

| Serviço   | Imagem                                                                                          |
| --------- | ----------------------------------------------------------------------------------------------- |
| retroarch | inglebard/retroarch-web@sha256:bf03014db81776a715b6289f017be2fc988688f9302590413cd6dcb615f07393 |

## Fonte oficial

Projeto original: **inglebard**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
