# RoqueOS Containers List

CasaOS-compatible Docker app catalog. **155+ apps** packaged as one directory each; `roqueos-server` fetches the released zip to populate the App Store shown in the frontend.

This repo has no build, no tests, no runtime. It's data. Ecosystem map: `../CLAUDE.md`.

## Commands

- None. Edit the JSON/YAML under `Apps/` and open a PR — GitHub Actions (`.github/workflows/`) builds the release zip on merge.

## Layout

```
Apps/
  <AppName>/
    appfile.json        # metadata: category, ports, env, description, icon refs
    docker-compose.yml  # service definition (CasaOS-compat schema)
    icon.png            # square icon shown in the store
    thumbnail.png       # card thumbnail
    screenshot-N.png    # gallery
category-list.json     # category metadata + display order
featured-apps.json     # hero carousel on the store homepage
recommend-list.json    # curated recommendations block
```

## Adding a new app

1. Copy an existing `Apps/<similar-app>/` as a starter — the shape is the schema (there's no formal JSON Schema file).
2. Replace `docker-compose.yml`, `appfile.json`, icon, thumbnail, screenshots.
3. Pick a category that exists in `category-list.json`; if none fits, add a new category there first.
4. If the app should be featured, append the ID to `featured-apps.json`.
5. PR → merge → release workflow emits `appstore.zip` as a GitHub Release asset.

## Conventions

- **App directory name = app ID**. Keep it PascalCase without spaces; it's used as the stable identifier by consumers.
- Don't hardcode host ports in `docker-compose.yml` — use environment variables (`${APP_PORT:-8080}`) so the server can assign free ports at install time.
- Icons: PNG, square, 256×256+ recommended. Transparent background.
- Never commit images over ~500KB — compress first; the release zip is downloaded by every user's server.

## Consumers

- **`../roqueos-server`** — fetches the released zip, unpacks, serves the catalog. Schema changes here ripple there.
- **CasaOS v0.4.4+** — third-party store compatibility is a guarantee. Any change to `appfile.json` or `docker-compose.yml` shape must stay backwards-compatible with CasaOS or coordinate a bumped version.

## Security

- `docker-compose.yml` files run on users' machines. Never include:
  - Volumes that mount `/`, `/var/run/docker.sock` (unless the app legitimately needs it and the description says so), or host home dirs without scoping.
  - Images from untrusted registries. Prefer official images or publisher-verified ones.
  - Default passwords — use environment variables the server fills at install time.

## Release

`.github/workflows/` triggers on push to `main` and tags. The release asset URL is consumed by the server config; don't rename it.
