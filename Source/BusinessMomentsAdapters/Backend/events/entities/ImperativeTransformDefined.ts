// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { eventType } from '@dolittle/sdk.events';

@eventType('3fb0d59b-0128-4fe7-9eaf-0fef7d9990d8')
export class ImperativeTransformDefined {
    constructor(readonly code: string) { }
}
