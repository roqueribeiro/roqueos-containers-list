# Começar

*Tradução de [GETTING-STARTED.md](../GETTING-STARTED.md), a versão principal, em inglês. Se as duas divergirem, vale a em inglês.*

Tem três jeitos de usar este catálogo: instalar apps dele no RoqueOS, adicioná-lo a um painel compatível com o CasaOS, ou trabalhar nele.

## 1. Instalar um app no RoqueOS

O catálogo é a loja padrão da App Store do RoqueOS, então não há nada para configurar. Você precisa de um servidor RoqueOS conectado à interface web (Server Mode).

1. Abra **Containers** e vá para a loja.
2. Escolha um app. A ficha mostra o que ele faz, as portas, as pastas que ele mantém e, quando a imagem vem com um login próprio, esse login.
3. Aperte **Install**. O servidor sobe todos os serviços do manifesto como uma stack só: o app, o banco, o cache e qualquer seed que escreva a primeira configuração.
4. Quando o app tem senha de login, o RoqueOS gera essa senha para o seu servidor e mostra **uma vez só**, num aviso com botão de copiar. Guarde: ela não aparece de novo.
5. O app aparece em **Installed** e abre pelo Launchpad.

Os dados ficam em `/DATA/AppData/<app>/` no servidor. Remover o app remove a stack inteira; remover **com os dados** também remove os segredos gerados, porque não sobra nada para eles abrirem.

## 2. Usar o catálogo num painel compatível com o CasaOS

Adicione esta URL como loja de apps:

```text
https://github.com/roqueribeiro/roqueos-containers-list/archive/refs/heads/main.zip
```

Os manifestos usam o namespace `x-casaos`, que os clientes CasaOS leem como está. As extensões do RoqueOS em `x-roqueos` são ignoradas lá. Uma consequência: um cliente que não gera segredos deixa as variáveis `${NAME}` vazias, então os apps que declaram `x-roqueos.gerar` precisam desses valores preenchidos à mão antes de subir.

## 3. Trabalhar no catálogo

Você precisa do Node 24 (a versão do [`.nvmrc`](../../.nvmrc)) e do Yarn. **Só Yarn**: não existe `package-lock.json`, e `npm` ou `npx` não são usados.

```bash
git clone https://github.com/roqueribeiro/roqueos-containers-list.git
cd roqueos-containers-list
yarn install
```

As checagens em que um pull request precisa passar, na ordem em que o CI roda:

```bash
yarn validate      # todo manifesto contra o schema
yarn revisao       # as dez premissas, app a app
yarn test          # testes unitários das ferramentas
yarn docs:check    # números, links e pares de idioma da documentação
```

Para ver o veredito de um app só, com o motivo de cada premissa aberta:

```bash
yarn revisao:app Jellyfin
```

### O teste de boot, só no Linux

```bash
yarn boot Jellyfin
```

Ele sobe o compose numa pasta descartável, espera, checa que nenhum serviço reinicia e chama a porta que a ficha da loja promete. Ele **se recusa a rodar no macOS**: o Docker Desktop compartilha pastas com permissões frouxas, e um app que reinicia para sempre num servidor Linux de verdade sobe normalmente lá. Os pull requests que mexem num manifesto rodam o teste num runner Linux do GitHub, e essa execução é a evidência.

Próximos passos: [ADICIONAR-UM-APP.md](ADICIONAR-UM-APP.md) para enviar um app, [CRITERIOS-DE-TESTE.md](CRITERIOS-DE-TESTE.md) para o que cada checagem prova.
