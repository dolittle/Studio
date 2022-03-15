# Setup local-dev with kubernetes and docker
## Requirements
- Download https://github.com/dolittle/platform-api
- Download https://github.com/dolittle/Studio
- Install k3d
- Have docker running

### Install k3d
```sh
curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | TAG=v4.4.8 bash
```

## The fast way of setting things up

Run the reset-local-k3d script, that automatically deletes the existing k3d cluster and recreates a new one with all the things below applied.

```sh
./Environment/k3d/reset-local-k3d
```

For manual steps, continue following the guide.

## Setup folder structure to bootstrap Studio
- Little clunky, but we can change after
### /tmp/dolittle-local-dev
- Used by Studio to bootstrap with a "customer" + "application" and "environment"

```sh
mkdir -p /tmp/dolittle-local-dev
cd /tmp/dolittle-local-dev && git init && cd -
cp -r Environment/k3d/git/* /tmp/dolittle-local-dev
```

### /tmp/k3dvolume
- Used by RawDataLog for persistence
```sh
mkdir -p /tmp/k3dvolume
```

## Create the local cluster
```sh
k3d cluster create dolittle-dev \
    --servers 1 \
    --agents 1 \
    --port 8080:80@loadbalancer \
    --port 8443:443@loadbalancer \
    --k3s-server-arg "--no-deploy=traefik" \
    --registry-create \
    -v /tmp/k3dvolume:/tmp/k3dvolume \
    --kubeconfig-switch-context
```

## Setup Ingress
- Using a real domain will require changing your /etc/hosts (hosts file)
- Firefox and Chrome have special behaviour for "*.dev"

```sh
kubectl apply -f 'https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.0/deploy/static/provider/baremetal/deploy.yaml'
kubectl patch -n ingress-nginx service ingress-nginx-controller -p '{"spec": {"type": "LoadBalancer"}}'
```

## Bootstrap the namespace

BEFORE APPLYING CHECK THAT YOU ARE IN THE CORRECT CONTEXT!

Do the following command and verify that current context is `k3d-dolittle-env`

```sh
kubectl config current-context
```

We need to bootstrap some k8s things before we can continue. This is to mimick our setup in the platform. We also setup a hardcoded mongodb with the correct setup (labels, annotations, resources.json) for the example microservices in Studio. We also need to setup a persistent volume so that we can persist the data, it's path is set to `/tmp/k3dvolume`. We also mock the `managed-premium` storage class from Azure to work as a local storage.
Execute the following commands in Studio repo while in the `k3d-dolittle-dev` k8s context (the pods might take a while to start):

 ```sh
cd Environment/k3d/k8s
kubectl apply -f namespace.yml
kubectl apply -f .
cd -
```

## (Optional) Bootstrap monitoring

BEFORE APPLYING CHECK THAT YOU ARE IN THE CORRECT CONTEXT!

First bootstrap the namespaces:
```sh
cd Environment/k3d/k8s/Monitoring
kubectl apply -f Grafana/namespace.yml -f Logs/namespace.yml -f Metrics/namespace.yml
```

Then bootstrap all of the services (may take a minute to start them all):
```sh
kubectl apply -f Grafana/ -f Logs/ -f Metrics/
```

Then port-forward Grafana to explore the data:
```sh
kubectl -n system-monitoring-grafana port-forward svc/grafana 3000:80
```

Now open your browser at http://localhost:3000 and explore around. If any component reports of an `"empty ring"` or `"ingestercount <= 0"` type errors in the logs, just restart the pod and it will reconnect to it's respective ingester and fix the ring issue.

## Run self-service web
In a new terminal:
```sh
make develop-frontend
```

## Run self-service backend
In a new terminal:
```sh
make develop-backend
```

## Run platform-api
In a new terminal:

On *nix:

```sh
GIT_REPO_DIRECTORY="/tmp/dolittle-local-dev" \
GIT_REPO_DIRECTORY_ONLY="true" \
GIT_REPO_DRY_RUN="true" \
GIT_REPO_BRANCH=main \
LISTEN_ON="localhost:8081" \
HEADER_SECRET="FAKE" \
AZURE_SUBSCRIPTION_ID="e7220048-8a2c-4537-994b-6f9b320692d7" \
go run main.go api server
```

## Check out Studio

Navigate to `http://localhost:9007` for Studio and check out the goodness!!👍


# Forward the cluster to local platform-api using Telepresence

1. Install [Telepresence](https://www.telepresence.io/docs/latest/howtos/intercepts/)
2. Connect to the local k3d cluster with `telepresence connect` (make sure you're in the k3d context)
3. Intercept the mock platform-api deployment (defined in `Environment/k3d/k8s/api-v1.yml`) and forward that deployments `http` port to the local platform-api port (default is `8080`):
```sh
telepresence intercept dev-api-v1 --namespace system-api --port 8080:http --env-file ~/system-api-service-dev-api-v1.env
```
Now your local platform-api can speak with services inside the cluster with their DNS names, like `dev-test.application-11b6cf47-5d9f-438f-8116-0d9828654657.svc.cluster.local`.


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
