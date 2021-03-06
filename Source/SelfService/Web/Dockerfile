FROM node:14.2.0 AS shared-build

WORKDIR /app

COPY .eslintrc.js ./
COPY tsconfig.json ./
COPY package.json ./
COPY application.json ./

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

COPY Source/SelfService/microservice.json /app/Source/SelfService/microservice.json

# Web Build
FROM node:14.2.0 AS web-build
WORKDIR /app

COPY --from=shared-build /app/ ./

WORKDIR /app/Source/SelfService/Web
COPY Source/SelfService/Web/package.json ./package.json
RUN yarn

COPY Source/Shared /app/Source/Shared/
COPY Source/SelfService/Web ./
RUN yarn build

# Resulting Image
#FROM node:14.2.0-slim as base
FROM pierrezemb/gostatic as base
#ARG CONFIGURATION=Release
#RUN echo Configuration = $CONFIGURATION
WORKDIR /app
COPY --from=web-build /app/Source/SelfService/Web/wwwroot ./public

ENTRYPOINT ["/goStatic"]
