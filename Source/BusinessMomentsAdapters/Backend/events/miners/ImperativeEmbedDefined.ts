// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { eventType } from '@dolittle/sdk.events';

@eventType('944a702b-302c-4856-89bc-f6830a8464ae')
export class ImperativeEmbedDefined {
    constructor(readonly code: string) { }
}
