#

## Todo

* Fix GitHub action that saves version to read existing file and amend the version info
* Show details on overview for each microservice
  * Event store (w/connectionstring)
  * Read models (w/connectionstring)
* Ability to pause individual microservices (processes)
* List containers and processes
* Restart a running process
* Restart a running container
* Pause and resume a running process
* Pause and resume a running container
* Optimize when we render - only when needed
* Open in browser
* Add default Portal layout with navigation structure and iframe setup - leverage deep-linking support
  * Template should have a default landing page with a couple of graphs on it
* Run yarn after adding a microservice if it is the first microservice
* Ask if one should do a Git init if the repository doesn't have .git
  * If yes - Add all files and create an initial commit
* Change colors for GraphQL playground
* Change colors for Swagger UI
* Swap out (C) 2020 dolittle with logo or something
* Avoid duplicate processes running
  * Add an environment variable to every process for identifying them
* Update running state on startup and detect if any are running
* Save the running state to disk and resume it when starting (paused containers / processes remain paused etc. )
* Open MongoDB
* Don't show Web related things if Microservice does not have a frontend
* Don't start the Web frontend process if it doesn't have a web frontend
* Watch for change in files (application.json, microservice.json, vanir.json)
* Make the declarative feature navigation system work - lifecycle is a killer with nested features
* BUG: When navigating from a Microservice to an Application - it doesn't fire state changes like title / navigation / toolbar
* BUG: Make sure we fill / stretch the acrylic in layout when toolbar and/or navigation is not visible
* Cleanup application run state leftovers

## Done

* Fix bug for GraphQL and Swagger not working for portal
* DevCentral Logs -> home
* Figure out why streaming logs doesn't work
* Formalize how the navigation is working - not copy/pasted as it is not between microservices and applications
* Use navigation to select application and microservice
* Move microservices structure within application
* Move application structure into workspace
* Start / Stop buttons should reflect current state - also support starting state (disable while starting)
* State management with push to client
  * Workspace state
  * Running Applications and Microservices state
