// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { eventType } from '@dolittle/sdk.events';

@eventType('bc47d761-eed9-4486-b66b-3adaa3a0f4c6')
export class MicroserviceCreated {
    constructor(readonly id: string = '', readonly name: string = '') {}
}
