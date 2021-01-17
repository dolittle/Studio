// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';

export const invokeServiceMethodEvent = 'invoke-service-method';
export const invokeServiceMethodEventResponse = 'invoke-service-method-result';

export class Call {
    readonly id: string;

    readonly responseEventName: string;

    constructor(readonly service: string, readonly method: string, readonly args: any[]) {
        this.id = Guid.create().toString();
        this.responseEventName = `${invokeServiceMethodEventResponse}-${this.id}`;
    }
}