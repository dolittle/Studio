FROM node:14.2.0 AS shared-build

WORKDIR /app

COPY .eslintrc.js ./
COPY tsconfig.json ./
COPY package.json ./

COPY Source/Shared/Backend/package.json ./Source/Shared/Backend/package.json
COPY Source/Shared/Components/package.json ./Source/Shared/Components/package.json
COPY Source/Shared/DependencyInversion/package.json ./Source/Shared/DependencyInversion/package.json
COPY Source/Shared/MVVM/package.json ./Source/Shared/MVVM/package.json
COPY Source/Shared/Platform/package.json ./Source/Shared/Platform/package.json
COPY Source/Shared/Portal/package.json ./Source/Shared/Portal/package.json
COPY Source/Shared/Styles/package.json ./Source/Shared/Styles/package.json
COPY Source/Shared/Web/package.json ./Source/Shared/Web/package.json
COPY Source/Shared/WebPack/package.json ./Source/Shared/WebPack/package.json
RUN yarn

COPY Source/Events/version.json /app/Source/Events/version.json

# Backend Build
FROM node:14.2.0 AS backend-build

WORKDIR /app

COPY --from=shared-build /app/ ./

WORKDIR /app/Source/Events/Backend
COPY Source/Events/Backend/package.json ./package.json
RUN yarn

COPY Source/Shared /app/Source/Shared/
COPY Source/Events/Backend/ ./

RUN yarn build

# Web Build
FROM node:14.2.0 AS web-build
WORKDIR /app

COPY --from=shared-build /app/ ./

WORKDIR /app/Source/Events/Web
COPY Source/Events/Web/package.json ./package.json
RUN yarn

COPY Source/Shared /app/Source/Shared/
COPY Source/Events/Web ./
RUN yarn build

# Resulting Image
FROM node:14.2.0-slim as base
ARG CONFIGURATION=Release

RUN echo Configuration = $CONFIGURATION

WORKDIR /app
COPY --from=backend-build /app/Source/Events/Backend/dist/index.js ./
COPY --from=web-build /app/Source/Events/Web/wwwroot ./public

ENTRYPOINT ["node", "index.js"]