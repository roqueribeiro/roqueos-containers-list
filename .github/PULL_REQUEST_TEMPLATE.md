<!--
Thanks for contributing to the RoqueOS Containers List!
Please fill out the sections below so maintainers can review your PR quickly.
-->

## Type of change

- [ ] 📦 New app (`Apps/NewApp/`)
- [ ] 🔧 Fix or update existing app manifest
- [ ] 🖼️ Update assets (icon, screenshots, thumbnail)
- [ ] 📄 Documentation / tooling change
- [ ] 🤖 CI / release workflow change

## Affected app(s)

<!-- e.g. Apps/Jellyfin -->

## Summary

<!-- One short paragraph: what changed and why. -->

## Checklist

### For new / updated app submissions

- [ ] Folder name matches the app's canonical name (PascalCase, no spaces).
- [ ] `docker-compose.yml` includes valid `x-casaos` metadata (title, main, icon, tagline, category, developer, author, port_map).
- [ ] `icon.png` is 192×192, transparent PNG.
- [ ] At least one `screenshot-1.png` exists, ~1280×720 (no logos/watermarks).
- [ ] App boots cleanly on my local RoqueOS Server or CasaOS install.
- [ ] I have verified the upstream image exists on Docker Hub / GHCR and the tag I pinned is stable.
- [ ] Environment variables and volumes use safe, documented defaults (no hardcoded secrets, no privileged mode unless strictly required).
- [ ] I have the right to redistribute this app (license-compatible or explicit permission).

### For all PRs

- [ ] Title follows `Conventional Commits` style (`feat(apps): add Jellyfin`, `fix(jellyfin): pin 10.9.0`, etc.).
- [ ] No binary files unrelated to the app (no `.DS_Store`, `.idea/`, etc.).
- [ ] CI is passing (GitHub Actions build + validation).

## Testing

<!-- How did you test the change? Include commands, screenshots, or videos where helpful. -->

## Additional notes

<!-- Links to upstream issues, breaking changes, migration notes. -->

---

By submitting this PR I confirm that:

- My contribution is released under the project's **MIT License**.
- I have read the [Code of Conduct](../CODE_OF_CONDUCT.md) and [Trademark Policy](../TRADEMARK.md).
- I am not granting, and will not claim, any right to use the **RoqueOS** or **LEVELHARD** trademarks beyond what is allowed in `TRADEMARK.md`.
