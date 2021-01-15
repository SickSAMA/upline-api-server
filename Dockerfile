# Stage 1: install dependencies and build app
FROM node:14.15.4-alpine AS build_image

WORKDIR /usr/src/app

COPY package*.json ./
# even NODE_DEV is set to production in docker-compose.yml,
# the RUN process does not has that, only CMD has.
RUN npm ci

# build app
COPY tsconfig.json ./
COPY src ./src/
RUN npm run build

# remove packages of devDepedencies
RUN npm ci --production

# Stage 2: copy minimal files to new base
FROM node:14.15.4-alpine

WORKDIR /usr/src/app

# copy from build image
COPY --from=build_image /usr/src/app/build ./build
COPY --from=build_image /usr/src/app/node_modules ./node_modules

## Use non-root user node come with node-alpine for security reasons
USER node

EXPOSE 5000

CMD [ "node", "build/index.js"]