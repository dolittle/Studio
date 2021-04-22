# Cloud Environment

## DevOps

The solution and all its microservices are built using GitHub Actions and sits in [here](../.github/workflows).
For details on GitHub actions, go [here](https://github.com/features/actions).

> There are two different pipeline types; one for continuous integration and one for the continuous deployment, they're
> both documented [here](./continuous-integration.md) and [here](./continuous-deployment.md).

It is possible to run GitHub actions locally, to get a local development flow. Act provides this, read more [here](https://github.com/nektos/act).

```shell
$ az login

$ az aks get-credentials -g Infrastructure-Essential -n Cluster-Production-Two --subscription 49a62f35-8ede-4470-982a-593b89874dec

$ az acr login -n 388c0cc724b246a78735b583ce21e01b --subscription 49a62f35-8ede-4470-982a-593b89874dec
```

You can read more about how things are deployed with Dolittle [here](https://dolittle.freshdesk.com/support/solutions/articles/48000983717-how-to-deploy-an-application-in-the-dolittle-paas).

## Deployment details

| Type | Value |
| ---- | ----- |
| Subscription ID | 49a62f35-8ede-4470-982a-593b89874dec |
| Resource Group | Infrastructure-Essential |
| Cluster Name | Cluster-Production-Two |
| Application Namespace | application-fe7736bb-57fc-4166-bb91-6954f4dd4eb7 |
| ACR Registry | 508c17455f2a4b4cb7a52fbb1484346d |

For more details on how to update configuration and work with this in the Dolittle cluster, see the [knowledge base](https://dolittle.freshdesk.com/support/home).

### Portal

| Type | Environment | Value |
| ---- | ----------- | ----- |
| Image repository | All | 508c17455f2a4b4cb7a52fbb1484346d.azurecr.io/dolittle/studio/harvest |
| Deployment name  | Dev | dev-portal |
| ConfigMap name   | Dev | dev-portal-config-files |
| Env. Variables name | Dev | dev-portal-env-variables |
| Deployment name  | Prod | prod-portal |
| ConfigMap name   | Prod | prod-portal-config-files |
| Env. Variables name | Prod | prod-portal-env-variables |

### Deployables

| Type | Environment | Value |
| ---- | ----------- | ----- |
| Image repository | All | 508c17455f2a4b4cb7a52fbb1484346d.azurecr.io/dolittle/studio/harvest |
| Deployment name  | Dev | dev-deployables |
| ConfigMap name   | Dev | dev-deployables-config-files |
| Env. Variables name | Dev | dev-deployables-env-variables |
| Deployment name  | Prod | prod-deployables |
| ConfigMap name   | Prod | prod-deployables-config-files |
| Env. Variables name | Prod | prod-deployables-env-variables |

### Events

| Type | Environment | Value |
| ---- | ----------- | ----- |
| Image repository | All | 508c17455f2a4b4cb7a52fbb1484346d.azurecr.io/dolittle/studio/harvest |
| Deployment name  | Dev | dev-events |
| ConfigMap name   | Dev | dev-events-config-files |
| Env. Variables name | Dev | dev-events-env-variables |
| Deployment name  | Prod | prod-events |
| ConfigMap name   | Prod | prod-events-config-files |
| Env. Variables name | Prod | prod-events-env-variables |

## Kubernetes

If you have access to the Kubernetes environment, you can use the [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
from your terminal to interact with the namespace.

Once you have `kubectl` installed, its helpful to set the current namespace to avoid having to explicitly specify the namespace
for all commands:

```shell
$ kubectl config set-context --current --namespace=application-c52e450e-4877-47bf-a584-7874c205e2b9
```

### List Pods running in the namespace

You can list all the running pods in the namespace to get a status of what is going on:

```shell
$ kubectl get pods
```

### Logs from the cloud environment

You can get to the logs from the individual container instances within every pod running in Kubernetes.
By using the `kubectl logs` command you can get logs for a container within a pod.

For instance if we want to look at the runtime logs for the deployables microservice using the pod identifier from the `get pods` command:

```shell
$ kubectl logs dev-deployables-5c59ff4c4-mjtgb -c runtime
```

For the head, which is the backend code of the microservice:

```shell
$ kubectl logs dev-deployables-5c59ff4c4-mjtgb -c head
```
