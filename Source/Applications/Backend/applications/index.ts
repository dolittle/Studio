// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

// is this really necessary? does something use this?
export * from './Application';
export * from './ApplicationQueries';
export * from './Microservice';
export * from './MicroserviceQueries';

import { ClientBuilder } from '@dolittle/sdk';
import { Application } from './Application';
import { ApplicationCreated } from './events';
import { MicroserviceCreated } from './events/MicroserviceCreated';
import { Microservice } from './Microservice';

export function projectFromEventsToReadModels(clientBuilder: ClientBuilder) {
    clientBuilder.withEventTypes(_ => {
        _.register(ApplicationCreated);
        _.register(MicroserviceCreated);
    });

    clientBuilder
        .withProjectionFor(
            Application,
            builder => builder
                .withId('4b0eb09f-4aa9-4ea6-a24e-25241f4be4ca')
                .inScope('da92a933-a4c5-478d-a0c4-49aeef72f6d5')
                .useModelName('applications')
                .from(ApplicationCreated, e => e
                    .usingKeyFrom(ev => ev.id)
                    .set(model => model.name).to(ev => ev.name))
        );

    clientBuilder
        .withProjectionFor(
            Microservice,
            builder => builder
                .withId('8d28b74a-0b18-4665-a4e8-70c9518cf05a')
                .inScope('da92a933-a4c5-478d-a0c4-49aeef72f6d5')
                .useModelName('microservices')
                .from(MicroserviceCreated, e => e
                    .usingKeyFrom(ev => ev.id)
                    .set(model => model.name).to(ev => ev.name)
                )
        );
}