// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { eventType } from '@dolittle/sdk.events';

@eventType('9f9345d2-70c9-43c2-b130-389801698ac5')
export class ImperativeFilterDefined {
    constructor(readonly code: string) { }
}
