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

At this point, you need platform-api running

- in the platform-api repo

```sh
GIT_BRANCH="auto-dev" \
LISTEN_ON="localhost:8080" \
HEADER_SECRET="FAKE_SECRET" \
AZURE_SUBSCRIPTION_ID="FAKE_AZURE_SUBSCRIPTION_ID" \
PATH_TO_DB="/srv/dolittle/git/Operations/Scripts/go/support/customers.json" \
go run main.go microservice server --kube-config="/svr/dolittle/.kube/config"
```

## Local dev setup with mocked backend

If you're just working on the `Web` project, you can run the mocked backend that doesn't require a connection to the actual platform.
So you can play around with all the APIs without worrying that you're affecting any deployments.

### Run web

```sh
yarn start:dev
```

### Run mocked backend

```sh
yarn start:dev
```
