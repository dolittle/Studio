
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

