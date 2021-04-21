// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { AggregateRoot } from '@dolittle/sdk.aggregates';
import * as events from '../../events/entities';

export class Entity extends AggregateRoot {
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
