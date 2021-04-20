// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { AggregateRoot, aggregateRoot } from '@dolittle/sdk.aggregates';
import { EventSourceId } from '@dolittle/sdk.events';
import { ImperativeEmbedDefined } from '../../events/connectors/ImperativeEmbedDefined';
import { ImperativeTransformDefined } from '../../events/connectors/ImperativeTransformDefined';
import { ImperativeProjectionDefined } from '../../events/connectors/ImperativeProjectionDefined';


@aggregateRoot('32d9629e-5484-45b2-848a-77c4bb1db0f8')
export class Connector extends AggregateRoot {
    constructor(eventSourceId: EventSourceId) {
        super(eventSourceId);
    }

    defineEmbed(code: string): void {
        this.apply(new ImperativeEmbedDefined(code));
    }

    defineTransform(code: string): void {
        this.apply(new ImperativeTransformDefined(code));
    }

    defineProjection(code: string): void {
        this.apply(new ImperativeProjectionDefined(code));
    }
}


