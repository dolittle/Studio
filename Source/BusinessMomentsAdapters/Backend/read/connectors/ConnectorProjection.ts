// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IProjectionFor, ProjectionBuilder, projectionFor } from '@dolittle/projections';
import { Connector } from './Connector';
import { EmbedDefined } from '../../events/connectors/EmbedDefined';

@projectionFor(Connector, 'cbc63948-c388-4984-8d55-cbba21fb7b74')
export class ConnectorProjection implements IProjectionFor<Connector> {
    define(projectionBuilder: ProjectionBuilder<Connector>): void {
        projectionBuilder
            .configureModel(_ => _.withName('connectors'))
            .from(EmbedDefined, _ => _
                .set(c => c.embedCode).to(ev => ev.code));
    }
}
