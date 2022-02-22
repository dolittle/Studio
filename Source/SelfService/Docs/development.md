# Development

## Worth knowing

- Admin access to the cluster is almost a requirement sadly
- You will want  running [platform-api](https://github.com/dolittle-entropy/platform-api/)
- Using telepresence works, but network policies are in play

## Web

### Start

```sh
yarn start:dev
```

### Goto

[http://localhost:9007/](http://localhost:9007/)

### Backend

- You will want a tenantID and userID to access data
- The HEADER_SECRET should match the one running in the platform-api

```sh
HEADER_SECRET="FAKE_SECRET" \
DEVELOPMENT_TENANT_ID="FAKE_TENANT_ID" \
DEVELOPMENT_USER_ID="FAKE_USER_ID" \
go run main.go
```

At this point, you need platform-api [running](https://github.com/dolittle-entropy/platform-api/tree/main/docs)
