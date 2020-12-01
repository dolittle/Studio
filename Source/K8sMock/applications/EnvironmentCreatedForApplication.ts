// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { eventType } from '@dolittle/sdk.events';

@eventType('36b05ea4-ec40-4b7a-b123-5820999ce39f')
export class EnvironmentCreatedForApplication {
    constructor(readonly id: string = '', readonly name: string = '', readonly applicationId: string) {}
}
