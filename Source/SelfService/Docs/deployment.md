# Manual Deployment
## Login
```sh
az acr login -n 508c17455f2a4b4cb7a52fbb1484346d
```

```sh
cd Source/SelfService/
```

## Web
```sh
cd Web
yarn build
docker build --file Dockerfile2 --tag selfservice-web-test .
docker tag selfservice-web-test:latest 508c17455f2a4b4cb7a52fbb1484346d.azurecr.io/dolittle/studio/self-service-web:latest
docker push 508c17455f2a4b4cb7a52fbb1484346d.azurecr.io/dolittle/studio/self-service-web:latest
```

# Backend
```sh
cd Backend
docker build --tag selfservice-backend-test .
docker tag selfservice-backend-test:latest 508c17455f2a4b4cb7a52fbb1484346d.azurecr.io/dolittle/studio/self-service-backend:latest
docker push 508c17455f2a4b4cb7a52fbb1484346d.azurecr.io/dolittle/studio/self-service-backend:latest
```

# Update studio
- this does both Dev and Prod

```sh
kubectl -n application-fe7736bb-57fc-4166-bb91-6954f4dd4eb7 delete $(kubectl get pod -l "microservice=SelfServiceWeb" -o name -n application-fe7736bb-57fc-4166-bb91-6954f4dd4eb7)
```
