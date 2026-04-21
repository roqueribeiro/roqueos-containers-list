---
name: 📦 New app submission
about: Propose a new Docker app for the catalog (prefer opening a Pull Request directly)
title: "[New App] "
labels: ["new-app", "needs-triage"]
assignees: []
---

> **Prefer a Pull Request.** If you already have the manifest and assets ready, please open a PR instead of an issue. Use this template only when you want to check viability before spending effort.

## App name

<!-- Official name, as it should appear in the store. -->

## Upstream project

- Homepage:
- Source code:
- Docker image:

## License of the upstream project

<!-- Apache 2.0 / MIT / GPLv3 / proprietary etc. We only accept apps with licenses that allow redistribution. -->

## Category

<!-- See README: Media / Storage / Utilities / Network / Development / Home Automation / Security / AI / Monitoring / Gaming / Communication / Finance / Backup / Other -->

## Why it belongs in the RoqueOS catalog

<!-- What does this app do, and who is it useful for? -->

## Checklist before submitting a PR

- [ ] I have permission from the upstream project to redistribute their image (or the image is public + license-compatible).
- [ ] I have prepared `docker-compose.yml` with valid `x-casaos` metadata.
- [ ] I have prepared `icon.png` at 192×192 (transparent PNG).
- [ ] I have prepared at least one screenshot at 1280×720 (`screenshot-1.png`).
- [ ] I have tested the manifest locally on RoqueOS Server or CasaOS and it installs cleanly.

## Additional context

<!-- Anything else relevant (known issues, required environment variables, hardware requirements). -->
