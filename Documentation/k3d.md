# Setup local-dev with kubernetes and docker
## Requirements
- Download https://github.com/dolittle/platform-api
- Download https://github.com/dolittle/Studio
- Install k3d
- Have docker running


# Install k3d
```sh
curl -s https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash
```

# Setup folder structure to bootstrap Studio
- Little clunky, but we can change after
## /tmp/dolittle-local-dev
- Used by Studio to bootstrap with a "customer" + "application" and "environment"

```sh
mkdir -p /tmp/dolittle-local-dev
cd /tmp/dolittle-local-dev && git init && cd -
cp -r Environment/k3d/git/* /tmp/dolittle-local-dev
```

# Create the local cluster
```sh
k3d cluster create dolittle-dev \
    --servers 1 \
    --agents 1 \
    --port 8080:80@loadbalancer \
    --port 8443:443@loadbalancer \
    --k3s-server-arg "--no-deploy=traefik" \
    --registry-create \
    --kubeconfig-switch-context
```

# Setup Ingress
- Using a real domain will require changing your /etc/hosts (hosts file)
- Firefox and Chrome have special behaviour for "*.dev"

```sh
kubectl apply -f 'https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.0/deploy/static/provider/baremetal/deploy.yaml'
kubectl patch -n ingress-nginx service ingress-nginx-controller -p '{"spec": {"type": "LoadBalancer"}}'
```



# Bootstrap the namespace

BEFORE APPLYING CHECK THAT YOU ARE IN THE CORRECT CONTEXT!

Do the following command and verify that current context is `k3d-dolittle-env`

```sh
kubectl config current-context
```

We need to bootstrap some k8s things before we can continue. This is to mimick our setup in the platform. We also setup a hardcoded mongodb with the correct setup (labels, annotations, resources.json) for the example microservices in Studio.
Execute the following commands in Studio repo while in the `k3d-dolittle-dev` k8s context (the pods might take a while to start):

 ```sh
cd Environment/k3d/k8s
kubectl apply -f namespace.yml -f rbac.yml -f tenants.yml -f mongo.yml
cd -
```

# Run self-service web
- In new terminal
```sh
cd Source/SelfService/Web && yarn start:dev
```

# Run self-service backend
- in new terminal
```sh
cd Source/SelfService/Backend
HEADER_SECRET="FAKE" \
PLATFORM_API="localhost:8081" \
DEVELOPMENT_TENANT_ID="453e04a7-4f9d-42f2-b36c-d51fa2c83fa3" \
DEVELOPMENT_USER_ID="local-dev" \
go run main.go
```

# Run platform-api
- in new terminal
- TODO https://app.asana.com/0/1200181647276434/1200931154475271/f

On *nix:

```sh
GIT_REPO_DIRECTORY="/tmp/dolittle-local-dev" \
GIT_REPO_DIRECTORY_ONLY="true" \
GIT_REPO_BRANCH=main \
LISTEN_ON="localhost:8081" \
HEADER_SECRET="FAKE" \
AZURE_SUBSCRIPTION_ID="e7220048-8a2c-4537-994b-6f9b320692d7" \
go run main.go microservice server --kube-config ~/.kube/config
# for windows use --kube-config $USERPROFILE/.kube/config instead
```

# Check out Studio

Navigate to `http://localhost:9007` for Studio and check out the goodness!!👍


# Deleting
## the local cluster
```sh
k3d cluster delete dolittle-dev
```
## Git repo
- This will give you a clean Studio (if you also delete and create the cluster)

```sh
rm -rf /tmp/dolittle-local-dev
```

# Reference
- https://k3d.io/
- https://github.com/dolittle/platform-api
- https://github.com/dolittle/Studio
