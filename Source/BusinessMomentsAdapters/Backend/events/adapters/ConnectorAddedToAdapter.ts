// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { eventType } from '@dolittle/sdk.events';

@eventType('b2a5dde0-b7c2-42e4-905b-d886eceeda10')
export class ConnectorAddedToAdapter {
    constructor(
        readonly name: string,
        readonly connectorId: string,
        readonly connectorTypeId: string) {
    }
}
