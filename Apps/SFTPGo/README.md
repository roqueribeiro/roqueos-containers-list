# SFTPGo

> Servidor SFTP/FTP/WebDAV/HTTP configurável com web admin

## O que é

SFTPGo é um servidor SFTP/FTP/FTPS/WebDAV/HTTP/S3 completo e altamente configurável com suporte opcional a HTTP/S, FTP/S e WebDAV. Pastas virtuais por usuário, cotas, limites de banda, rate limiting, autenticação multi-fator, geo-blocking, audit logs. Use como protocolo de acesso ao seu NAS home ou como servidor de artefatos para pipelines CI.

Categoria na App Store do RoqueOS: **Storage**.
Arquiteturas suportadas: amd64, arm64.

## Portas

| Host | Container | Protocolo | Para que serve                                     | Serviço |
| ---- | --------- | --------- | -------------------------------------------------- | ------- |
| 8102 | 8080      | tcp       | Porta da interface web (mapeada para 8102 no host) | sftpgo  |
| 2022 | 2022      | tcp       | Porta SFTP                                         | sftpgo  |
| 2121 | 2121      | tcp       | Porta FTP                                          | sftpgo  |
| 8103 | 8081      | tcp       | Porta WebDAV (mapeada para 8103 no host)           | sftpgo  |


## Volumes

Onde os dados deste app ficam no seu servidor.

| No host                     | No container    | Serviço |
| --------------------------- | --------------- | ------- |
| /DATA/AppData/$AppID/data   | /var/lib/sftpgo | sftpgo  |
| /DATA/AppData/$AppID/config | /etc/sftpgo     | sftpgo  |
| /DATA                       | /shared         | sftpgo  |

## Variáveis de ambiente

| Variável                                   | Valor padrão            | Serviço |
| ------------------------------------------ | ----------------------- | ------- |
| SFTPGO_DATA_PROVIDER__CREATE_DEFAULT_ADMIN | true                    | sftpgo  |
| SFTPGO_DEFAULT_ADMIN_USERNAME              | admin                   | sftpgo  |
| SFTPGO_DEFAULT_ADMIN_PASSWORD              | change-me-on-first-boot | sftpgo  |
| SFTPGO_HTTPD__BINDINGS__0__ADDRESS         | 0.0.0.0                 | sftpgo  |
| SFTPGO_HTTPD__BINDINGS__0__PORT            | 8080                    | sftpgo  |

## Primeiro acesso

Depois de instalar, abra `http://<endereço-do-servidor>:8102/`.

- SUBSTITUA SFTPGO_DEFAULT_ADMIN_PASSWORD antes do primeiro boot.
- Após boot, login em http://SEU_IP:8102 para criar usuários, pastas virtuais e configurar cotas.
- SFTP escuta na porta 2022 (use `sftp -P 2022 user@seu-host`); FTP em 2121; WebDAV em 8103.
- Para backend PostgreSQL/MySQL (vs SQLite padrão), configure SFTPGO_DATA_PROVIDER__DRIVER e variáveis relacionadas.

## Imagens

| Serviço | Imagem                        |
| ------- | ----------------------------- |
| sftpgo  | drakkan/sftpgo:v2.6.4-plugins |

## Fonte oficial

Projeto original: **drakkan**

---

_Ficha gerada de `docker-compose.yml` por `scripts/gera-readme.mjs`. Mudou o
manifesto, rode de novo: o que está aqui é o que o app de fato faz, não o que
alguém lembrou de escrever._
