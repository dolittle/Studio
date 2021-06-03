FROM node:14.2.0 AS shared-build

WORKDIR /app

COPY package.json ./
COPY .eslintrc.js ./
COPY tsconfig.json ./
#COPY application.json ./

COPY Source/Shared/Backend/package.json ./Source/Shared/Backend/package.json
COPY Source/Shared/Common/package.json ./Source/Shared/Common/package.json
COPY Source/Shared/Specs/package.json ./Source/Shared/Specs/package.json
COPY Source/Shared/Styles/package.json ./Source/Shared/Styles/package.json
COPY Source/Shared/Web/package.json ./Source/Shared/Web/package.json
RUN yarn

# Backend Build
FROM node:14.2.0 AS backend-build

WORKDIR /app

COPY --from=shared-build /app/ ./

WORKDIR /app/Source/BusinessMomentsAdaptorImage
COPY Source/BusinessMomentsAdaptorImage/package.json ./package.json
RUN yarn

COPY Source/BusinessMomentsAdaptorImage/ ./

RUN yarn build

# Resulting Image
FROM node:14.2.0-slim as base
ARG CONFIGURATION=Release

RUN echo Configuration = $CONFIGURATION

WORKDIR /app
COPY --from=backend-build /app/Source/BusinessMomentsAdaptorImage/dist/index.js ./
COPY --from=backend-build /app/Source/BusinessMomentsAdaptorImage/transformers ./transformers/

ENTRYPOINT ["node", "index.js"]
