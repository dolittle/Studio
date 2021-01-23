# Developer Central

## References

* https://github.com/electron-react-boilerplate/electron-react-boilerplate
* https://kilianvalkhof.com/2019/electron/notarizing-your-electron-application/
* https://dzone.com/articles/understanding-execfile-spawn-exec-and-fork-in-node

Nginx sub filter (Inject code):

* https://nginx.org/en/docs/http/ngx_http_sub_module.html
* https://blog.fhrnet.eu/2017/09/20/nginx-reverse-proxy-with-code-injection/
* https://stackoverflow.com/questions/19700871/how-to-inject-custom-content-via-nginx

## Todo

* Workspace level information - separate from Application
* Figure out a model for microservices across multiple repositories
* Tenant configuration in files
* Tenant editor
* Tenant selector UI - bar at the bottom - can we add this through Nginx?
* Add paths for nginx (Example use case: /api/v1 -> K8s mock in Studio)
* Don't show Web related things if Microservice does not have a frontend
* Restart a running process
* Restart a running container
* Refresh button for Swagger
* Refresh button for GraphQL
* Add the ability to configure base port - all ports allocated for processes will be in a range from this
* Host the GraphQL playground in the App and point the GraphQL endpoint
* Host the Swagger UI in DevCentral and point to the swagger.json endpoint

* Honor route segment from vanir for urls
* Update running state on startup and detect if any are running
* Save the running state to disk and resume it when starting (paused containers / processes remain paused etc. )
* Add ability to add Web frontend at a later stage
* Vanir: Figure out a good way to export nested modules so that we can do 'import { IEventStore } from '@dolittle/vanir-backend/dolittle''
* Running time in list of running instances
* UI: Left menu / sidebar should have a grey semi-transparent background. Looks better.
* UI: Make columns adjustable in size
* UI: Don't lock the width of the overview page for Apps.
* Vanir Documentation: The reason for the HtmlInterceptorPlugin - fallback page serving for all non-matched routes for the dev server
* Show CPU and memory usage of both containers and running processes (sampled every second or so)
* Change name from 'Backend' to Main
* Change name from 'Web' to Renderer
* Continuous deployment pipeline

* Clear logs
* Download logs
* Search logs
* A more "sane" way to figure out if all the Docker containers have started than (microservices.length + 2) - we generate the Docker Compose file, we know! (Applications.ts)
* UI: Theming support - primarily right now a Desktop theme and a Dark theme. To support the different look of the DevTool and the Web and make it possible to include Studio things within the Dev Central tooling
* Show path for where a Workspace is
* Add "Open in finder" / "Explore" workspace action

* UI Improvement: When App level is selected, deselect any Microservice

* Main model improvements:
  * Encapsulate the starting of a Microservice
  * Processes and containers should be dynamically provided, not hard-coded
  * Add a Provider model that can provide the artifacts and how to start them (Vanir is one model)
  * Move reporting of process run status into Processes system

* Add Dockerfile capabilities - meaning that a provider (Vanir) can render dockerfiles on the spot - could be packaged and also be part of the build pipeline
* Vanir: Look into Vanir being able to read the microservice.json file for the common information, so we don't keep some in vanir.json and some in microservice.json
* Make acrylic work for Windows https://github.com/Seo-Rii/electron-acrylic-window

* Enable Automatic updates (Needs notarizing on macOS (see above))

* Add icon as part of the WebPack for main rather than an OS specific 'cp' command in the node script

* Stop using Buffer - (node:37143) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.re

* Automatically include the Vanir version in the WebPacked output and configured correctly
* Missing faulty RunState - we need to know if it didn't start as expected

* Limit # of bytes / lines we accumulate for logs both for containers and processes

* Need to be able to add existing microservice

* Refresh port mapping in workspaces.json when changes occur - added microservice

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

* Settings page should show where the folder of the Workspace configuration is

* Vanir: Maintain pipelines in one place use workflow-dispatch to call these - so we don't need to have the template be maintained.
  Leverage composite runs actions: https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/creating-a-composite-run-steps-action
* Vanir: Support having a license header that gets added to all files (templating)
* Vanir: Add correct license header to tsconfig.json when selecting a license (except UNLICENSED)
* Vanir: A lifecycle for ViewModels that is related to route change instead of just params
* Vanir: Figure out why the SCSS WebPack thing doesn't work on initial builds when using it as module (doesn't generate the d.ts)
* Vanir: HotLoading not working - have to refresh browser manually when changing anything - the webpack-dev-server.js path is wrong for inner iframes
* Vanir: WebPack doesn't always pick up changes in dependencies (Shared)
* Vanir: Templates in create* commands should be excluded during 'tsc -b' (build) - we don't want them compiled as part of the package dist folder
* Vanir: WebPack setup should support reading the microservices.json file for information plus the vanir.json file
* Vanir: Look at how we could get <Bootstrapper/> instrumented with the information it needs from microservices.json and/or vanir.json
* Vanir: Add a default empty Swagger schema if non is given
* Vanir: TS Transformer for discovering the RegisterRoutes thing and hook it up automatically
* Vanir: Automatically hook up GraphQL Resolvers
* Vanir: Support overriding the WebPack DevServer hosted port
* Vanir: Export ContentFrame properly
* Vanir: It should be optional if one wants a backend or a frontend

* Whats new dialog
* Known issues dialog

## Known issues

* BUG: When adding new microservice - it doesn't show up until one opens the application again
* BUG: Running processes list gets clipped outside the window
* BUG: When refreshing - not all objects are refreshed (Microservice for listing + details + ports)
* BUG: Displaying 'unknown' for runstate at startup - make sure we set the correct run state for all apps and microservices loaded
* BUG: When stopping a running application - clear the interval that polls for container info - really stop everything
* BUG: Clean up event listeners: ] (node:46930) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 log-message listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit
* BUG: Should not be allowed to start if ports conflict
* BUG: Tabs that are supposed to only show when running a Microservice sometimes shows up
* BUG: LogOutput / Content doesn't stretch out vertically
* BUG: Render files after adding microservice
* BUG: Fix what areas are draggable to make it feel more natural
* BUG: Disable text selection - to make it feel more native
* BUG: List of running instances is inconsistently being updated when there are changes
* BUG: Inconsistent URLs - Portals API and GraphQL is served on /api/portal and /portal/graphql - while DevCentral assumes without the prefix for a portal
* BUG: Navigating from "Home" directly to a Microservice will not show all Microservice details (Identifier, name, version)
* BUG: Swagger iFrame is empty till we resize or gets a re-render somehow...
* BUG: Make sure we fill / stretch the acrylic in layout when toolbar and/or navigation is not visible
* BUG: Title flickers from not set to actual title
* BUG: Unselect microservice when navigating to something else
* BUG: Make content scrollable
* BUG: Electron Security errors on startup
* BUG: Multiple windows being opened using start:dev script
* BUG: When clicking stop on app - navigate to overview of app

## Ideas

* Visualizing microservices and their dependencies using something similar to this: http://hughsk.io/colony/ (https://github.com/hughsk/colony/blob/master/src/index.js)


## Done

* Move custom configuration into a workspace.json file inside the .dolittle folder of a workspace
* Upgraded to latest Runtime (5.3.2) for templates
