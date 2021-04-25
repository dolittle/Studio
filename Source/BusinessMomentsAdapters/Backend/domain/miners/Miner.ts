// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { AggregateRoot, aggregateRoot, on } from '@dolittle/sdk.aggregates';
import { Guid } from '@dolittle/rudiments';
import { EntityAssociatedWithMiner, ImperativeEmbedDefined } from '../../events/miners';
import { BrokenRule } from '@dolittle/vanir-backend';

export const MinerAlreadyAssociatedWithEntity =
    BrokenRule.create('MinerAlreadyAssociatedWithEntity', 'Miner "{miner}" is already associated with entity "{entity}"');

@aggregateRoot('f4d99676-cd37-4e7e-8a03-95cd29b5927d')
export class Miner extends AggregateRoot {
    private _associatedEntity: Guid | undefined;

    associateEntity(entityId: Guid) {
        this.failIfMinerAlreadyAssociatedWithEntity();
        this.apply(new EntityAssociatedWithMiner(entityId.toString()));
    }

    defineEmbed(code: string): void {
        this.apply(new ImperativeEmbedDefined(code));
    }

    @on(EntityAssociatedWithMiner)
    onEntityAssociatedWithMiner(event: EntityAssociatedWithMiner) {
        this._associatedEntity = Guid.parse(event.entityId);
    }

    private failIfMinerAlreadyAssociatedWithEntity() {
        if (this._associatedEntity) {
            this.fail(MinerAlreadyAssociatedWithEntity, {
                miner: this.eventSourceId.toString(),
                entity: this._associatedEntity.toString()
            });
        }
    }
}
