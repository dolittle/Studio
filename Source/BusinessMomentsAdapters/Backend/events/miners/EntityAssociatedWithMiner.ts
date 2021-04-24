// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { eventType } from '@dolittle/sdk.events';

@eventType('69a52759-19a0-40ef-af51-dcff369438ab')
export class EntityAssociatedWithMiner {
    constructor(readonly entityId: string) { }
}
