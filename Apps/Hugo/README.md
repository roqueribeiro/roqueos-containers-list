# Hugo

> O framework mais rápido do mundo para construir websites

## O que é

O Hugo é uma plataforma de geração de sites estáticos de alta velocidade escrita em Go, optimizada para velocidade e concebida para flexibilidade. O sistema de templates avançado e pipelines de recursos rápidos renderizam um website completo em segundos, ideal para criar sites de documentação, páginas de destino e vários websites de projetos.

As funcionalidades principais incluem velocidade optimizada e uma estrutura flexível. A concorrência em Go permite renderização rápida, suportando processamento de imagens (conversão, redimensionamento, recorte, rotação, ajuste de cores, aplicação de filtros, sobreposição de texto/imagens, extracção de dados EXIF), empacotamento JavaScript (tree shaking, divisão de código), processamento Sass e forte suporte TailwindCSS. O suporte multilingue e sistema de taxonomia tornam-no adequado para sites diversos como documentação, notícias ou eventos.

Inclui um servidor web incorporado para pré-visualizações em tempo real de conteúdo, estrutura e alterações de estilo durante o desenvolvimento. Lançamentos frequentes garantem melhorias contínuas de funcionalidades, mantendo-o na vanguarda. Com eficiência e flexibilidade no centro, a plataforma proporciona uma solução moderna de geração de sites estáticos.

**Funcionalidades Principais:**
- Renderização de alta velocidade, gerando sites em segundos
- Pipelines de recursos rápidos: processamento de imagens, empacotamento JavaScript, Sass e suporte TailwindCSS
- Estrutura flexível com sistemas multilingues e de taxonomia
- Servidor web incorporado para pré-visualizações de desenvolvimento em tempo real
- Rico ecossistema de temas e plugins


**Pré-requisitos para Usar Hugo:**

1. Abrir linha de comandos, navegar para o directório `/DATA/AppData/hugo/project`

```cd /DATA/AppData/hugo/project```

2. Inicializar o directório `project` como um repositório Git vazio

```git init```

3. Descarregar o tema Ananke

```git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke```

4. Especificar o tema actual

```echo "theme = 'ananke'" >> hugo.toml```

5. Reiniciar Hugo


**Saber Mais:**
- [Website Oficial Hugo](https://gohugo.io/)
- [Hugo GitHub](https://github.com/gohugoio/hugo)


Categoria na App Store do RoqueOS: **Developer**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve   | Serviço |
| ---- | --------- | --------- | ---------------- | ------- |
| 1313 | 1313      | tcp       | Porta HTTP WebUI | hugo    |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                      | No container | Serviço |
| ---------------------------- | ------------ | ------- |
| /DATA/AppData/$AppID/project | /project     | hugo    |
| /DATA/AppData/$AppID/cache   | /cache       | hugo    |

## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:1313/`.

- Recomendamos rever a documentação [Início Rápido](https://gohugo.io/getting-started/quick-start/) para aprender como usar o Hugo.

## Imagens

| Serviço | Imagem                         |
| ------- | ------------------------------ |
| hugo    | ghcr.io/gohugoio/hugo:v0.152.2 |

## Fonte oficial

Projeto original: **gohugoio**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
