# Security Policy

RoqueOS Containers List is the catalog the RoqueOS App Store installs from. A manifest here decides which image runs on someone's server, which ports it opens, which folders it reaches and with what privileges. A flaw in it can put every server that installs the app at risk, so we take reports seriously and prefer coordinated disclosure.

## Supported versions

Fixes land on `main`, which is what the RoqueOS store reads ([docs/HOW-IT-SHIPS.md](docs/HOW-IT-SHIPS.md)). Released `appstore.zip` files are frozen and are not patched: a dashboard pinned to one should move to the archive of `main` or to the next release.

| Version | Supported |
| --- | --- |
| `main` | yes |
| any published release | no |

## Reporting a vulnerability

**Do not open a public issue for a security report.**

Write to **security@levelhard.com.br**. Include, when you can:

- what the issue lets an attacker do, and from which position (anyone who reads the repository, a person on the same network as the server, a compromised image);
- the affected app folder (`Apps/<App>/`), file or workflow;
- a minimal reproduction;
- whether you want credit, and under what name.

## Scope

In scope:

- a manifest that points to a malicious, compromised or hijacked image;
- a secret written in a manifest (the same value on every install);
- an unsafe default: a database published on the host, an admin panel without a login, `privileged` or host networking without need, a host path outside `/DATA`;
- the workflows under `.github/workflows/` and the scripts under `scripts/` (supply chain, injection, a way to publish a release under the project's name);
- a way around a check, such as a secret pattern P3 does not see.

Out of scope:

- vulnerabilities in the upstream apps or images: report those to their maintainers (we retire or pin around them once there is a public advisory);
- the configuration of the person's own server or network;
- the RoqueOS server and front end: those have their own repositories and policies.

## How the catalog limits damage

- **Secrets are generated per install** (`x-roqueos.gerar`) and never written in the repository; P3 fails a manifest that writes one.
- **Images are pinned** to an exact tag or a digest, and P4 checks that the registry still serves them.
- **Elevated access needs a written reason** in `x-roqueos.motivo` (P5).
- **Data stays under `/DATA/`** (P4). A system mount (the Docker socket, `/dev/dri`) or any other host path is allowed only from a short list or with a reason in `x-roqueos.motivo.volumeHost`.
- **Every merge is reviewed** by a maintainer ([CODEOWNERS](.github/CODEOWNERS)).

The full list is in [docs/TESTING.md](docs/TESTING.md), with what is not covered yet.

## Our commitment

| Stage | Target |
| --- | --- |
| Acknowledgement | within 72 hours |
| Triage | within 7 days |
| Fix or mitigation | within 90 days, extendable by mutual agreement; an exposed secret or a malicious image is removed from `main` as soon as it is confirmed |
| Public disclosure | coordinated with you; by default 90 days after acknowledgement |

Unless you prefer otherwise, we credit you in the [CHANGELOG](CHANGELOG.md).

## Safe harbor

We will not pursue legal action against researchers who make a good-faith effort to follow this policy, test only against servers they own, avoid privacy violations, data destruction and service disruption, and give us a reasonable window before public disclosure. If in doubt, ask first.

## Trademark

Reporting a security issue does not grant any right to use the RoqueOS or LEVELHARD trademarks. See [TRADEMARK.md](TRADEMARK.md).
