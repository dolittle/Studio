// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';
import { Host } from '@dolittle/vanir-backend';

import * as ApplicationsDomain from './domain/applications';
import * as ApplicationsEvents from './events/applications';
import * as ApplicationsExternal from './external/applications';
import * as ApplicationsRead from './read/applications';

(async () => {
    await Host.start({
        graphQLResolvers: [
            ...ApplicationsDomain.CommandHandlers,
            ...ApplicationsRead.Queries
        ],
        eventTypes: [
            ...ApplicationsEvents.EventTypes
        ],
        eventHandlerTypes: [
            ...ApplicationsExternal.EventHandlers
        ]
    });
})();

