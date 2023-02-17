# 1. expand studio web with modules structure

Date: 2023-02-17

## Status

Status: Proposal on 2023-02-17


## Context

Studio has gone through a few different incarnations. Initially it was a playground / source of dog-fooding for driving a "Portal + microservice + monorepo" approach that catered to an easy way to experiment with and build out application domains with several bounded contexts (responsibilities) and a UI-compositional approach that tied it all together in a single "portal-like" interface. This approach meant containing all microservices in a monorepo with the intention that these would communicate over Domain Events and the Dolittle Event Horizon, when needed. It also meant that it would potentially fit well with Domain Driven Design (DDD) modelling and approaches. The Dolittle Vanir toolset was born out of a need to make this approach simpler. Due to the amount of effort to maintain and evolve this tooling, competing with other ongoing priorities, this approach was abandoned, and Vanir has been removed as a supported technology.

This approach was discarded in favor of a more traditional Backend for Frontend (BFF) approach that would allow for a monolithic approach to building out a single application domain. This approach is what we have today and is known as "SelfService". The assumption around the "SelfService" name and `selfservice/` prefix in the URL was to be able to build this side-by side the previous approach. The benefits here were to drive out a simplistic UI and iterate often.

Several years into the Studio journey, and the needs are changing around the requirements for Studio. Which has given rise to having "modules" live within Studio. There are some resemblances to the initial mono-repo approach, but the idea is to be a lot more focused on the team that is building the application right now.

"SelfService/Backend" will need to continue to function as a proxy to the backend services and the different API's that will be needed to support the modules. This has been captured in [RFC #1](https://github.com/dolittle/rfcs/blob/main/0001_use_rest_in_studio.md)


## Decision

To support a more dynamic and smaller team focused on driving the Studio experience the decision is to create a well-structured frontend application with a BFF approach. This means "SelfService/Web" will need to be more structured around two things. "Seperation of Concerns" and "Modules".

What this means is there are two main types of areas of concern for Studio.
- Studio itself, including scaffolding, structure, reusable components, layout and other practical concerns
- Modules, which may have different API-endpoints approaches and even teams working on them

Seperation of Concern is key here. A component should only need to communicate "upwards" or "downwards" in its dependency tree to access more generic components. It should never need to communicate across to another module. This is to ensure that the modules are as independent as possible, and allow us to maintain a strong separation. This in turn will allow us to be able to scale the projecr as needed


## Consequences

TBD: What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated.

