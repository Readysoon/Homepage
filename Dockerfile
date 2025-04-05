# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.16.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="NodeJS"

# NodeJS app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ARG YARN_VERSION=1.22.22
RUN npm install -g yarn@$YARN_VERSION --force


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential 

# Install node modules
COPY --link package.json yarn.lock ./
RUN yarn install --production=false

# Install the missing plugin explicitly
RUN yarn add gatsby-remark-code-titles

# Copy application code
COPY --link . .

# Build application with legacy OpenSSL provider
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN yarn run build

# Remove development dependencies
RUN yarn install --production=true


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Add gatsby-cli for serving
RUN yarn add gatsby-cli

# Start the server on port 8080 (important for Fly.io)
CMD ["yarn", "run", "gatsby", "serve", "-H", "0.0.0.0", "-p", "8080"]
