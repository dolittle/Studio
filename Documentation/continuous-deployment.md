# Continuous deployment

We use GitHub workflows to build every pushed branch, and to deploy to our (currently) single environment when a pull-request to the correct branch(es) completes.
This flow depends on branches, pull-requests and conventions for versioning.

There is a `build-{microservice}` workflow for each of the microservices - these are the [continuous integration](./continuous-integration.md) builds.
In addition a `dev-{microservice}-deploy` for each microservice that is responsible for building with new version number and packaging the microservice into a deployable
docker image and deploys that to the docker registry. It does this by collating the input for the `deploy-ms` flow that builds a docker-image and updates the deployment
in the Kubernetes -cluster. Once this has successfully been done it will issue a patch of the correct deployment to the Dolittle environment for it to automatically
be made available.

> ## The only part you need to read
>
> When working with something going into the `development` environment. Branch from the `development` branch. Once you're happy - push this branch to origin and create
> a pull request. When this pull request is accepted - it will be considered a **prerelease** based on it being merged into the `development` branch. It will
> create a rolling version number based on the semantic versioning scheme with `development` as the prerelease tag and a rolling build number at the end.
>
> Branch out from `main` or `master` and do your work in that branch. Push that branch to GitHub. Actions will attempt to build and test your branch.
>
> When happy with your branch: create a pull-request back to the main branch *with a versioning-label (`major`, `minor` or `patch`)*.
>
> When your pull-request is accepted these actions version, build and deploy the microservice.

Now you know what you need to know. If you want to delve deeper, carry on reading.

## Semantic versioning

The automatic deployment uses labels on the pull-request to decide which version to upgrade to. This is derived using [SemVer 2.0.0](https://semver.org/spec/v2.0.0.html). As mentioned above the expected labels on the pull-request are `major`, `minor` and `patch`. The corresponding semantic version-number will be updated based on which label the pull-request has. E.g. a pull-request marked as `minor` with a current version (defined in `version.json` as described below) of 2.4.18 will result in a new version built and deployed with version 2.5.0.

## Pipeline in details

We use a pull-request -based workflow in this mono-repo. We create branches off of the `main` or `master` -branch, and push our work to that branch on GitHub. When the time has come to get the work back to the `main` or `master` -branch that is done through a pull-request. When this pull-request is accepted the changes are merged back to the `main` or `master` -branch and the branch should be deleted on GitHub to keep the origin clean.

### Deployment builds

When a pull-request is closed (accepted) into the `main` or `master` -branch the deploy-action runs. This action is defined by the `{env}-{microservice}-deploy.yml` -file (one for each microservice). This is slightly more complex than the pure build-action. Let's look at one of these files (as it looks when this is written):

```yml
name: Dev - Applications - Deploy

env:
  SOURCE_PATH: 'Source/Applications'
  DEPLOYMENT_NAME: 'studio-dev-applications'
  DOCKER_IMAGE_TAG: 'dolittle/studio/applications'
  DOCKER_FILE: 'Source/Applications/Backend/Dockerfile'

on:
  pull_request:
    branches:
    - 'development'
    types: [closed]

jobs:
  changes:
    runs-on: ubuntu-latest

    outputs:
      has-changes: ${{ steps.filter.outputs.src }}

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - uses: dorny/paths-filter@v2
      id: filter
      with:
        filters: |
          src:
            - '${{ env.SOURCE_PATH }}/**'
            - 'Source/Shared/**'

  conditionalDeploy:
    runs-on: ubuntu-latest
    needs: changes
    if: ${{ needs.changes.outputs.has-changes == 'true' }}

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Establish context
      id: context
      uses: dolittle/establish-context-action@v2
      with:
        version-file: '${{ env.SOURCE_PATH }}/version.json'
        environment-branch: 'development'

    - name: Increment version
      id: increment-version
      if: ${{ steps.context.outputs.should-publish == 'true' }}
      uses: dolittle/increment-version-action@v2
      with:
        version: ${{ steps.context.outputs.current-version }}
        release-type: ${{ steps.context.outputs.release-type }}

    - name: Invoke deploy
      if: ${{ steps.context.outputs.should-publish == 'true' }}
      uses: benc-uk/workflow-dispatch@v1
      with:
        workflow: DeployMicroservice
        token: ${{ secrets.PERSONAL_TOKEN }}
        ref: ${{ github.event.sha }}
        inputs: '{ "dockerfile":"${{ env.DOCKER_FILE }}", "docker-image-tag":"${{ env.DOCKER_IMAGE_TAG }}", "deployment": "${{ env.DEPLOYMENT_NAME }}", "version": "${{ steps.increment-version.outputs.next-version }}", "source-path": "${{ env.SOURCE_PATH }}" }'
```

We define the name of the action, some environment-variables and that the action should run when a pull-request is closed.  The action is run on every pull-request that closes. If the branch the pull-request merges to is not either `main`, `master` or one of the branch-names defined in the environment-variable `PRERELEASE_BRANCHES` the job will actually not build or deploy. More on this a bit later.

The environment-variables are used in the jobs to set what to build and how to tag it.

| Environment variable | Explanation | Note |
| - | - | - |
| SOURCE_PATH | the path inside the mono-repo where the microservice lives |
| DEPLOYMENT_NAME | the name of the deployment in the kubernetes-cluster | lower-case only
| DOCKER_IMAGE_TAG | the tag to deploy the docker-image as | lower-case only, the version will be added to the tag (i.e. `sheperd/ecommerce:1.0.0`)
| DOCKER_FILE | the path from root to the dockerfile to build
| PRERELEASE_BRANCHES | any branch-names added here will also be deployed when a pull-request to them is closed |

#### Jobs

There are two jobs, `changes` and `conditionalDeploy`.

#### changes

`changes` checks whether the merged pull-request modified something under the `SOURCE_PATH`, to avoid running the next job if it did not.

#### conditionalDeploy

`conditionalDeploy` runs four steps
1. check out the code
2. establish context for the automatic versioning job
3. increment the version.json -file (if needed) based on the tags in the pull-request ('major', 'minor', 'patch' -labels are required)
4. call the `DeployMicroservice` action (which actually builds and deploys based on the arguments decided in this workflow)

### DeployMicroservices

This is the shared way to build the docker-image, deploy it to the docker-registry and update the deployment in the Kubernetes-cluster to use the recently pushed docker-image. This action has five required inputs that are collated by the particular microservice's deployment action.

| Input | description | note
| - | - | -
| dockerfile | the path to the dockerfile to build | build happens from the root
| docker-image-tag | the tag to apply to the docker-image | this is the service in the docker-registry
| deployment | the deployment in Kubernetes to patch | this is the service in the Kubernetes cluster
| version | the version of the docker-image tag and deployment | will be written to the `version.json` file under the source-path (below)
| source-path | the path from the root of the mono-repo to where the microservice lives | expects to find a `version.json` here

There is one environment-variable: `CONTAINER_REGISTRY`, which is where the docker-image will be pushed.

There is one job, with seven steps
1. fetch the code
2. login to Azure
3. build the docker image in the `dockerfile`, tag it with `docker-image-tag` and the `version`, and push the image to the `CONTAINER_REGISTRY`
4. write the version to the `version.json` -file (used in any subsequent deploys)
5. install latest version of `kubectl` to gain the ability to deploy (not guaranteed to be part of the `ubuntu-latest` -image)
6. set the context of `kubectl` (the cluster to work with)
7. patch the `deployment` to use the image that was pushed in step 3

All of this is rather involved, but most of this is provided automatically by Dolittle when a new microservice is created.
