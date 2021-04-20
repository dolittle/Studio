// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { eventType } from '@dolittle/sdk.events';

@eventType('5492cfaf-ccb6-40ed-bb38-a8a0661834aa')
export class ImperativeProjectionDefined {
    constructor(readonly code: string) { }
}
