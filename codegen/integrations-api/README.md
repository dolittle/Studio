# Integrations API codegen

This codegen is used to generate the client for the Integrations API (also known as the Bridge API).
It assumes a running version of the Integrations API on port 5000.
It outputs the generated client directly to the folder `Source/SelfService/Web/apis/integrations/generated`.

## Prerequisites
### Docker
Ensure you have `docker` installed on your machine. Refer to Docker's [own documentation](https://www.docker.com/get-started/) for installation instructions.

### wget
Ensure you have `wget` installed on your machine. If not, install it using your package manager.

Example macos:
```bash
brew install wget
```

Example linux:
```bash
sudo apt-get install wget
```


## How to run

Open a terminal and navigate to the `codegen/integrations-api` folder and run `./codegen.sh` to generate the client proxies.
