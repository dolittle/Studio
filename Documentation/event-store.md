# Event Store

At the center of everything sits the concept of the event store. In fact, this is the only thing
you as a developer has to work with with regards to events. The store makes sure to store the
events in the event log and asynchronously based on this create the different [streams](./streams.md)
that are defined.

Unlike more traditional systems which has the database front and center, theevent store is to be
considered the truth of a system.