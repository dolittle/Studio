

# Install k3d
```sh
curl -s https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash
```


# Create cluster
```sh
mkdir -p /tmp/dolittle-dev
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


```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.48.1/deploy/static/provider/baremetal/deploy.yaml
kubectl patch -n ingress-nginx service ingress-nginx-controller -p '{"spec": {"type": "LoadBalancer"}}'
```


# Reference
- https://k3d.io/
