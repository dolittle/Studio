// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { AggregateRoot, aggregateRoot } from '@dolittle/sdk.aggregates';
import { EventSourceId } from '@dolittle/sdk.events';

@aggregateRoot('ca471c4d-33cb-4d9b-b85f-3b6e193f5cca')
export class Connectors extends AggregateRoot {
    constructor(eventSourceId: EventSourceId) {
        super(eventSourceId);
    }
}
