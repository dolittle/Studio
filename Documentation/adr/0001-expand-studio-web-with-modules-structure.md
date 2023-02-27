# Expand studio web with modules structure

Date: 2023-02-17

## Status

Status: Proposal on 2023-02-17


## Context

Studio has gone through a few different incarnations. Initially it was a playground / source of dog-fooding for driving a "Portal + microservice + monorepo" approach that catered to an easy way to experiment with and build out application domains with several bounded contexts (responsibilities) and a UI-compositional approach that tied it all together in a single "portal-like" interface. This approach meant containing all microservices in a monorepo with the intention that these would communicate over Domain Events and the Dolittle Event Horizon, when needed. It also meant that it would potentially fit well with Domain Driven Design (DDD) modelling and approaches. The Dolittle Vanir toolkit was born out of a need to make this approach simpler. Due to the amount of effort to maintain and evolve this tooling, competing with other ongoing priorities, this approach was abandoned, and Vanir has been removed as a supported technology.

This approach was discarded in favor of a more traditional Backend for Frontend (BFF) approach that would allow for a monolithic approach to building out a single application domain. This approach is what we have today and is known as "SelfService". The assumption around the "SelfService" name and `selfservice/` prefix in the URL was to be able to build this side-by side the previous approach. The benefits here were to drive out a simplistic UI and iterate often.

Several years into the Studio journey, and the needs are changing around the requirements for Studio. Which has given rise to having "modules" live within Studio. There are some resemblances to the initial mono-repo approach, but the idea is to be a lot more focused on the team that is building the application right now.

"SelfService/Backend" will need to continue to function as a proxy to the backend services and the different API's that will be needed to support the modules. This has been captured in [RFC #1](https://github.com/dolittle/rfcs/blob/main/0001_use_rest_in_studio.md)


## Decision #1 - Continue a BFF approach for Studio, and organise around modules
To support a more dynamic and smaller team focused on driving the Studio experience the decision is to create a well-structured frontend application with a BFF approach. This means "SelfService/Web" will need to be more structured around two things. "Separation of Concerns" and "Modules".

### 1. Continue a BFF approach for Studio, and organise around modules

**Folder Structure**

What this means is there are two main types of areas of concern for Studio.
- Areas in Studio itself, including scaffolding, structure, reusable components, layout and other practical concerns
- Modules, which may have different API-endpoints approaches and even teams working on them

Separation of Concern is key here. A component SHOULD only need to communicate "upwards" in its dependency tree to access more generic components. It MUST NOT need to communicate across to another module. This is to ensure that the modules are as independent as possible, and allow us to maintain a strong separation. This in turn will allow us to be able to scale the project as needed. If there is a need to reach out to a different module to re-use functionality consider the options of hoisting that dependency to a shared ancestor (like components), or duplicating the functionality in the module that needs it. This trade-off needs to be made by the developer based on the context they are in and the requirements at that time

How this will look in Studio/Web as of right now:

```
SelfService/Web
|--admin
|  └-- Admin module that contains components and logic related to the admin area
|--profiles (studio area)
|--apis
|  └-- **A well-known folder that contains the integration layer between the frontend and the backend.**
|--components
|  |-- **Any shared visual components that are reused across areas/modules and modules that don't fit in the Design System.**
|  |-- **Group components by areas where necessary. Move to Design System when it makes sense.**
|  └--layouts (shared layouts is an example of a grouping that may make sense to keep within Studio at first)
|--integrations
|  └-- The Bridge module area
|--solutions
|  └-- The current SelfService module area
|--module3
|  └-- Another module area
└--spaces
   └-- Area related to "spaces" as a core module in Studio

```
Except for `components` and `apis` folders in the structure above, notice how the different areas are grouped to their own specific responsibility and are often pluralized (ends in `s`).

**High Cohesion**

Another aspect to consider is utilizing high cohesion across files and components as you expand the different areas / modules. This means that we try to group things together based on the area they are connected to, not what they are.

There may be some aspects that make sense to separate out of areas, and this could be for practical reasons, like the `apis` folder. Where it should be easy to go to one place to see all the related API's. The Api's SHOULD still lean on area/module separation where this makes sense. For practical reasons though this may not be as clean-cut as the module definitions, and may even be auto-generated into another structure.

Example:
```
SelfService/Web
|--apis
|   |--integrations
|   |   |--integrations.api.ts
|   |--solutions
|       |--solutions.api.ts
|--...
|--integrations (The Bridge module area)
|  |--index.tsx (Index usually indicates the main entry screen / page for the module and will typically contain composition, data loading and routing)
|  |--store.tsx (The specific store or state needed for this module)
|  |--component.tsx (components here may have specific data-loading and composition logic)
|  |--component2-folder (component folder for practical grouping of components or a specific component's files)
|     └--component2.tsx
|  |--sub-route-folder (sub route folder to indicate hierarchy and further grouping of components)
|  |  |--index.tsx
|  |  └--sub-route-component.tsx
|--solutions (The current SelfService module area)
|  |--... (as described above)
└--...

```

## Decision #2 Use module-name as a routing sub-path

There are many things that decide the routing structure of Studio, but a module SHOULD have its own sub-routes. ie: `https://dolittle.studio/selfservice/{moduleName}/{...subroutes}`. This will further reenforce the independence of the modules.

## Decision #3 Remove the `selfservice/` prefix from the URL

The `selfservice/` prefix is not needed anymore, and will be removed from the URL. The priority of this should be determined by the needs of the organization and team.

## Decision #4 Change the SelfService name to a more Studio focused name

The name "SelfService" is not a good fit for the Studio experience. The name "Studio" is more fitting and will be used as the name for the application.

This is a low-impact change, and only useful to do if there are no other conflicting priorities.


## Consequences

There are some benefits and drawbacks to the approach of continuing to expand the BFF approach:

Benefits:
- Iterative approach that offers a lot of flexibility
- Easy for anyone to grasp all of the moving parts of Studio
- A single team can be responsible for the entire Studio experience
- Modules allow for a certain amount of experimentation within each module
- Being strict around the separation of concerns will allow for a more maintainable codebase, and also the possibility to move out specific modules into their own projects if needed. (ex: a new dedicated team takes over

Drawbacks:
- A monolithic approach means that the entire application needs to be deployed and released together. A fatal error in module-A can bring down the site.
- Easy to not pay attention to where a component is being imported from and couple together two otherwise unrelated areas/modules.
- The mechanism and process for how to split into separate projects is not decided, and will need to be evaluated as the project grows.
- As the project grows the build times and complexity will increase, leading to a potentially negative end user experience (needing to load modules that are not needed) and also a negative developer experience (longer build times, more complex build process). This can potentially be solved by lazy-loading modules.
- Harder to experiment with new or different technologies as this needs to work across Studio