// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IProjectionFor, ProjectionBuilder, projectionFor } from '@dolittle/projections';
import { ApplicationStatistics } from './ApplicationStatistics';
import { ApplicationCreated } from '../../events/applications/ApplicationCreated';

@projectionFor(ApplicationStatistics, '12a500e3-3e6a-41ad-9512-37d66bf2c053')
export class ApplicationStatisticsProjection implements IProjectionFor<ApplicationStatistics> {
    define(projectionBuilder: ProjectionBuilder<ApplicationStatistics>): void {
        projectionBuilder
            .configureModel(_ => _
                .withName('application-statistics')
                .withInitialState({
                    count: 0
                })
            )
            .from(ApplicationCreated, f => f
                .usingCompositeKeyFromContext(
                    _ => _.occurred.year,
                    _ => _.occurred.month,
                    _ => _.occurred.day,
                    _ => _.occurred.hour,
                    _ => _.occurred.minute
                )
                .count(r => r.count));
    }

}
