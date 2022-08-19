FROM node:16.16.0 AS build

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
FROM nginx:1.23.1

COPY --from=build /build/Source/SelfService/Web/wwwroot /usr/share/nginx/html
COPY Source/SelfService/Web/.docker/nginx.conf /etc/nginx/nginx.conf
COPY Source/SelfService/Web/.docker/custom-entrypoint.sh /custom-entrypoint.sh

# Replace NGINX entrypoint so we don't break compatibility with previous gostatic images when deployed
ENTRYPOINT ["/custom-entrypoint.sh"]
