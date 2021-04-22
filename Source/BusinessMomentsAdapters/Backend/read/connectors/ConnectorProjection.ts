// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IProjectionFor, ProjectionBuilder, projectionFor } from '@dolittle/projections';
import { Connector } from './Connector';
import { ConnectorAddedToAdapter } from '../../events/adapters/ConnectorAddedToAdapter';

@projectionFor(Connector, '71b9ae96-c130-4bee-a84e-df12c3b7420e')
export class ConnectorProjection implements IProjectionFor<Connector> {
    define(projectionBuilder: ProjectionBuilder<Connector>): void {
        projectionBuilder
            .configureModel(_ => _.withName('connectors'))
            .from(ConnectorAddedToAdapter, _ => _
                .usingKeyFrom(ev => ev.connectorId)
                .set(c => c.adapterId).toContext(ev => ev.eventSourceId.value)
                .set(c => c.name).to(ev => ev.name)
                .set(c => c.connectorTypeId).to(ev => ev.connectorTypeId)
            );
    }
}
