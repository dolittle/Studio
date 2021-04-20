// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IProjectionFor, ProjectionBuilder, projectionFor } from '@dolittle/projections';
import { Entity } from './Entity';
import { ImperativeFilterDefined, ImperativeTransformDefined, ImperativeProjectionDefined } from '../../events/entities';

@projectionFor(Entity, 'f8b1e482-f9aa-44b4-9a22-0a590ea55801')
export class EntityProjection implements IProjectionFor<Entity> {
    define(projectionBuilder: ProjectionBuilder<Entity>): void {
        projectionBuilder
            .configureModel(_ => _.withName('entities'))
            .from(ImperativeFilterDefined, _ => _
                .set(c => c.imperativeFilter).to(ev => ev.code))
            .from(ImperativeTransformDefined, _ => _
                .set(c => c.imperativeTransform).to(ev => ev.code))
            .from(ImperativeProjectionDefined, _ => _
                .set(c => c.imperativeProjection).to(ev => ev.code))
            ;
    }
}
