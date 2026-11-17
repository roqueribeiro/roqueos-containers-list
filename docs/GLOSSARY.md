# Glossary

*Also available in [Brazilian Portuguese](pt-BR/GLOSSARIO.md).*

| Term | Meaning |
| --- | --- |
| **App** | a folder under `Apps/`: a manifest, an icon and a store card |
| **Manifest** | the app's `docker-compose.yml`, with metadata under `x-casaos` and `x-roqueos` |
| **Store card** | the app's page in the store, and the `README.md` generated from the manifest by `yarn readme` |
| **Principal service** | the service named in `x-casaos.main`: the one the store opens and labels as the app |
| **Seed** | a service with `restart: 'no'` that writes a first configuration into an empty folder and exits; the app waits for it with `service_completed_successfully` |
| **Stack** | every service of one manifest, installed and removed together |
| **System variable** | `$AppID`, `$PUID`, `$PGID` or `$TZ`, replaced by the installer |
| **Generated secret** | a value declared in `x-roqueos.gerar` and created per install by the RoqueOS server, never written in the repository |
| **Image default login** | a login the image creates on its own and no variable can change; declared in `x-roqueos.senhaPadraoDaImagem` and shown on the card |
| **Premise** | one of the ten checks of `yarn revisao`, P1 to P10 ([TESTING.md](TESTING.md)) |
| **Closed / open** | a premise that passes / fails for an app; the CI fails while any is open |
| **Boot test** | `yarn boot`: starting the app on Linux and checking that it stays up and answers |
| **Inconclusive** | a boot that could not decide for a reason of the lab (no GPU, a registry limit), reported apart from a failure |
| **Bind mount** | a host folder mounted into the container; here under `/DATA/AppData/$AppID/`, apart from the system mounts P4 allows and the paths justified in `x-roqueos.motivo.volumeHost` |
| **Pinned image** | an image referenced by an exact tag or a `sha256` digest, never `:latest` |
| **Retired** | an app that left the store for good ([RETIRED.md](RETIRED.md)) |
| **Out of the store until it comes back** | an app removed until a named fix is done |
| **CasaOS** | the home server system whose app store format (`x-casaos`) this catalog keeps compatible |
| **RoqueOS server** | `roqueos-server`, the self-hosted backend that reads this catalog and installs apps |
