// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IProjectionFor, ProjectionBuilder, projectionFor } from '@dolittle/projections';
import { Miner } from './Miner';
import { ImperativeEmbedDefined } from '../../events/miners';

@projectionFor(Miner, '7b1c727c-f53b-4745-88f9-e18f25657757')
export class MinerProjection implements IProjectionFor<Miner> {
    define(projectionBuilder: ProjectionBuilder<Miner>): void {
        projectionBuilder
            .configureModel(_ => _.withName('miners'))
            .from(ImperativeEmbedDefined, _ => _
                .set(c => c.imperativeEmbed).to(ev => ev.code))
            ;

    }
}
