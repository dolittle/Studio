// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { eventType } from '@dolittle/sdk.events';

@eventType('4e9932b4-3551-4fc5-a4e4-4bc7a1c6ac26')
export class MinerAddedToConnector {
    constructor(readonly minerId: string, readonly name: string) { }
}
