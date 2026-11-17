# Getting started

*Also available in [Brazilian Portuguese](pt-BR/COMECAR.md).*

There are three ways to use this catalog: install apps from it in RoqueOS, add it to a CasaOS-compatible dashboard, or work on it.

## 1. Install an app in RoqueOS

The catalog is the default store of the RoqueOS App Store, so there is nothing to configure. You need a RoqueOS server connected to the web interface (Server Mode).

1. Open **Containers** and go to the store.
2. Pick an app. Its card shows what it does, the ports, the folders it keeps and, when the image ships with a login of its own, that login.
3. Press **Install**. The server deploys every service of the manifest as one stack: the app, its database, its cache, and any seed that writes the first configuration.
4. When the app has a login password, RoqueOS generates it for your server and shows it **once**, in a notice with a copy button. Save it: it is not shown again.
5. The app appears under **Installed** and opens from the Launchpad.

Data stays under `/DATA/AppData/<app>/` on the server. Removing the app removes the whole stack; removing it **with data** also removes the generated secrets, because there is nothing left for them to open.

## 2. Use the catalog from a CasaOS-compatible dashboard

Add this URL as an app store:

```text
https://github.com/roqueribeiro/roqueos-containers-list/archive/refs/heads/main.zip
```

The manifests use the `x-casaos` namespace, which CasaOS clients read as is. The RoqueOS extensions under `x-roqueos` are ignored there. One consequence: a client that does not generate secrets leaves `${NAME}` variables empty, so apps that declare `x-roqueos.gerar` need those values filled in by hand before they start.

## 3. Work on the catalog

You need Node 24 (the version in [`.nvmrc`](../.nvmrc)) and Yarn. **Yarn only**: there is no `package-lock.json`, and `npm` or `npx` are not used.

```bash
git clone https://github.com/roqueribeiro/roqueos-containers-list.git
cd roqueos-containers-list
yarn install
```

The checks a pull request has to pass, in the order the CI runs them:

```bash
yarn validate      # every manifest against the schema
yarn revisao       # the ten premises, app by app
yarn test          # unit tests of the tooling
yarn docs:check    # numbers, links and language pairs of the documentation
```

To see the verdict of one app, with the reason for each open premise:

```bash
yarn revisao:app Jellyfin
```

### The boot test, on Linux only

```bash
yarn boot Jellyfin
```

It starts the compose in a throwaway folder, waits, checks that no service restarts and calls the port the store card promises. It **refuses to run on macOS**: Docker Desktop shares folders with loose permissions, and an app that restarts forever on a real Linux server starts normally there. Pull requests that touch a manifest run it on a GitHub Linux runner, and that run is the evidence.

Next: [ADDING-AN-APP.md](ADDING-AN-APP.md) to submit an app, [TESTING.md](TESTING.md) for what each check proves.
