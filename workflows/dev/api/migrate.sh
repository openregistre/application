#!/bin/bash
# ==============================================================================
# Database Migration
# ==============================================================================
# Enables required extensions and pushes schema using Drizzle
# ==============================================================================
set -e

echo "Running pre-migration (extensions)..."
cd /workspace/packages/tools
pnpm tsx ./src/functions/migration.ts

echo "Running database schema push..."
pnpm drizzle-kit push --config=./src/drizzle.config.ts --force
echo "Database migrations complete"
