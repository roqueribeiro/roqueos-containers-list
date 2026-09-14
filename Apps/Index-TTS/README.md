# Index-TTS

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

**Notas Adicionais:**
- Por favor, certifique-se de que a memória disponível > 12 GB, caso contrário a aplicação poderá não funcionar corretamente
- Esta aplicação executa em CPU por padrão. Este modo tem baixa eficiência computacional e causará consumo de recursos extremamente alto e potencial instabilidade do sistema. Para desempenho e estabilidade ideais, é fortemente recomendado usar GPU NVIDIA para executar esta aplicação
- Se você precisar usar GPU NVIDIA, selecione "Custom Install" e ative a opção GPU (suportado no ZimaOS 1.5.0 e superior)
- Para uso de GPU NVIDIA, é necessário ≥ 8 GB de VRAM (recomendado para desempenho ideal)
- Para uso de GPU NVIDIA, é necessário NVIDIA CUDA Toolkit versão ≥ 12.8

**Saiba Mais:**
- [IndexTTS GitHub](https://github.com/index-tts/index-tts)


Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64.

## Portas

| Host  | Container | Protocolo | Para que serve   | Serviço   |
| ----- | --------- | --------- | ---------------- | --------- |
| 17869 | 7860      | tcp       | Porta WebUI HTTP | index-tts |


## Volumes

Onde os dados deste app ficam no seu servidor.

_Nenhum._


## Variáveis de ambiente

_Nenhum._


## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:17869/`.

- 1. Por favor, certifique-se de que a memória disponível > 12 GB, caso contrário a aplicação poderá não funcionar corretamente
- 2. A aplicação leva aproximadamente 5 minutos para iniciar, por favor seja paciente
- 3. Esta aplicação executa em CPU por padrão. Este modo tem baixa eficiência computacional e causará consumo de recursos extremamente alto e potencial instabilidade do sistema. Para desempenho e estabilidade ideais, é fortemente recomendado usar GPU NVIDIA para executar esta aplicação
- 4. Se você precisar usar GPU NVIDIA, selecione "Custom Install" e ative a opção GPU (suportado no ZimaOS 1.5.0 e superior)

## Imagens

| Serviço   | Imagem                     |
| --------- | -------------------------- |
| index-tts | icewhaletech/index-tts:2.0 |

## Fonte oficial

Projeto original: **icewhaletech**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
