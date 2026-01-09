# Contributing to RoqueOS Containers List

This document describes how to contribute an app to the RoqueOS App Store.

## App Structure

Each app must be in its own directory under `Apps/`:

```
Apps/
└── MyApp/
    ├── docker-compose.yml   # Required - Docker Compose with x-casaos metadata
    ├── icon.png             # Required - 192x192 transparent PNG
    ├── screenshot-1.png     # Required - At least one screenshot (1280x720)
    ├── screenshot-2.png     # Optional - Additional screenshots
    └── thumbnail.png        # Optional - For featured apps (784x442)
```

## docker-compose.yml Format

```yaml
name: myapp  # lowercase, alphanumeric with - and _
services:
  myapp:
    image: myimage:1.0.0  # Use specific version, NOT :latest
    ports:
      - target: 8080
        published: "8080"
        protocol: tcp
    volumes:
      - type: bind
        source: /DATA/AppData/$AppID/config
        target: /config
    environment:
      PUID: $PUID
      PGID: $PGID
      TZ: $TZ
    restart: unless-stopped
    
    # Service-level CasaOS metadata
    x-casaos:
      envs:
        - container: PUID
          description:
            en_us: User ID
      ports:
        - container: "8080"
          description:
            en_us: Web UI Port
      volumes:
        - container: /config
          description:
            en_us: Configuration directory

# App-level CasaOS metadata
x-casaos:
  architectures:
    - amd64
    - arm64
    - arm
  main: myapp
  author: Your Name
  category: Utilities
  description:
    en_us: Description of your application
  developer: Developer Name
  icon: https://cdn.jsdelivr.net/gh/roqueribeiro/roqueos-containers-list@main/Apps/MyApp/icon.png
  tagline:
    en_us: Short tagline for the app
  title:
    en_us: My App
  index: /
  port_map: "8080"
```

## Guidelines

1. **Use specific image tags** - Never use `:latest`
2. **Test thoroughly** - Ensure the app works on RoqueOS before submitting
3. **Provide good descriptions** - Help users understand what the app does
4. **Include screenshots** - Show the app running successfully
5. **Use system variables** - `$PUID`, `$PGID`, `$TZ`, `$AppID`

## Categories

Available categories:
- Utilities
- Media
- Network
- Development
- Home Automation
- Productivity
- Storage
- Security
- AI
- Gaming
- Communication
- Finance
- Monitoring
- Backup
- Other

## Submitting

1. Fork this repository
2. Add your app under `Apps/`
3. Test on your RoqueOS instance
4. Submit a Pull Request
