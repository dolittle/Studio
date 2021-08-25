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
docker build --file ./Source/SelfService/Web/Dockerfile --tag selfservice-web .
docker tag selfservice-web:latest dolittle/self-service-web:latest-dev
docker push dolittle/self-service-web:latest-dev
```

# Backend
```sh
docker build --file ./Source/SelfService/Backend/Dockerfile --tag selfservice-backend .
docker tag selfservice-backend:latest dolittle/self-service-backend:latest-dev
docker push dolittle/self-service-backend:latest-dev
```

# Update studio
- this does both Dev and Prod

```sh
kubectl -n application-fe7736bb-57fc-4166-bb91-6954f4dd4eb7 delete $(kubectl get pod -l "microservice=SelfServiceWeb" -o name -n application-fe7736bb-57fc-4166-bb91-6954f4dd4eb7)
```
