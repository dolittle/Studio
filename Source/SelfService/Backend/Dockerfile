# ----------------------------------------------------
# Base
# ----------------------------------------------------
FROM golang:1.16.3-alpine3.13 AS build_base
WORKDIR /src

COPY go.mod .
COPY go.sum .
RUN go mod download

# ----------------------------------------------------
# Build + Test
# ----------------------------------------------------
FROM build_base AS build
WORKDIR /src
COPY --from=build_base /src .
COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o cli .

# ----------------------------------------------------
# Release
# ----------------------------------------------------
FROM alpine:3.13 AS release
WORKDIR /app/bin
COPY --from=build /src/cli /app/bin/cli
ENTRYPOINT ["/app/bin/cli"]

EXPOSE 8000
