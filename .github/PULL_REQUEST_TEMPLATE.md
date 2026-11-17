<!--
Thanks for the contribution. Read CONTRIBUTING.md first.
For a security fix, do not open a pull request before a maintainer has answered
your private report (SECURITY.md).
-->

## What and why

<!-- What changes, and the reason. For a new app: what it is and why it belongs in the store. -->

## Apps touched

<!-- One per line, the folder name under Apps/. "none" for a tooling or documentation change. -->

## Type of change

- [ ] New app
- [ ] Fix to an app
- [ ] App removed (the reason and evidence are in docs/RETIRED.md and docs/pt-BR/APOSENTADOS.md)
- [ ] Tooling, schema or workflow
- [ ] Documentation only

## How it was tested

<!--
Paste the output, not a summary. Say on which architecture the app was started:
"yarn boot <App> on Ubuntu 24.04 amd64", "the Boot workflow of this pull request",
"installed from the RoqueOS store on a Raspberry Pi 5". Say what you did not test.
-->

## Checklist

- [ ] `yarn validate` passes.
- [ ] `yarn revisao:app <App>` closes the ten premises for every app touched.
- [ ] `yarn test` passes, and a tooling change comes with a test that fails without it.
- [ ] `yarn docs:check` passes.
- [ ] The image is pinned to an exact tag or digest, and `architectures` lists only what it publishes.
- [ ] No secret is written in the manifest: each one is in `x-roqueos.gerar`.
- [ ] `tagline` and `description` are in `en_us` and `pt_br`.
- [ ] The store card was regenerated with `yarn readme --app <App>`.
- [ ] `CHANGELOG.md` has an entry under `[Unreleased]`.
