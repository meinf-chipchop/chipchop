# ChipChop

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=meinf-chipchop_chipchop&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=meinf-chipchop_chipchop)
<a href="https://chipchop.mooo.com/login">
<img src="https://img.shields.io/website?url=https%3A%2F%2Fchipchop.mooo.com%2Flogin&label=Admin-Panel" alt="Website">
</a>

## How to run

First complete the all .env-template fields in a new .env file in the same directory

Everything is containerized with volumes mounted so by just running

`docker compose up --build`

NextJS and Backend should be on and ready to develop like normal

## Reverse Proxy

Everything is behind an Nginx reverse proxy

Some passthrough have been configured like

- `/` -> Wil redirect to admin-panel
- `/api/` -> Wil redirect to backend

## Production IPs:

- http://194.164.171.6
- https://chipchop.mooo.com _(HTTPS)_

## Default User Admin:

Email: admin@chipchop.es

Passwd: admin
