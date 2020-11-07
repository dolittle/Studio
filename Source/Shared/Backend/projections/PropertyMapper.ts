// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IReducer } from './IReducer';
import { Constructor, PropertyAccessorDescriptor } from '@dolittle/types';

export class PropertyMapper<TDocument extends object = any> implements IReducer<TDocument> {
    readonly eventTypes: Constructor[];
    readonly composite: boolean = false;

    constructor(eventType: Constructor,
        private readonly _targetProperty: PropertyAccessorDescriptor,
        private readonly _sourceProperty: PropertyAccessorDescriptor) {
        this.eventTypes = [eventType];
    }

    perform(initial: any, events: any[]) {
        for (const event of events) {
            const value = this._sourceProperty.accessor(event);

            let current = initial;
            this._targetProperty.segments.forEach((segment: string, index: number) => {
                if (index !== this._sourceProperty.segments.length - 1) {
                    current[segment] = current[segment] || {};
                } else {
                    current[segment] = value;
                }

                current = current[segment];
            });

            return initial;
        }
    }
}
