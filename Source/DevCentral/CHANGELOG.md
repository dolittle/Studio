# Changelog

This is the changelog for DevCentral used during pre-release

## v1.0.2

* Move custom configuration into a workspace.json file inside the .dolittle folder of a workspace
* Upgraded to latest Runtime (5.3.2) for templates
* Vanir: index.scss is wrong when not portal - refers to globals and has body + html stylings
* Vanir: App.tsx template is missing a semicolon at the end

## v1.0.1

* Refresh button - reloads workspace
* Don't start the Web frontend process if it doesn't have a web frontend
* Override WebPack DevServer port with argument

## v1.0.0

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
* BUG: Creating an app doesn't work on Windows
* BUG: Missing Window buttons in the right corner on Windows
* BUG: Starting point is not Home
