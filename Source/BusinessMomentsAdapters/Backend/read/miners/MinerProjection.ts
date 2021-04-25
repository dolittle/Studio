// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IProjectionFor, ProjectionBuilder, projectionFor } from '@dolittle/projections';
import { Miner } from './Miner';
import { EntityAssociatedWithMiner, ImperativeEmbedDefined } from '../../events/miners';
import { MinerAddedToConnector } from '../../events/connectors/MinerAddedToConnector';

@projectionFor(Miner, '66b9eb53-6010-46ee-a7c0-6bf6e71969f6')
export class MinerProjection implements IProjectionFor<Miner> {
    define(projectionBuilder: ProjectionBuilder<Miner>): void {
        projectionBuilder
            .configureModel(_ => _.withName('miners'))
            .from(MinerAddedToConnector, _ => _
                .usingKeyFrom(ev => ev.minerId)
                .set(c => c.name).to(ev => ev.name))
            .from(ImperativeEmbedDefined, _ => _
                .set(c => c.imperativeEmbed).to(ev => ev.code))
            .from(EntityAssociatedWithMiner, _ => _
                .set(c => c.entityId).to(ev => ev.entityId))
            ;
    }
}
