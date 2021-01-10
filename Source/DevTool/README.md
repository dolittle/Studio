#


## References

* https://github.com/electron-react-boilerplate/electron-react-boilerplate
* https://kilianvalkhof.com/2019/electron/notarizing-your-electron-application/

## Todo

* BUG: Creating an app doesn't work on Windows
* BUG: Missing Window buttons in the right corner on Windows
* BUG: Render files after adding microservice

* BUG: Starting point is not Home

* Restart a running process
* Restart a running container

* Change name from 'Backend' to Main
* Change name from 'Web' to Renderer

* Stop using Buffer - (node:37143) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.re

* Automatically include the Vanir version in the WebPacked and configured correctly

* BUG: Inconsistent URLs - Portals API and GraphQL is served on /api/portal and /portal/graphql - while DevCentral assumes without the prefix for a portal

* BUG: Clean up event listeners: ] (node:46930) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 log-message listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit
* BUG: Navigating from "Home" directly to a Microservice will not show all Microservice details (Identifier, name, version)

* BUG: Swagger iFrame is empty till we resize or gets a re-render somehow...
* BUG: Make sure we fill / stretch the acrylic in layout when toolbar and/or navigation is not visible
* BUG: Title flickers from not set to actual title
* BUG: Unselect microservice when navigating to something else
* Missing faulty RunState - we need to know if it didn't start as expected

* BUG: Make content scrollable

* BUG: Displaying 'unknown' for runstate at startup - make sure we set the correct run state for all apps and microservices loaded
* BUG: Electron Security errors on startup
* BUG: Multiple windows being opened using start:dev script

* BUG: When clicking stop on app - navigate to overview of app

* Limit # of bytes / lines we accumulate for logs both for containers and processes

* Need to be able to add existing microservice

* Refresh port mapping in workspaces.json when changes occur - added microservice

* Don't show Web related things if Microservice does not have a frontend
* Don't start the Web frontend process if it doesn't have a web frontend

* Fix GitHub action that saves version to read existing file and amend the version info
* Show details on overview for each microservice
  * Event store (w/connectionstring)
  * Read models (w/connectionstring)
* Ability to pause individual microservices (processes)
* List containers and processes
* Pause and resume a running process
* Pause and resume a running container
* Optimize when we render - only when needed

* Run yarn after adding a microservice if it is the first microservice
* Detect if 'yarn install' has not been run when starting and then perform yarn and pop up a window with the log output

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

* UI improvement: show actions only on mouse over

* Open in browser
* Open MongoDB button (ReadModels + EventStore)
* Open in Visual Studio Code support (if installed)

* Handle errors within containers that are being started (e.g. Mongo not starting) - use RunState.failed for this.

* Add navigation, ContentFrame and all to the template
* Add the ability when adding Microservices for it to add automatically to the navigation

* Progress reporter for Webpack that reports to Dev Central

* Notifications system
  * Notify on errors
  * Notify when something has been started and is running

* Vanir: Maintain pipelines in one place use workflow-dispatch to call these - so we don't need to have the template be maintained.
  Leverage composite runs actions: https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/creating-a-composite-run-steps-action
* Vanir: Add correct license header to tsconfig.json when selecting a license (except UNLICENSED)
* Vanir: A lifecycle for ViewModels that is related to route change instead of just params
* Vanir: Figure out why the SCSS WebPack thing doesn't work on initial builds when using it as module (doesn't generate the d.ts)
* Vanir: HotLoading not working - have to refresh browser manually when changing anything
* Vanir: WebPack doesn't always pick up changes in dependencies (Shared)
* Vanir: Templates in create* commands should be excluded during 'tsc -b' (build) - we don't want them compiled as part of the package dist folder

* Whats new dialog
* Known issues dialog

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
* Show State as string in App Overview
* Show Type as string in App Overview
* BUG: Process name should not be /bin/sh - but the command that was run
* Sorting of items in list of running instances
* BUG: Refresh issues in application overview
* UI improvement: Look at Docker desktop - provide a header with Dolittle logo
* Swap out (C) 2020 dolittle with logo or something
* Add default Portal layout with navigation structure and iframe setup - leverage deep-linking support
  * Template should have a default landing page with a couple of graphs on it
* BUG: When navigating from a Microservice to an Application - it doesn't fire state changes like title / navigation / toolbar (see Vanir - route change)
* BUG: Vanir - create-dolittle-microservice spawned from create-dolittle-app yields the following error: Error: Cannot find module 'create-dolittle-microservice/dist/creation' unless it is explicitly installed
* BUG: Vanir - When webpacked - the plopfile.js is not included, we need to expose an API rather than how we do it and not rely on the plop file. Extract all the tasks into something independent.
* BUG: Vanir - create-dolittle-app doesn't produce the application.json file: ×  -> Cannot find module 'C:\Users\einari\Documents\MyApp\application.json'

