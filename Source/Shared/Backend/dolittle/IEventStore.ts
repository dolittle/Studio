// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { EventType } from '@dolittle/sdk.artifacts';
import { Cancellation } from '@dolittle/sdk.resilience';

import { IEventStore as IActualEventStore, UncommittedEvent, CommitEventsResult } from '@dolittle/sdk.events';

export abstract class IEventStore implements IActualEventStore {
    abstract commit(event: any, eventSourceId: Guid | string, eventType?: EventType | Guid | string, cancellation?: Cancellation): Promise<CommitEventsResult>;
    abstract commit(eventOrEvents: UncommittedEvent | UncommittedEvent[], cancellation?: Cancellation): Promise<CommitEventsResult>;
    abstract commitPublic(event: any, eventSourceId: Guid | string, eventType?: EventType | Guid | string, cancellation?: Cancellation): Promise<CommitEventsResult>;
}