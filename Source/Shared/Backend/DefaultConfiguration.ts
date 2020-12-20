// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';

export default {
    routeSegment: '',
    isRooted: false,
    publicPath: './public',
    port: 80,
    microserviceId: Guid.empty.toString(),
    database: {
        host: 'localhost',
        database: 'data',
        port: 27017
    },
    eventStore: {
        host: 'localhost',
        database: 'events',
        port: 27017
    },
    dolittle: {
        runtime: {
            host: 'localhost',
            port: 50053
        }
    }
}