// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IProjectionFor, ProjectionBuilder, projectionFor } from '@dolittle/projections';
import { Application } from './Application';
import { ApplicationCreated } from '../../events/applications/ApplicationCreated';

@projectionFor(Application, '8094cfcc-eb4a-4580-bd6b-fe486f29a7d7')
export class ApplicationProjection implements IProjectionFor<Application> {
    define(projectionBuilder: ProjectionBuilder<any>): void {
        projectionBuilder
            .configureModel(_ => _.withName('applications'))
            .from(ApplicationCreated, _ => _
                .usingKeyFrom(e => e.applicationId)
                .set(p => p.name).to(ev => ev.name));
    }
}


