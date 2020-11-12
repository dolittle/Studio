# Backend Build
FROM node:14.2.0 AS backend-build

WORKDIR /app

COPY .eslintrc.js ./
COPY tsconfig.json ./
COPY package.json ./

COPY Source/Shared/Backend/package.json ./Source/Shared/Backend/package.json
COPY Source/Shared/DependencyInversion/package.json ./Source/Shared/DependencyInversion/package.json

WORKDIR /app/Source/Events/Backend
COPY Source/Events/Backend/package.json ./package.json
RUN yarn

COPY Source/Shared/Backend/ /app/Source/Shared/Backend/
COPY Source/Shared/DependencyInversion/ /app/Source/Shared/DependencyInversion/
COPY Source/Events/Backend/ ./

RUN yarn build

# Web Build
FROM node:14.2.0 AS web-build
WORKDIR /app

COPY .eslintrc.js ./
COPY tsconfig.json ./
COPY package.json ./

COPY Source/Shared/Components/package.json ./Source/Shared/Components/package.json
COPY Source/Shared/DependencyInversion/package.json ./Source/Shared/DependencyInversion/package.json
COPY Source/Shared/MVVM/package.json ./Source/Shared/MVVM/package.json
COPY Source/Shared/Platform/package.json ./Source/Shared/Platform/package.json
COPY Source/Shared/Portal/package.json ./Source/Shared/Portal/package.json
COPY Source/Shared/Styles/package.json ./Source/Shared/Styles/package.json
COPY Source/Shared/Web/package.json ./Source/Shared/Web/package.json
COPY Source/Shared/WebPack/package.json ./Source/Shared/WebPack/package.json
COPY Source/Events/Web/package.json ./Source/Events/Web/package.json

WORKDIR /app/Source/Events/Web
RUN yarn

COPY Source/Events/version.json /app/Source/Events
COPY Source/Shared/Components /app/Source/Shared/Components/
COPY Source/Shared/DependencyInversion /app/Source/Shared/DependencyInversion/
COPY Source/Shared/MVVM /app/Source/Shared/MVVM/
COPY Source/Shared/Platform /app/Source/Shared/Platform/
COPY Source/Shared/Portal /app/Source/Shared/Portal/
COPY Source/Shared/Styles /app/Source/Shared/Styles/
COPY Source/Shared/Web /app/Source/Shared/Web/
COPY Source/Shared/WebPack /app/Source/Shared/WebPack/
COPY Source/Events/Web ./
RUN yarn build

# Resulting Image
FROM node:14.2.0-slim as base
ARG CONFIGURATION=Release

RUN echo Configuration = $CONFIGURATION

WORKDIR /app
COPY --from=backend-build /app/Source/Events/Backend/dist ./
COPY --from=backend-build /app/node_modules ./node_modules
COPY --from=web-build /app/Source/Events/Web/wwwroot ./Events/Backend/public

ENTRYPOINT ["node", "Events/Backend/index.js"]