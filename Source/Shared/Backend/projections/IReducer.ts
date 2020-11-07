// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/types';

export interface IReducer<TDocument> {
    eventTypes: Constructor[];
    composite: boolean;
    perform(initial: any, events: any[]): any;
}
