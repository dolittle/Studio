# Inversion of Control

All projects have been setup and designed for the use of the [dependency inversion principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle).
This means that you specify your external dependencies as constructor parameters rather than taking on the
responsibility of the creation of it in your unit. In addition to this, everything is configured with an
IoC container - [Inversion of Control container](https://en.wikipedia.org/wiki/Inversion_of_control).
It takes on the role of being able to provide these dependencies and also be responsible for the lifecycle
management of these. This gives a lot of flexibility and makes it easier to create decoupled and maintainable
software. The IoC container of choice for Studio is something called [tsyringe](https://github.com/Microsoft/tsyringe).
It works both for the backend and the frontend code exactly the same.

## Design by contract

The dependencies should be represented as contracts, or interfaces. The concrete implementation should not be
important for the consumer of a dependency. It should just care about the exposed API and this API should be
represented as an interface. You can read more about the concept [here](https://en.wikipedia.org/wiki/Design_by_contract).

An added benefit of this is it becomes a lot easier to provide automated tests (TDD), or specs (BDD) that confirms
the behavior of the system. Every unit is then in isolation and you don't need to worry about integrating with
infrastructure in order for you to set up reliable running contexts for your tests or specs. With the interface / contract,
you can simply provide a [test double](https://duckduckgo.com/?q=mock+fake+stub&t=osx).

## Reflection metadata

Typescript provides a rich type system and also some metadata at a runtime level, but not enough to make IoC containers
happy. Therefor you need something that adds additional metadata for the IoC to be able to resolve dependencies properly.
A typical approach is to use JavaScript/TypeScript decorators to capture information - to augment the information available
we'll need something that does this.

A package called [reflect-metadata](https://www.npmjs.com/package/reflect-metadata) does just that.
The Shared project called `DependencyInversion` has a reference to this package and projects are set up with it.
To get the metadata available, all you have to do is add the following import statement to the entrypoint of your solution:

```typescript
import 'reflect-metadata';
```

## Interfaces -> abstract classes

In TypeScript, interfaces is just available at compile-time and does not exist at runtime. This is because JavaScript, which
is the transpile target for TypeScript does not have the concept of interfaces. Instead what we do is use **abstract** classes.
These provide a type at runtime and makes it possible for the IoC container to recognize types and do its job.

Example:

```typescript
export abstract class IFoo {
    abstract bar(): void;
}
```

An implementation of this would then be:

```typescript
export class Foo {
    bar(): void {
        console.log('hello world');
    }
}
```

## Injectables

In order for [tsyringe](https://github.com/Microsoft/tsyringe) to be able to get all the metadata it needs to resolve dependencies
are needed, we need to adorn types with a decorator called `@injectable()`. This is done on the concrete implementation and not
the interface/abstract class.

```typescript
import { injectable } from 'tsyringe';

@injectable()
export class Foo {
    constructor(private readonly _someDependency: ISomeService) {
    }

    bar(): void {
        console.log('hello world');
    }
}
```

## Registering

There is no auto-wiring of dependencies. That means you have to manually register services with the container. The relationship between
an interface and a type or instance is known as a binding.
Instead of scattering these around in random hidden places, we formalize them as classes that we hook up at the right time of startup.

An example bindings class:

```typescript
export class Bindings {
    static initialize() {
        container.registerType(IFoo, Foo);
    }
}
```

The type definition for constructor used by tsyringe has a problem automatically inferring the type of `IFoo`, so we need to nudge it a bit:

```typescript
import { constructor } from '@shared/dependencyinversion';

export class Bindings {
    static initialize() {
        container.registerType(IFoo as constructor<IFoo>, Foo);
    }
}
```

> This problem is only present when using abstract classes
