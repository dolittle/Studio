# Web Build
FROM node:14.2.0 AS web-build
WORKDIR /app

COPY .eslintrc.js ./
COPY tsconfig.json ./
COPY package.json ./

COPY Source/Shared/DependencyInversion/package.json ./Source/Shared/DependencyInversion/package.json
COPY Source/Shared/MVVM/package.json ./Source/Shared/MVVM/package.json
COPY Source/Shared/Portal/package.json ./Source/Shared/Portal/package.json
COPY Source/Shared/Styles/package.json ./Source/Shared/Styles/package.json
COPY Source/Shared/WebPack/package.json ./Source/Shared/WebPack/package.json
COPY Source/Portal/Web/package.json ./Source/Portal/Web/package.json

WORKDIR /app/Source/Portal/Web
RUN yarn

COPY Source/Portal/version.json /app/Source/Portal/version.json
COPY Source/Shared /app/Source/Shared/
COPY Source/Portal/Web ./
RUN yarn build

# Resulting Image
FROM nginx

COPY --from=web-build /app/Source/Portal/Web/wwwroot /usr/share/nginx/html
COPY Source/Portal/gzip.conf /etc/nginx/conf.d/gzip.conf
