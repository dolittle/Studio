// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { AggregateRoot, aggregateRoot } from '@dolittle/sdk.aggregates';
import * as events from '../../events/entities';
import { EventSourceId } from '@dolittle/sdk.events';

@aggregateRoot('4687e8dd-95fa-4d01-8ef1-5fa4644acb5c')
export class Entity extends AggregateRoot {

    constructor(eventSourceId: EventSourceId) {
        super(eventSourceId);
    }

    defineFilter(code: string): void {
        this.apply(new events.ImperativeFilterDefined(code));
    }

    defineTransform(code: string): void {
        this.apply(new events.ImperativeTransformDefined(code));
    }

    defineProjection(code: string): void {
        this.apply(new events.ImperativeProjectionDefined(code));
    }
}
