# When an app breaks

*Also available in [Brazilian Portuguese](pt-BR/QUANDO-QUEBRA.md).*

Each row is a failure that already happened in this catalog, what caused it, and what fixes it. Look up the symptom; the right column says which check now catches it.

## It does not start

| Symptom | Cause | Fix | Caught by |
| --- | --- | --- | --- |
| `Restarting (1)` forever, `permission denied` in the log | the image writes as a fixed user (Grafana is uid 472) into a folder the installer created as `root:root` | `PUID`/`PGID` when the image honors them, or a seed service that hands the folder to that user; a non-root `user:` does not help, the folder is still `root:root` | P10, boot |
| The container is never created: `error gathering device information` | a `devices:` entry the host does not have (`/dev/vchiq` exists only on a Raspberry Pi) | remove the device; explain the optional hardware step on the store card | boot |
| Exits at once, `config file not found` | the image needs a configuration and the installer hands it an empty folder | a seed service with `restart: 'no'` that writes the first configuration once, and `depends_on` with `condition: service_completed_successfully` | boot |
| The app starts before its database and gives up | no `depends_on`, or a plain list that waits only for the container to exist | `depends_on` with `condition: service_healthy` and a `healthcheck` on the database | boot |
| `pull access denied`, `manifest unknown`, `401` | the image was removed, moved or made private | pin a version the registry serves, or retire the app ([RETIRED.md](RETIRED.md)) | P4 (registry check), boot |
| Restarts on a server without a GPU | the manifest uses the CUDA image or a GPU runtime | the CPU variant of the image; a separate app for the GPU variant | boot (reported inconclusive on the runner) |
| `Restarting (137)` | out of memory | a lighter default, or a memory note on the store card | boot |

## It starts, but does not work

| Symptom | Cause | Fix | Caught by |
| --- | --- | --- | --- |
| **Open** in the store gives a TLS error | `scheme: https` on a port that speaks plain HTTP | `scheme: http`, or point `port_map` at the HTTPS port | boot |
| **Open** lands on nothing | `port_map` points at a port the principal service does not publish, or at a service that listens elsewhere | publish the port the app really listens on | schema, boot |
| Login refused right after install | a password with a different value in the app and in the database | one `x-roqueos.gerar` entry referenced by both | P3 |
| A variable arrives empty | a `$VAR` that is neither a system variable nor declared in `x-roqueos.gerar` | declare it in `gerar`, or use one of `$AppID`, `$PUID`, `$PGID`, `$TZ` | P3 |
| A URL with `[YOUR_IP]` inside | a placeholder the person was supposed to replace | derive it from the request, or ask on the screen; a placeholder is not accepted | P3 |
| A URL with `localhost` that only works on the server itself | the app needs the server's address and has no way to receive it yet | a known limit (Baserow, Healthchecks, Rallly) until the installer offers that variable | none yet |
| Two apps fight for the same port | both publish the same host port | change one of them, or declare `x-roqueos.portaCompartilhada` when the collision is known and accepted | P2 |
| Data lost after recreating the container | the volume is mounted on a path the image does not write | mount the path the image really uses (Forgejo rootful writes `/data`, not `/var/lib/gitea`) | review |

## On a CasaOS dashboard

| Symptom | Cause | Fix |
| --- | --- | --- |
| A password or key is empty | CasaOS does not read `x-roqueos.gerar` | fill the `${NAME}` variables by hand before the first start |
| No `/shared` folder | CasaOS ignores `x-roqueos.mountShared` | add the bind by hand if the app needs it |

## Reporting it

Open a **Broken app** issue with the app, the symptom, the output of `docker compose ps` and the last lines of the log. If it is a security problem (an exposed secret, an image that does something it should not), follow [SECURITY.md](../SECURITY.md) instead.
