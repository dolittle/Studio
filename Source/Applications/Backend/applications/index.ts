// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export * from './Application';
export * from './ApplicationQueries';


import { ClientBuilder } from '@dolittle/sdk';
import { Application, ApplicationModel } from './Application';
import { ApplicationCreated } from './events';

export function projectFromEventsToReadModels(clientBuilder: ClientBuilder) {
    clientBuilder.withEventTypes(_ => {
        _.register(ApplicationCreated);
    });

    clientBuilder
        .withProjectionFor(
            Application,
            _ => {
                _.withId('c25d1a88-fd4c-4b78-ac81-f90c3545fab9')
                    .useModel(ApplicationModel)
                    .fromScope('da92a933-a4c5-478d-a0c4-49aeef72f6d5');
                _.set(a => a.name, p => p.from(ApplicationCreated, e => e.name));
                _.set(
                    a => a.applicationId,
                    p => p.from(ApplicationCreated, e => e.id)
                );
            }
        );
}