#

## Todo

* BUG: Inconsistent URLs - Portals API and GraphQL is served on /api/portal and /portal/graphql - while DevCentral assumes without the prefix for a portal

* Add default Portal layout with navigation structure and iframe setup - leverage deep-linking support
  * Template should have a default landing page with a couple of graphs on it

* BUG: Make content scrollable
* BUG: Swagger iFrame is empty till we resize or gets a render somehow...
* BUG: When navigating from a Microservice to an Application - it doesn't fire state changes like title / navigation / toolbar
* BUG: Make sure we fill / stretch the acrylic in layout when toolbar and/or navigation is not visible
* BUG: Title flickers from not set to actual title
* BUG: Refresh issues in application overview
* BUG: Process name should not be /bin/sh - but the command that was run
* BUG: Unselect microservice when navigating to something else
* Missing faulty RunState - we need to know if it didn't start as expected

* Limit # of bytes / lines we accumulate for logs both for containers and processes

* Need to be able to add existing microservice

* Refresh port mapping in workspaces.json when changes occur - added microservice

* Don't show Web related things if Microservice does not have a frontend
* Don't start the Web frontend process if it doesn't have a web frontend

* Swap out (C) 2020 dolittle with logo or something

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
* Run yarn after adding a microservice if it is the first microservice
* Ask if one should do a Git init if the repository doesn't have .git
  * If yes - Add all files and create an initial commit
* Change colors for GraphQL playground
* Change colors for Swagger UI
* Avoid duplicate processes running
  * Add an environment variable to every process for identifying them
* Update running state on startup and detect if any are running
* Save the running state to disk and resume it when starting (paused containers / processes remain paused etc. )

* Watch for change in files (application.json, microservice.json, vanir.json)
* Make the declarative feature navigation system work - lifecycle is a killer with nested features
* Cleanup application run state leftovers

* Open in browser
* Open MongoDB button (ReadModels + EventStore)

* Vanir: Maintain pipelines in one place use workflow-dispatch to call these - so we don't need to have the template be maintained
* Vanir: Add correct license header to tsconfig.json when selecting a license (except UNLICENSED)

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
* Vanir: proper props / lifecycle handling of viewModels - to avoid having to use useEffect()

## Presentation

* 2 pains - local dev + maintain multiple repos
* Reference Studio - K8s - start with this
