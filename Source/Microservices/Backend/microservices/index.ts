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
                    .withId('3E514A82-B12D-499B-81A0-EA20B7CD5A77')
                    .inScope('da92a933-a4c5-478d-a0c4-49aeef72f6d5')
                    .from(MicroserviceCreated, e => e
                        .usingKeyFrom(ev => ev.id)
                        .set(model => model.name).to(ev => ev.name)
                    );
            }
        );
}