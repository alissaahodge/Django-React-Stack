#!/usr/bin/env sh
set -eu

envsubst '${DJANGO_PORT} ${REACT_PORT}' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/nginx.conf

exec "$@"
