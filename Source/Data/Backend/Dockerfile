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

COPY Source/Data/microservice.json /app/Source/Data/microservice.json

# Backend Build
FROM node:14.2.0 AS backend-build

WORKDIR /app

COPY --from=shared-build /app/ ./

WORKDIR /app/Source/Data/Backend
COPY Source/Data/Backend/package.json ./package.json
RUN yarn

COPY Source/Shared /app/Source/Shared/
COPY Source/Data/Backend/ ./

RUN yarn build

# Web Build
FROM node:14.2.0 AS web-build
WORKDIR /app

COPY --from=shared-build /app/ ./

WORKDIR /app/Source/Data/Web
COPY Source/Data/Web/package.json ./package.json
RUN yarn

COPY Source/Shared /app/Source/Shared/
COPY Source/Data/Web ./
RUN yarn build

# Resulting Image
FROM node:14.2.0-slim as base
ARG CONFIGURATION=Release

RUN echo Configuration = $CONFIGURATION

WORKDIR /app
COPY --from=backend-build /app/Source/Data/Backend/dist/index.js ./
COPY --from=backend-build /app/Source/Data/Backend/config.json ./
COPY --from=backend-build /app/node_modules/swagger-ui-dist/swagger-ui.css ./public/api/Data/swagger/
COPY --from=backend-build /app/node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js ./public/api/Data/swagger/
COPY --from=backend-build /app/node_modules/swagger-ui-dist/swagger-ui-bundle.js ./public/api/Data/swagger/
COPY --from=backend-build /app/node_modules/swagger-ui-dist/favicon-16x16.png ./public/api/Data/swagger/
COPY --from=backend-build /app/node_modules/swagger-ui-dist/favicon-32x32.png ./public/api/Data/swagger/
COPY --from=backend-build /app/Source/Data/Backend/swagger.json ./
COPY --from=web-build /app/Source/Data/Web/wwwroot ./public

ENTRYPOINT ["node", "index.js"]
