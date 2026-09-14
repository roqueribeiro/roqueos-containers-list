# Memos

> Memos é um hub de memos leve e auto-hospedado. Código aberto e grátis para sempre。

## O que é

Memos é uma aplicação de notas leve, de código aberto e auto-hospedada que oferece uma solução segura e simplificada para utilizadores que priorizam a privacidade e o controlo de dados. Todas as notas são armazenadas no servidor do próprio utilizador, eliminando os riscos associados a serviços de nuvem de terceiros. A sua interface Web minimalista suporta sintaxe Markdown e organização baseada em etiquetas, permitindo a captura sem esforço de ideias, gestão de conhecimento pessoal ou colaboração em pequenas equipas. O design de código aberto garante transparência, capacidade de manutenção a longo prazo e sem custos de subscrição, tornando-o ideal para utilizadores que procuram propriedade de dados e eficiência de custos.

Projetado para simplicidade e eficiência, o Memos atende a uma variedade de casos de uso. Seja para anotar pensamentos diários, organizar notas de estudo ou partilhar memorandos de tarefas em pequenas equipas, o Memos proporciona uma experiência perfeita através do seu sistema de etiquetas intuitivo e formatação Markdown. Acessível através de qualquer navegador Web, não requer clientes proprietários ou configuração complexa, permitindo aos utilizadores gerir notas a qualquer hora e em qualquer lugar.

Seja usado para arquivo de conhecimento pessoal a longo prazo ou como uma ferramenta leve para colaboração em equipa, o Memos oferece uma solução segura, flexível e fácil de usar, capacitando os utilizadores a manter total controlo sobre os seus dados enquanto desfrutam de uma experiência de tomada de notas simplificada。


Categoria na App Store do RoqueOS: **Productivity**.
Arquiteturas suportadas: amd64, arm64, arm.

## Portas

| Host | Container | Protocolo | Para que serve  | Serviço |
| ---- | --------- | --------- | --------------- | ------- |
| 5230 | 5230      | tcp       | WebUI HTTP Port | memos   |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                   | No container   | Serviço |
| ------------------------- | -------------- | ------- |
| /DATA/AppData/memos/memos | /var/opt/memos | memos   |

## Variáveis de ambiente

| Variável | Valor padrão | Serviço |
| -------- | ------------ | ------- |
| PGID     | $PGID        | memos   |
| PUID     | $PUID        | memos   |
| TZ       | $TZ          | memos   |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:5230/`.

## Imagens

| Serviço | Imagem              |
| ------- | ------------------- |
| memos   | neosmemo/memos:0.25 |

## Fonte oficial

Projeto original: **usememos Team**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
