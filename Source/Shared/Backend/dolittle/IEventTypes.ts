// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { Constructor } from '@dolittle/types';
import { EventType, EventTypeId, IEventTypes as IActualEventTypes } from '@dolittle/sdk.artifacts';

export abstract class IEventTypes implements IActualEventTypes {
    abstract hasTypeFor(input: EventType): boolean;
    abstract getTypeFor(input: EventType): Constructor<any>;
    abstract hasFor(type: Constructor<any>): boolean;
    abstract getFor(type: Constructor<any>): EventType;
    abstract resolveFrom(object: any, input?: EventType | EventTypeId | Guid | string): EventType;
    abstract associate(type: Constructor<any>, eventType: EventType): void;
}
