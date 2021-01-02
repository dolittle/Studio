#

## Todo

* DevCentral Logs -> home
* Show details on overview for each microservice
  * Event store (w/connectionstring)
  * Read models (w/connectionstring)
* State management with push to client
  * Workspace state
  * Running Applications and Microservices state
* Ability to pause individual microservices (processes)
* List containers and processes
* Figure out why streaming logs doesn't work
* Restart a running process
* Restart a running container
* Pause and resume a running process
* Pause and resume a running container
* Use navigation to select application and microservice
* Move microservices structure within application
* Move application structure into workspace
* Optimize when we render - only when needed
* Start / Stop buttons should reflect current state - also support starting state (disable while starting)
* Open in browser
* Fix GitHub action that saves version to read existing file and amend the version info
* Add default Portal layout with navigation structure and iframe setup - leverage deep-linking support
  * Template should have a default landing page with a couple of graphs on it
* Run yarn after adding a microservice if it is the first microservice
* Ask if one should do a Git init if the repository doesn't have .git
  * If yes - Add all files and create an initial commit
* Change colors for GraphQL playground
* Change colors for Swagger UI
* Swap out (C) 2020 dolittle with logo or something
* Formalize how the navigation is working - not copy/pasted as it is not between microservices and applications
* Avoid duplicate processes running
  * Add an environment variable to every process for identifying them
* Update running state on startup and detect if any are running
* Save the running state to disk and resume it when starting (paused containers / processes remain paused etc. )
* Open MongoDB

## Done

* Fix bug for GraphQL and Swagger not working for portal
