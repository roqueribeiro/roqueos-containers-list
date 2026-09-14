# Virtual Machine Manager

> Uma interface de usuário da Web GTK Broadway para libvirt e virt-manager.

## O que é

Uma interface de usuário da Web GTK Broadway para libvirt e virt-manager, para executar máquinas virtuais usando QEMU/KVM.

Categoria na App Store do RoqueOS: **Utilities**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve | Serviço      |
| ---- | --------- | --------- | -------------- | ------------ |
| 8185 | 80        | tcp       | GUI HTTP port  | virt-manager |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                       | No container                  | Serviço      |
| ----------------------------- | ----------------------------- | ------------ |
| /var/run/libvirt/libvirt-sock | /var/run/libvirt/libvirt-sock | virt-manager |
| /var/lib/libvirt              | /var/lib/libvirt              | virt-manager |
| /DATA/Downloads               | /DATA/Downloads               | virt-manager |

## Variáveis de ambiente

| Variável  | Valor padrão       | Serviço      |
| --------- | ------------------ | ------------ |
| DARK_MODE | false              | virt-manager |
| HOSTS     | ['qemu:///system'] | virt-manager |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8185/`.

- # PLEASE READ WELL!
- ## Installing Necessary Dependencies on Host
- To make sure that everything works, you should first install ``qemu`` and ``libvirt`` on your system for the Virtual Machine Manager application to work, because otherwise it doesn't and won't be able to connect to the QEMU/KVM connection (this always applies if you have left HOST at the default).
- Ubuntu/Debian/Raspberry Pi OS:
- ```
- sudo apt update
- sudo apt install -y qemu-kvm libvirt-daemon-system libvirt-clients
- ```
- Alpine Linux:
- ```
- sudo apk update
- sudo apk add qemu libvirt qemu-img
- sudo rc-update add libvirtd default
- sudo systemctl enable --now libvirtd
- ```
- OpenWrt (compile from source):
- ```
- # Install necessary packages to compile from source
- sudo opkg update
- sudo opkg install build-essential libtool automake autoconf pkg-config libudev-dev libnl-tiny-dev glib2-dev libssl-dev
- # Clone QEMU and libvirt repositories
- git clone https://github.com/qemu/qemu.git
- git clone https://github.com/libvirt/libvirt.git
- # Build and install QEMU
- cd qemu
- ./configure
- make -j$(nproc)
- sudo make install
- # Build and install libvirt
- cd ../libvirt
- ./autogen.sh
- ./configure
- make -j$(nproc)
- sudo make install
- ```
- Arch Linux:
- ```
- sudo pacman -S --noconfirm qemu libvirt virt-manager
- sudo systemctl enable --now libvirtd
- ```
- ## Setting up Directories (for ISO Images, Hard Disk Images etc.)
- In order to set up directories and volumes for storing and accessing things (ISO and hard disk images for example), you can go to the panel for Virtual Machine Manager, right click on the 'QEMU/KVM' text at the homepage of Virtual Machine Manager and click on on 'Details'. From there, go to 'Storage' and click on the green plus icon. From there, you can choose a pool name and use 'Target Path' to choose the desired directory. E.g. for ISO images you can choose /DATA/Downloads (mounted on container at default) as directory to store ISO images. Then create it, and you're good to go! You can do the same if you'd want to store the hard disk images on another location or another drive (a volume/mount first needs to be configured with the settings of the Docker container of Virtual Machine Manager) and make sure to point it to the same path as on the host, in order to resolve conflicts when connecting to the server remotely! Also, if you desire you could also choose the ISO images manually from a path later on, but it has to be on the drive that the server uses and mounted.
- ## Troubleshooting
- ### No Connection Found
- Just go to 'File' > 'Add Connection...'. Make sure that the hypervisor is on QEMU/KVM and do NOT check the SSH option. I'd recommend to leave the automatic connection option turned on, and click 'Connect'. It should then be fixed!

## Imagens

| Serviço      | Imagem                    |
| ------------ | ------------------------- |
| virt-manager | mber5/virt-manager:latest |

## Fonte oficial

Projeto original: **Red Hat**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
