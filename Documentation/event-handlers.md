# Event Handlers

In addition to data - or current state that is provided by [projections](./projections.md),
one can also react to events and perform tasks related to this. These tasks could be things that
require more long running attention - or tasks that communicate with other systems like sending
email messages or similar.

> For an introduction to how event handlers are, it is recommended to try out the
> [Dolittle getting started tutorial](https://dolittle.io/tutorials/getting-started/typescript/).

## Decoupling

Event Handlers should be focused on a single responsibility. You can have as many event handlers you'd
like in a system and their definition of what events they handle are completely up to them.
You can have two different event handlers handling the same events with different unique identifiers for
their stream and each of these perform different tasks.

The benefit of this is that you'll get a more maintainable code base with clearly identified responsibilities.

> From the SOLID principles, the S - Single Responsibility Principle is probably the most important
> of them all. They all are important, but this is the one with the highest impact on the codebase
> when thinking about maintainability. Read more about it [here](https://en.wikipedia.org/wiki/Single-responsibility_principle).

## Event Handler Id === Stream Id

An important thing to remember is that the unique identifier given to the event handler in code is the
identifier of the [stream](./streams.md).

```typescript
import { EventContext } from '@dolittle/sdk.events';
import { eventHandler, handles } from '@dolittle/sdk.events.handling';
import { SomethingHappened } from './SomethingHappened';

@eventHandler('f2d366cf-c00a-4479-acc4-851e04b6fbba')   // Stream identifier
export class MyHandler {

    @handles(SomeEvent)
    somethingHappened(event: SomethingHappened, eventContext: EventContext) {
        // Do stuff
    }
}
```

This means that all events will be handled in the order they appear in that stream, partitioned
by default on the unique identifier of the event source.

## Things to keep in mind

When designing your event handler, it is a good idea for them to not mix the responsibility of
creating state and performing tasks. Keep these separate. If for some reason you'll need to restart a
[stream](./streams.md), there is a good chance you don't want to perform these types of tasks again.
