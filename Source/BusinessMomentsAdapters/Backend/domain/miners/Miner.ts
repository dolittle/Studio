// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { AggregateRoot, aggregateRoot } from '@dolittle/sdk.aggregates';
import { Guid } from '@dolittle/rudiments';
import { EntityAssociatedWithMiner, ImperativeEmbedDefined } from '../../events/miners';

@aggregateRoot('f4d99676-cd37-4e7e-8a03-95cd29b5927d')
export class Miner extends AggregateRoot {

    associateEntity(entityId: Guid) {
        this.apply(new EntityAssociatedWithMiner(entityId.toString()));
    }

    defineEmbed(code: string): void {
        this.apply(new ImperativeEmbedDefined(code));
    }
}
