
# Build
```sh
docker build -t dolittle/studio-self-service:latest .
```

# Run
```sh
docker run \
    -d \
    --rm \
    --name studio-self-service-server \
    -p 8080:8080 \
    dolittle/studio-self-service:latest
```

# Remove

```sh
docker rm -f studio-self-service-server
```

# Development
- tenantID = ask P&D if you dont know
- userID = ask P&D if you dont know
- you will want the [platform-api](https://github.com/dolittle-entropy/platform-api/) service running.

```sh
HEADER_SECRET="CHANGEME" \
DEVELOPMENT_TENANT_ID="tenantID" \
DEVELOPMENT_USER_ID="userID" \
go run main.go
```
