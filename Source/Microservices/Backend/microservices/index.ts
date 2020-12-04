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
            builder => {
                builder
                    .withId('bf519ef8-d5b0-41f7-be03-4b30e7b3b65f')
                    .inScope('da92a933-a4c5-478d-a0c4-49aeef72f6d5')
                    .useModelName('microservices')
                    .from(MicroserviceCreated, e => e
                        .usingKeyFrom(ev => ev.id)
                        .set(model => model.name).to(ev => ev.name)
                    );
            }
        );
}