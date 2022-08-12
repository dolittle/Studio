FROM node:16.16.0 AS shared-build

# Install dependencies
WORKDIR /build
COPY package.json ./package.json
COPY Source/DesignSystem/package.json ./Source/DesignSystem/package.json
COPY Source/Shared/Specs/package.json ./Source/Shared/Specs/package.json
COPY Source/Shared/Styling/package.json ./Source/Shared/Styling/package.json
COPY Source/Shared/Web/package.json ./Source/Shared/Web/package.json
COPY Source/SelfService/Web/package.json ./Source/SelfService/Web/package.json

WORKDIR /build/Source/SelfService/Web
RUN yarn

# Build and bundle
WORKDIR /build
COPY tsconfig.json ./tsconfig.json
COPY Source ./Source

WORKDIR /build/Source/SelfService/Web
RUN yarn build

# Copy bundled artifacts
FROM pierrezemb/gostatic as base
WORKDIR /app
COPY --from=shared-build /build/Source/SelfService/Web/wwwroot ./public

ENTRYPOINT ["/goStatic"]
