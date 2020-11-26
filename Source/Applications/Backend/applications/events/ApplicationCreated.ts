// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { eventType } from '@dolittle/sdk.events';

@eventType('6ed96d5c-8a04-439b-bfd3-adc9225e4769')
export class ApplicationCreated {
    constructor(readonly id: string = '', readonly name: string = '') {}
}

