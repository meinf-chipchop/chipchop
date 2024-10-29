# ChipChop

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
- https://chipchop.mooo.com/api/ _(HTTPS)_

## Default User Admin:

Email: admin@chipchop.es

Passwd: admin
