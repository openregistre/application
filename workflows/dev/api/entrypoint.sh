#!/bin/bash
# ==============================================================================
# API Service Entrypoint
# ==============================================================================
# Runs on container startup to initialize and start the API service.
# ==============================================================================
set -e

SCRIPT_DIR="/dev-scripts/api"

# Install dependencies (bind-mounted from host, so node_modules persists)
cd /workspace && pnpm install --frozen-lockfile

# Build metadata (required since exports point to compiled output)
pnpm --filter @openregistre/metadata build

# Run setup tasks
$SCRIPT_DIR/migrate.sh
$SCRIPT_DIR/seed.sh

# Start the API server (exec replaces shell process)
exec $SCRIPT_DIR/start.sh
