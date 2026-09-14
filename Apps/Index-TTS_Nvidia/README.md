# Index-TTS(Nvidia GPU)

> Um sistema de texto para fala zero-shot controlável e eficiente de nível industrial

## O que é

IndexTTS2 é um modelo avançado de texto para fala zero-shot que alcança inovadoramente o desacoplamento completo entre expressão emocional e identidade do falante. O modelo suporta controle preciso da duração da fala e controle emocional multimodal, capaz de manter o timbre alvo enquanto reproduz com precisão a entonação emocional especificada.

O modelo emprega um paradigma de treinamento em três fases e introduz representações latentes GPT, garantindo excelente clareza e estabilidade da fala mesmo sob alta expressão emocional. Através do mecanismo de instrução suave baseado em Qwen, os usuários podem facilmente controlar as características emocionais da fala gerada usando descrições em linguagem natural.

Em avaliações multi-conjuntos de dados, IndexTTS2 supera os modelos TTS zero-shot existentes em métricas-chave como taxa de erro de palavras, similaridade do falante e fidelidade emocional, fornecendo qualidade de síntese de fala líder da indústria.

**Funcionalidades Principais:**
- Capacidade TTS zero-shot para replicar qualquer timbre sem treinamento
- Controle independente de emoção e timbre com entrada emocional multimodal
- Controle preciso de duração com especificação explícita de contagem de tokens para sincronização perfeita de áudio-vídeo
- Controle emocional baseado em linguagem natural para guiar a geração de fala através de descrições textuais

**Pré-requisitos:**
- Por favor, certifique-se de que a memória disponível > 12 GB, caso contrário a aplicação poderá não funcionar corretamente
- GPU NVIDIA com ≥ 8 GB de VRAM (recomendado para desempenho ideal)
- NVIDIA CUDA Toolkit versão ≥ 12.8

**Saiba Mais:**
- [IndexTTS GitHub](https://github.com/index-tts/index-tts)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64.

## Portas

| Host | Container | Protocolo | Para que serve     | Serviço          |
| ---- | --------- | --------- | ------------------ | ---------------- |
| 7867 | 7860      | tcp       | Porta Gradio WebUI | index-tts-nvidia |


## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

| Variável               | Valor padrão | Serviço          |
| ---------------------- | ------------ | ---------------- |
| NVIDIA_VISIBLE_DEVICES | all          | index-tts-nvidia |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:7867/`.

## Imagens

| Serviço          | Imagem                     |
| ---------------- | -------------------------- |
| index-tts-nvidia | icewhaletech/index-tts:2.0 |

## Fonte oficial

Projeto original: **icewhaletech**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
