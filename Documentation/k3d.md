# Todo
- [ ] TODO add local-dev to clusteradmin role
# Install k3d
```sh
curl -s https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash
```


# Create cluster
```sh
mkdir -p /tmp/dolittle-dev
mkdir -p /tmp/dolittle-local-dev
cd /tmp/dolittle-local-dev && git init
cp -r Environment/k3d/git/ /tmp/dolittle-local-dev
k3d cluster create dolittle-dev \
    --servers 1 \
    --agents 1 \
    --port 8080:80@loadbalancer \
    --port 8443:443@loadbalancer \
    --k3s-server-arg "--no-deploy=traefik" \
    --volume /tmp/dolittle-dev:/srv/dolittle \
    --registry-create \
    --kubeconfig-update-default=false
```

# Crete kubeconfig
- isolated, not in the default
```sh
k3d kubeconfig write dolittle-dev
export KUBECONFIG=$(k3d kubeconfig write dolittle-dev)
```

git clone XXX /tmp/dolittle-local-dev

# Run self-service web
```sh
make develop-frontend
```

# Run self-service backend
- TODO user_id might not be so important, or breaks, time will tell.

```sh
HEADER_SECRET="FAKE" \
PLATFORM_API="localhost:8081" \
DEVELOPMENT_TENANT_ID="453e04a7-4f9d-42f2-b36c-d51fa2c83fa3" \
DEVELOPMENT_USER_ID="local-dev" \
go run main.go
```

# Run platform-api
- Define GIT_REPO_DIRECTORY to existing repo
- TODO add GIT_REPO_PUSH=false, this might mean we can skip GIT_REPO_SSH_KEY, code will need to handle this
- TODO document how to define where the GIT_REPO_DIRECTORY is
- TODO Change --kube-config to env variable

```sh
GIT_REPO_DIRECTORY="/tmp/dolittle-local-dev" \
GIT_REPO_DIRECTORY_ONLY="true" \
GIT_REPO_BRANCH=main \
LISTEN_ON="localhost:8081" \
HEADER_SECRET="FAKE" \
AZURE_SUBSCRIPTION_ID="e7220048-8a2c-4537-994b-6f9b320692d7" \
go run main.go microservice server --kube-config=$(k3d kubeconfig write dolittle-dev)
```


```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.48.1/deploy/static/provider/baremetal/deploy.yaml
kubectl patch -n ingress-nginx service ingress-nginx-controller -p '{"spec": {"type": "LoadBalancer"}}'
```

# Reference
- https://k3d.io/


