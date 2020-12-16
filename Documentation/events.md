# Events

In traditional data oriented systems one models the tables and relationship in
a relational model, or the documents in a collection for a document oriented approach.
With an [event sourced](./event-sourcing.md) system, these are seen as the consequence
and is still something one models. But it is the "how we got there" that is interesting
to model for an event driven and event sourced system.

## Atomic state changes

Events represents changes that occur in a system and should be modelled in an atomic
yet cohesive way. The things that needs to change together or makes sense to model together
goes on the event.

> IMPORTANT: It is not the goal to have events are broken down to a property level e.g. **SomePropertyChanged**,
> but rather capture business moments - something of significance.

## Naming

Since events are considered to be something that has happened to the system, therefor
they should be named accordingly. Names should be in past-tense; **ItemAddedToShoppingCart**.
They should also describe exactly what really happened and not be thought of as an
encapsulation of [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete).
The naming should be a natural fit in the [ubiquitous language of the domain](https://en.wikipedia.org/wiki/Domain-driven_design)
the feature belongs to.

## Technically

Events are represented as class types. These are registered with the Dolittle runtime as known
event types. The way you create these is as follows:

```typescript
import { eventType } from '@dolittle/sdk.events';

@eventType('157ea70c-43c5-4897-9eeb-630718d9ecbf')      // Unique identifier that is programming language agnostic
export class ItemAddedToShoppingCart {
    constructor(readonly item: string, readonly quantity: string, readonly price: string) {
    }
}
```

Notice the use of a constructor with the **readonly** modifier on the arguments going in.
With TypeScript, when adding these modifiers - the arguments automatically become properties
on the event. The nice thing about this approach is that it becomes very clear what is needed
on the event. Events should **never** have optionals on them; either it happened or it didn't.

An alternative to this is making them properties and using the **!** modifier to make them
required:

```typescript
import { eventType } from '@dolittle/sdk.events';

@eventType('157ea70c-43c5-4897-9eeb-630718d9ecbf')      // Unique identifier that is programming language agnostic
export class ItemAddedToShoppingCart {
    item!: string;
    quantity!: string;
    private!: string;
}
```

As you can see, the **readonly** modifier is not required. However, it does add some value to
have the **readonly** modifier; events are immutable. Meaning, that once they have been committed
to the event store - nothing can change these. Making that clear to developers using the events
is therefor very useful. So a better representation of it would be:

```typescript
import { eventType } from '@dolittle/sdk.events';

@eventType('157ea70c-43c5-4897-9eeb-630718d9ecbf')      // Unique identifier that is programming language agnostic
export class ItemAddedToShoppingCart {
    readonly item!: string;
    readonly quantity!: string;
    readonly private!: string;
}
```

## Private events

We break events up into to visibility classifications; private and public. The private events
are considered private  to the microservice and is not communicated outside of the microservice.
This gives the microservice more freedom over these kinds of events and can change them as it
pleases, since the microservice is a deployable unit.

## Public events

For events that are going between microservices, as described [here](./event-horizon.md),
one needs to consider these as the contract with the outside world of the microservice.
That means changing these has a consequence for the receiver - and you don't know who the
receiver is.

> Dolittle is working on a way to deal with versioning of events and tooling related to this
> to make it possible to do what is known as up-casting and down-casting of events between
> different versions.