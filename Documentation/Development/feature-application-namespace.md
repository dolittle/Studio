
# Setup cluster
```sh
Environment/k3d/reset-local-k3d
```

## Remove the metrics and logging
```sh
cd Environment/k3d/k8s/Monitoring
kubectl delete -f Grafana/namespace.yml -f Logs/namespace.yml -f Metrics/namespace.yml
cd -
```

# Copy from Operations
- new terminal
- dev  branch
```sh
cp -r ./Source/V3/platform-api/2df99e98-3c9a-44fb-b066-3a866b11f534 /tmp/dolittle-local-dev/Source/V3/platform-api
```

# Start the studio frontend
- new terminal
```sh
make develop-frontend
```

# Start the studio backend
- new terminal
```sh
cd Source/SelfService/Backend
HEADER_SECRET="FAKE" \
PLATFORM_API="localhost:8081" \
DEVELOPMENT_TENANT_ID="2df99e98-3c9a-44fb-b066-3a866b11f534" \
DEVELOPMENT_USER_ID="local-dev" \
go run main.go
```

# Start the platform-api
- new terminal
```ssh
GIT_REPO_DIRECTORY="/tmp/dolittle-local-dev" \
GIT_REPO_DIRECTORY_ONLY="true" \
GIT_REPO_DRY_RUN="true" \
GIT_REPO_BRANCH=main \
LISTEN_ON="localhost:8081" \
HEADER_SECRET="FAKE" \
AZURE_SUBSCRIPTION_ID="e7220048-8a2c-4537-994b-6f9b320692d7" \
go run main.go microservice server
```

# Create application
```sh
curl -XPOST \
-H 'Content-Type: application/json' \
-H 'x-shared-secret: FAKE' \
-H 'Tenant-ID: 2df99e98-3c9a-44fb-b066-3a866b11f534' \
-H 'User-ID: local-dev' \
localhost:8081/application -d '
{
  "id": "fake-application-123",
  "name": "Tree1",
  "tenantId": "2df99e98-3c9a-44fb-b066-3a866b11f534",
  "environments": ["Dev"]
}'
```

# Delete application
```
kubectl delete namespace application-fake-application-123
rm -rf /tmp/dolittle-local-dev/Source/V3/platform-api/2df99e98-3c9a-44fb-b066-3a866b11f534/fake-application-123
```
