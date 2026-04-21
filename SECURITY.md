# Security Policy

## Reporting a Vulnerability

If you believe you have found a security issue in **RoqueOS Containers List** — the catalog itself, a malicious/compromised Docker image referenced by a manifest, or an issue that affects downstream consumers (RoqueOS Server, CasaOS users) — please report it privately.

**Email:** security@levelhard.com.br

Please include:

1. A description of the issue and its impact.
2. Steps to reproduce.
3. Affected app folder (e.g. `Apps/SomeApp/`) or file, when applicable.
4. Your preferred credit handle (or indicate that you prefer to remain anonymous).

We aim to:

- Acknowledge your report within **72 hours**.
- Provide an initial assessment within **7 calendar days**.
- Coordinate public disclosure within **90 days** (may be extended by mutual agreement for complex issues).

## Scope

In scope:

- Manifests (`docker-compose.yml` / `x-casaos` metadata) that point to known-malicious images.
- Manifests that expose unsafe defaults (public ports, no auth, privileged mode when not strictly needed).
- Supply-chain issues in the GitHub Actions pipeline (`.github/workflows/`).
- Issues that let a third party publish spoofed releases under the project's name.

Out of scope:

- Vulnerabilities in upstream projects (report those to the upstream maintainers directly).
- Misconfiguration of the user's own server or network.
- Social-engineering attacks not targeting the project infrastructure.

## Supported versions

Only the **latest release** (`main` branch + the latest GitHub Release) receives fixes. Older releases are archival and will not be patched.

## Trademark

Reporting a security issue does **not** grant any right to use the RoqueOS or LEVELHARD trademarks. See [TRADEMARK.md](TRADEMARK.md).

## Acknowledgments

Thank you to everyone who responsibly discloses issues. Credited researchers will be listed at <https://roqueos.com.br/security/hall-of-fame> (opt-in).
