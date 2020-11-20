// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export * from './Microservice';
export * from './MicroserviceQueries';


import { ClientBuilder } from '@dolittle/sdk';
import { Microservice, MicroserviceModel } from './Microservice';
import { MicroserviceCreated } from './events';

export function projectFromEventsToReadModels(clientBuilder: ClientBuilder) {
    clientBuilder.withEventTypes(_ => {
        _.register(MicroserviceCreated);
    });

    clientBuilder
        .withProjectionFor(
            Microservice,
            _ => {
                _.withId('c25d1a88-fd4c-4b78-ac81-f90c3545fab9')
                    .useModel(MicroserviceModel)
                    .fromScope('da92a933-a4c5-478d-a0c4-49aeef72f6d5');
                _.set(a => a.name, p => p.from(MicroserviceCreated, e => e.name));
                _.set(
                    a => a.microserviceId,
                    p => p.from(MicroserviceCreated, e => e.id)
                );
            }
        );
}