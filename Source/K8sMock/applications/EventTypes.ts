// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ClientBuilder } from '@dolittle/sdk';
import { ApplicationCreated } from './ApplicationCreated';

export const RegisterEventTypes = (clientBuilder: ClientBuilder) => {

    clientBuilder.withEventTypes(_ => {
        _.register(ApplicationCreated);
    });
};