FROM node:14.2.0 AS shared-build

WORKDIR /app

COPY package.json ./
COPY .eslintrc.js ./
COPY tsconfig.json ./

COPY Source/Shared/Backend/package.json ./Source/Shared/Backend/package.json
COPY Source/Shared/Common/package.json ./Source/Shared/Common/package.json
COPY Source/Shared/Components/package.json ./Source/Shared/Components/package.json
COPY Source/Shared/k8s/package.json ./Source/Shared/k8s/package.json
COPY Source/Shared/Platform/package.json ./Source/Shared/Platform/package.json
COPY Source/Shared/Portal/package.json ./Source/Shared/Portal/package.json
COPY Source/Shared/Specs/package.json ./Source/Shared/Specs/package.json
COPY Source/Shared/Styles/package.json ./Source/Shared/Styles/package.json
COPY Source/Shared/Web/package.json ./Source/Shared/Web/package.json
RUN yarn

COPY Source/Deployables/microservice.json /app/Source/Deployables/microservice.json

# Backend Build
FROM node:14.2.0 AS backend-build

WORKDIR /app

COPY --from=shared-build /app/ ./

WORKDIR /app/Source/Deployables/Backend
COPY Source/Deployables/Backend/package.json ./package.json
RUN yarn

COPY Source/Shared /app/Source/Shared/
COPY Source/Deployables/Backend/ ./

RUN yarn build

# Web Build
FROM node:14.2.0 AS web-build

WORKDIR /app
COPY --from=shared-build /app/ ./

WORKDIR /app/Source/Deployables/Web
COPY Source/Deployables/Web/package.json ./package.json
RUN yarn

COPY Source/Shared /app/Source/Shared/
COPY Source/Deployables/Web ./
RUN yarn build

# Resulting Image
FROM node:14.2.0-slim as base
ARG CONFIGURATION=Release

RUN echo Configuration = $CONFIGURATION

WORKDIR /app
COPY --from=backend-build /app/Source/Deployables/Backend/dist/index.js ./
COPY --from=backend-build /app/Source/Deployables/Backend/vanir.json ./
COPY --from=web-build /app/Source/Deployables/Web/wwwroot ./public

ENTRYPOINT ["node", "index.js"]
