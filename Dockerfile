ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-slim as base

WORKDIR /withmongo

ENV NODE_ENV production

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3

# Install node modules
COPY --link package-lock.json package.json ./
RUN npm ci


# Copying all the files in our project
COPY . .

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /withmongo /withmongo

# Starting our application
CMD [ "npm", "start" ]

# Exposing server port
EXPOSE 4040
