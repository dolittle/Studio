# Setting up a new microservice

## Provisioning with Dolittle

To get a microservice provisioned in the Dolittle hosted environment, you need to register by going to the
[Dolittle Freshdesk](https://dolittle.freshdesk.com). Create a new ticket and request the creation of a new
microservice. Provide the name of the microservice and also provide information if it is requiring the Dolittle
runtime - most Microservices requires this as integration is done through the Dolittle event horizon mechanism offered
by the runtime.

> Dolittle is working on a self-service through its Dolittle Studio.

## Monorepo and folders

The project is what called a monorepo. That basically means that it contains multiple projects within the same repository.
This has some clear benefits when there are things that are shared between different projects. It does however require some
discipline on developers, as they have to remember that at deployment the Microservices are independent and autonomous.
Keep this in mind and be careful, if you end up in having to deploy multiple microservices because of changes - you've
basically created unhealthy couplings.

At the root of the repository you'll find the a [Source](../Source) folder.
Within this folder every microservice has its own folder.
For the microservice you'll typically have a **backend** and/or a **frontend**.

> Frontend is normally a Web solution and is therefor referred to as **Web**

You **should** then end up with the following structure.

```shell
+-- Source
|   +-- <MyNewMicroservice>
|   |   +-- Backend
|   |   +-- k8s
|   |   +-- Web
```

### Version.json

With a monorepo approach, we don't use Git tags for defining the version against a commit. Instead we have a
a file that sits within each microservice called `version.json`.

Its structure is very simple:

```json
{"version":"1.0.0","commit":"2ba39a2115489889e9cc134feb6b80da1830ac97","built":"2020-10-30T12:00:55.225Z"}
```

The deployment pipeline for the microservice will handle the maintenance of this file. But its a good idea to just have it
there for the first deployment for it to be able to deduct the correct version number.

> For the initial deployment run it does not care about the **commit** or **built** content, so they can be empty.

## Yarn / NPM Workspace

With the Yarn/NPM workspace that has been setup, you'll need to add the folders for the project into the workspace definition.
The reason we do this is to be able to shared **node_modules** during development and also some of the shared things can then
be automatically mapped up properly implicitly by the tooling (Implicit NPM link).

At the root of folder, locate the `package.json` file and add the folders to it:

```json
{
    "private": true,
    "workspaces": [
        "Source/Harvest/Backend",
        "Source/Harvest/Web.React",
        ...
        "Source/MyNewMicroservice/Backend", <-- New line
        "Source/MyNewMicroservice/Web"      <-- New line
    ],
    "license": "UNLICENSED",
    ...
}
```

### Common tools / devDependencies

The root `package.json` contains some package dependencies - typically these are **devDependencies** and are common tools
we use across the board.

### Shared Projects

There are a few shared projects that contains shared components. These are documented [here](./shared-projects.md).
What is important to remember about these is that they also take on the responsibility of taking in the dependencies they
need for what it is that they represent as a shared piece of infrastructure.

Shared projects are infrastructural in nature.

## Project Setup

Once you have the folders in place and the workspace configured, we can move on to setting up the projects.
For the different parts of the microservice, you'll need to set up the correct Node package.
You can use `npm init` for this, or just set up the `package.json` file manually within the `Backend` and/or the `Web` folder.

Read more on how the initial `package.json` file should be [here](./package-json.md).
In addition to the `package.json` file, all projects need a `tsconfig.json` file, read more details on that [here](./tsconfig.json).

For configuring specifics for backend, read [here](./anatomy-of-a-backend.md).
For configuring specifics for frontend, read [here](./anatomy-of-a-frontend.md).

### Dockerfiles

The backend typically owns the needed `Dockerfile` that describes how the container image will look like.
It includes hosting the static Web pages of the frontend if the microservice has a frontend.

### Kubernetes artifacts

   - k8s folder in every Microservice folder
   - Holds config maps

## Local Development Environment

In the [Environments](../Environments) folder at the root of the repository sits the setup for setting up the local development environment
that spins up all the dependencies needed to run any of the microservices. For any new microservice, these need to be expanded on.

### Resources

For every microservice, you'll need a Dolittle runtime configured. This needs to have some configuration to it - most of it is shared in
the development environment, but the resources configuration is important as it configured the event store for the microservice.

Create a new folder for the microservice - consistent in naming with the folder name within `Source`.
Add a file called `resources.json` in this folder and make it look like the following:

```json
{
    "508c1745-5f2a-4b4c-b7a5-2fbb1484346d": {           <-- This is the Dolittle tenant identifier used during development.
        "eventStore": {
            "servers": [
                "mongo"
            ],
            "database": "event_store_<microservice>"    <-- Set the microservice name in lower case - consistent with everything else
        }
    }
}
```

### Docker Compose

For running the environment, we leverage Docker Compose - open the `docker-compose.yml` file and add the runtime for your microservice:

```yaml
  runtime-<microservice>:                                               # Set the name of the microservice in lower case, consistent with everything else
    image: dolittle/runtime:5.1.4
    volumes:
      - ./<microservice>/resources.json:/app/.dolittle/resources.json   # Set the folder name correctly to the folder used in the resources step
      - ./tenants.json:/app/.dolittle/tenants.json
      - ./microservices.json:/app/.dolittle/microservices.json
      - ./appsettings.json:/app/appsettings.json
    ports:
      - 9702:9700                                                       # Metrics endpoint, look at the other microservices and find the one with the highest number and increment 1
      - 50056:50052                                                     # Runtime public endpoint, look at the other microservices and find the one with the highest number and increment 2
      - 50057:50053                                                     # Runtime private endpoint, look at the other microservices and find the one with the highest number and increment 2
```

### Nginx - Composition

Nginx is being used for HTTP composition. This is for both APIs and Web-frontends.
The use of Nginx and the way its configured simulates how it will look in hosted Dolittle environment, mimicking how the Ingress Controller is configured there.
The purpose of the composition is to provide a single origin for all routes, providing a secure composition with regards to TLS termination and cross-site scripting attacks.
The Nginx 'ingress' is exposed on port 9000 and is configured to route paths to the different services within the development environment.

If your microservice has a frontend, you'll typically add the following.

```conf
        location /_/<microservice-prefix-path> {
            proxy_pass http://host.docker.internal:9001;            <-- Update the port to reflect the port of the frontend configured in the WebPack dev-server setup.
            proxy_set_header Host localhost:9000;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header Tenant-ID 82ebf8ae-7ae8-43b4-8ccf-5e4ba85c042c;
        }
```

In addition to this you'll need routes for your backend

```conf
        location /_/<microservice-prefix-path>/graphql {
            proxy_pass http://host.docker.internal:3001;            <-- Update the port to reflect the port of the backend set in the index.ts:startBackend() call.
            proxy_set_header Host localhost:9000;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header Tenant-ID 82ebf8ae-7ae8-43b4-8ccf-5e4ba85c042c;
        }

        location /_/<microservice-prefix-path>/api {
            proxy_pass http://host.docker.internal:3001;            <-- Update the port to reflect the port of the backend set in the index.ts:startBackend() call.
            proxy_set_header Host localhost:9000;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header Tenant-ID 82ebf8ae-7ae8-43b4-8ccf-5e4ba85c042c;
        }
```

## Continuous Integration

Every microservice needs a continuous integration pipeline, read more about how these are set up [here](./continuous-integration.md).

## Continuous Deployment

Every microservice needs a continuous deployment pipeline for every environment we deploy to. Read more about how these are set up [here](./continuous-deployment.md).
For these to work, the Microservice needs to have a `dockerfile` that describes how it is packaged.
Read more about these [here](./dockerfile.md)