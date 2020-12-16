# Streams

Within the [event store](./event-store.md) sits the concept of streams.
Streams are defined by filters that filter events being committed to the event store.
All events are first put into the event log and then the stream processing
mechanism runs through all filters. Any filters that accepts the event will
have the event added to the stream representing the filter.

## Append only

Streams are considered append only. That means that if the definition of the
filter for the stream changes and it starts including events that has already
happened before the tip of the stream, you'll get an error from the Dolittle Runtime
service that manages the streams.

To overcome this, you would need to redefine the stream from the start - effectively
re-establish the streams content. The easiest way to do this is to change the identifier
of the filter. The consequence of this is that any processor of events in the stream
will now run from the beginning of the stream.
