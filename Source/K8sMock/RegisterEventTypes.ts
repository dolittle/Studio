// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ClientBuilder } from '@dolittle/sdk';
import { ApplicationCreated } from './applications/ApplicationCreated';
import { MicroserviceCreated } from './microservices/MicroserviceCreated';

export const RegisterEventTypes = (clientBuilder: ClientBuilder) => {

    clientBuilder.withEventTypes(_ => {
        _.register(MicroserviceCreated);
    });

    clientBuilder.withEventTypes(_ => {
        _.register(ApplicationCreated);
    });
};