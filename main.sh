#!/bin/bash

sudo ./caddy/caddy_linux_amd64 start --config caddy/Caddyfile
npm run start
