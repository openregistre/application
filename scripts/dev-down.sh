#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE="./workflows/dev/compose.yml"
PROJECT="openregistre-application"

docker ps -a --filter="name=openregistre-" -q | xargs -r docker rm -f
docker compose \
    --project-directory="workflows/dev" \
    --file="$COMPOSE_FILE" \
    --project-name="$PROJECT" \
    down
