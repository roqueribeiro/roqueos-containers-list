<div align="center">

# 🐳 RoqueOS Containers List

[![GitHub release](https://img.shields.io/github/v/release/roqueribeiro/roqueos-containers-list?style=for-the-badge&logo=github)](https://github.com/roqueribeiro/roqueos-containers-list/releases)
[![Apps](https://img.shields.io/badge/Apps-155+-blue?style=for-the-badge&logo=docker)](Apps/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![CasaOS Compatible](https://img.shields.io/badge/CasaOS-Compatible-orange?style=for-the-badge)](https://casaos.io)

**The Official App Store for RoqueOS**

A curated collection of 155+ Docker applications ready to deploy with one click.
<br>Compatible with CasaOS and other Docker-based home server platforms.

[📦 Browse Apps](#-available-categories) · [🚀 Quick Start](#-quick-start) · [➕ Add Apps](#-contributing) · [📖 Docs](#-documentation)

</div>

---

## ✨ Features

- **155+ Pre-configured Apps** — Media servers, development tools, home automation, and more
- **One-Click Install** — Deploy apps instantly through the RoqueOS dashboard
- **CasaOS Compatible** — Uses the same format as CasaOS AppStore
- **Auto-Updates** — GitHub Actions automatically builds and releases new versions
- **Community Driven** — Open source and accepting contributions

---

## 🚀 Quick Start

### Option 1: Use with RoqueOS

1. Open your **RoqueOS Dashboard**
2. Go to **Settings** → **Server** → **App Stores**
3. Click **Add Source** and paste:

```
https://github.com/roqueribeiro/roqueos-containers-list/releases/latest/download/appstore.zip
```

4. Click **Add** — Done! Browse and install apps from the App Store.

### Option 2: Use with CasaOS

This repository is fully compatible with CasaOS v0.4.4+. Add it as a third-party app store using the same URL above.

### Option 3: Manual Docker Compose

Each app in the `Apps/` directory contains a standalone `docker-compose.yml` that you can use directly:

```bash
# Clone the repository
git clone https://github.com/roqueribeiro/roqueos-containers-list.git

# Navigate to an app
cd roqueos-containers-list/Apps/Portainer

# Deploy with Docker Compose
docker-compose up -d
```

---

## 📂 Repository Structure

```
roqueos-containers-list/
├── 📁 Apps/                        # All applications (155+)
│   └── 📁 AppName/
│       ├── 📄 docker-compose.yml   # Docker Compose with x-casaos metadata
│       ├── 🖼️ icon.png             # App icon (192x192 transparent PNG)
│       ├── 🖼️ screenshot-*.png     # Screenshots (1280x720)
│       └── 🖼️ thumbnail.png        # Featured thumbnail (784x442, optional)
│
├── 📄 category-list.json           # Category definitions
├── 📄 recommend-list.json          # Recommended apps list
├── 📄 featured-apps.json           # Featured apps for homepage
├── 📄 CONTRIBUTING.md              # Contribution guidelines
└── 📄 README.md                    # This file
```

---

## 📦 Available Categories

| Category | Description | Examples |
|----------|-------------|----------|
| 🎬 **Media** | Media servers, streaming, music | Jellyfin, Plex, Navidrome |
| 💾 **Storage** | File sync, backup, cloud storage | Nextcloud, Syncthing, FileBrowser |
| 🔧 **Utilities** | System tools, management | Portainer, Heimdall, Watchtower |
| 🌐 **Network** | VPN, DNS, reverse proxy | Pi-hole, WireGuard, Nginx Proxy Manager |
| 💻 **Development** | IDEs, databases, dev tools | Code-Server, GitLab, PostgreSQL |
| 🏠 **Home Automation** | Smart home, IoT | Home Assistant, Node-RED, Zigbee2MQTT |
| 🔒 **Security** | Password managers, auth | Vaultwarden, Authelia, CrowdSec |
| 🤖 **AI** | Machine learning, AI tools | Stable Diffusion, Ollama, LocalAI |
| 📊 **Monitoring** | Dashboards, metrics, logs | Grafana, Prometheus, Uptime Kuma |
| 🎮 **Gaming** | Game servers, tools | Minecraft, Valheim, Steam |
| 💬 **Communication** | Chat, email, collaboration | Matrix, Mattermost, Mailcow |
| 💰 **Finance** | Budgeting, crypto | Firefly III, Actual Budget |
| 📥 **Backup** | Backup solutions | Duplicati, Restic, Borg |
| 📦 **Other** | Miscellaneous apps | Various utilities |

---

## 🛠️ Contributing

We welcome contributions! To add a new app:

### Requirements

Each app must include:

| File | Required | Description |
|------|----------|-------------|
| `docker-compose.yml` | ✅ Yes | Docker Compose with `x-casaos` metadata |
| `icon.png` | ✅ Yes | 192x192 transparent PNG |
| `screenshot-1.png` | ✅ Yes | At least one screenshot (1280x720) |
| `thumbnail.png` | ❌ Optional | For featured apps (784x442) |

### Quick Guide

1. **Fork** this repository
2. **Create** a new folder under `Apps/YourAppName/`
3. **Add** the required files
4. **Test** on your RoqueOS/CasaOS instance
5. **Submit** a Pull Request

📖 See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions and the `docker-compose.yml` format.

---

## 🔗 Compatible Third-Party Stores

RoqueOS supports importing other CasaOS-compatible app stores:

| Store | Maintainer | URL |
|-------|------------|-----|
| **CasaOS Official** | IceWhaleTech | `https://github.com/IceWhaleTech/CasaOS-AppStore/archive/refs/heads/main.zip` |
| **LinuxServer** | WisdomSky | `https://casaos-appstore.paodayag.dev/linuxserver.zip` |
| **Big Bear** | BigBearTechWorld | `https://github.com/bigbeartechworld/big-bear-casaos/archive/refs/heads/master.zip` |

---

## 📖 Documentation

- [🐳 RoqueOS Server on Docker Hub](https://hub.docker.com/r/roqueribeiro1988/roqueos-server)
- [📚 CasaOS App Format Documentation](https://github.com/IceWhaleTech/CasaOS-AppStore/blob/main/CONTRIBUTING.md)
- [🏠 CasaOS Official Website](https://casaos.io)

---

## 🙏 Acknowledgments

This repository is based on the excellent work of:

- [IceWhaleTech/CasaOS-AppStore](https://github.com/IceWhaleTech/CasaOS-AppStore) — Original CasaOS App Store
- [LinuxServer.io](https://www.linuxserver.io/) — High-quality Docker images
- The open-source community for maintaining these amazing applications

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ for the self-hosting community**

[⬆ Back to Top](#-roqueos-containers-list)

</div>
