// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IProjectionFor, ProjectionBuilder, projectionFor } from '@dolittle/projections';
import { Connector } from './Connector';
import { ImperativeEmbedDefined, ImperativeTransformDefined, ImperativeProjectionDefined } from '../../events/connectors';

@projectionFor(Connector, '71b9ae96-c130-4bee-a84e-df12c3b7420f')
export class ConnectorProjection implements IProjectionFor<Connector> {
    define(projectionBuilder: ProjectionBuilder<Connector>): void {
        projectionBuilder
            .configureModel(_ => _.withName('connectors'))
            .from(ImperativeEmbedDefined, _ => _
                .set(c => c.imperativeEmbed).to(ev => ev.code))
            .from(ImperativeTransformDefined, _ => _
                .set(c => c.imperativeTransform).to(ev => ev.code))
            .from(ImperativeProjectionDefined, _ => _
                .set(c => c.imperativeProjection).to(ev => ev.code))
            ;

    }
}
