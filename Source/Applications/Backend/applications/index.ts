// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

// is this really necessary? does something use this?
export * from './Application';
export * from './ApplicationQueries';
export * from './Microservice';
export * from './MicroserviceQueries';

import { ClientBuilder } from '@dolittle/sdk';
import { Application, ApplicationModel } from './Application';
import { ApplicationCreated } from './events';
import { MicroserviceCreated } from './events/MicroserviceCreated';
import { Microservice, MicroserviceModel } from './Microservice';

export function projectFromEventsToReadModels(clientBuilder: ClientBuilder) {
    clientBuilder.withEventTypes(_ => {
        _.register(ApplicationCreated);
        _.register(MicroserviceCreated);
    });

    clientBuilder
        .withProjectionFor(
            Application,
            builder => {
                builder
                    .withId('c25d1a88-fd4c-4b78-ac81-f90c3545fab9')
                    .fromScope('da92a933-a4c5-478d-a0c4-49aeef72f6d5')
                    .useModel(ApplicationModel)
                    .set(
                        model => model.name,
                        projection => projection.from(ApplicationCreated, e => e.name))
                    .set(
                        model => model.applicationId,
                        projection => projection.from(ApplicationCreated, e => e.id)
                    );
            }
        );

    clientBuilder
        .withProjectionFor(
            Microservice,
            builder => {
                builder
                    .withId('4D074AFD-C01F-4904-99CF-03ED609BD222')
                    .fromScope('da92a933-a4c5-478d-a0c4-49aeef72f6d5')
                    .useModel(MicroserviceModel)
                    .set(
                        model => model.name,
                        projection => projection
                            .from(
                                MicroserviceCreated,
                                evt => evt.name
                            )
                    )
                    .set(
                        model => model.microserviceId,
                        projection => projection
                            .from(
                                MicroserviceCreated,
                                evt => evt.id
                            )
                    );
            }
        )
}