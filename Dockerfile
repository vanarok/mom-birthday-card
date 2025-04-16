# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.2.9
FROM oven/bun:${BUN_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential pkg-config python-is-python3

# Install node modules
COPY bun.lock package-lock.json package.json ./
RUN bun install --include=dev

# Copy application code
COPY . .

# Build application
RUN bun run build

# Final stage for app image
FROM nginx:latest

# Copy built application
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/script.js /usr/share/nginx/html/script.js

# Start the server by default, this can be overwritten at runtime
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
