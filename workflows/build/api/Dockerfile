# ==============================================================================
# API Production Dockerfile
# ==============================================================================
# Multi-stage build: install deps, compile TypeScript, then run compiled JS
# ==============================================================================

FROM node:22-alpine AS base
RUN npm i -g pnpm@latest

ENV NODE_OPTIONS="--max-old-space-size=4096"

# Install stage - install dependencies
FROM base AS install
WORKDIR /root
COPY . .

RUN CI=true pnpm install --no-frozen-lockfile

# Build stage - compile TypeScript
FROM install AS build
WORKDIR /root/packages/api
RUN pnpm build

# Deploy stage
FROM base AS deploy

ARG VERSION=0.0.0-unknown
ENV VERSION=$VERSION

WORKDIR /root

# Copy workspace structure with node_modules (includes workspace symlinks)
COPY --from=install /root/node_modules ./node_modules
COPY --from=install /root/package.json ./package.json
COPY --from=install /root/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Copy API package with compiled output and resolved dependencies
COPY --from=install /root/packages/api/node_modules ./packages/api/node_modules
COPY --from=install /root/packages/api/package.json ./packages/api/package.json
COPY --from=build /root/packages/api/build ./packages/api/build

# Copy metadata package compiled output and resolved dependencies
COPY --from=install /root/packages/metadata/node_modules ./packages/metadata/node_modules
COPY --from=install /root/packages/metadata/package.json ./packages/metadata/package.json
COPY --from=build /root/packages/metadata/build ./packages/metadata/build

WORKDIR /root/packages/api
CMD ["pnpm", "start"]
