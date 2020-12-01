// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { eventType } from '@dolittle/sdk.events';

@eventType('0e6eac84-2122-4434-bedc-ce4ea3db965c')
export class MicroserviceAssignedToApplicationForEnvironment {
    constructor(
        readonly applicationId: string,
        readonly environmentId: string,
        readonly microserviceId: string
    ) { }
}
