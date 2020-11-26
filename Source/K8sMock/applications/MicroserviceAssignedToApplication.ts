// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { eventType } from '@dolittle/sdk.events';

@eventType('DA487116-84D8-47C4-B9FB-74C4F766DC02')
export class MicroserviceAssignedToApplication {
    constructor(
        readonly applicationId: string,
        readonly microserviceId: string
    ) { }
}
