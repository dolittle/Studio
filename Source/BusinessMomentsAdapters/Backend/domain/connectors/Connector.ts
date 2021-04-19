// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { AggregateRoot, aggregateRoot } from '@dolittle/sdk.aggregates';
import { EventSourceId } from '@dolittle/sdk.events';

@aggregateRoot('32d9629e-5484-45b2-848a-77c4bb1db0f8')
export class Connector extends AggregateRoot {
    constructor(eventSourceId: EventSourceId) {
        super(eventSourceId);
    }

    defineEmbed(code: string): void {
        console.log(`Hello from the connector - ${code} !! `);
    }
}
