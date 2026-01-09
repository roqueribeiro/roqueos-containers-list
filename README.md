# RoqueOS Containers List

Official App Store for RoqueOS - A curated collection of Docker applications.

## 🔥 Introduction

This repository contains Docker Compose configurations for applications that can be installed on RoqueOS. It follows the CasaOS AppStore format for compatibility.

## 💎 AppStore URL

```
https://github.com/roqueribeiro/roqueos-containers-list/releases/latest/download/appstore.zip
```

## ✅ Installation

1. Go to your RoqueOS dashboard
2. Open the App Store and click **Add Source**
3. Paste the AppStore URL above
4. Click **Add** to submit

## 📁 Structure

```
roqueos-containers-list/
├── Apps/                       # All applications
│   └── AppName/
│       ├── docker-compose.yml  # Docker Compose with x-casaos metadata
│       ├── icon.png            # App icon (192x192)
│       └── screenshot-*.png    # Screenshots (1280x720)
├── category-list.json          # Category definitions
├── recommend-list.json         # Recommended apps
└── featured-apps.json          # Featured apps
```

## 🛠 Adding Apps

Each app must have:
- `docker-compose.yml` with `x-casaos` metadata
- `icon.png` (192x192 transparent PNG)
- At least one screenshot

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📦 Compatible Third-Party Stores

RoqueOS supports importing other CasaOS-compatible app stores:

| Store | URL |
|-------|-----|
| CasaOS Official | `https://github.com/IceWhaleTech/CasaOS-AppStore/archive/refs/heads/main.zip` |
| LinuxServer | `https://casaos-appstore.paodayag.dev/linuxserver.zip` |

## 📄 License

MIT License
