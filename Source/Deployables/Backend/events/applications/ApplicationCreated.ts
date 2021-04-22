// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { eventType } from '@dolittle/sdk.events';

@eventType('9ef8bbfa-c735-4f68-8cb0-bc2036d68219')
export class ApplicationCreated {
    constructor(readonly applicationId: string, readonly name: string) { }
}
