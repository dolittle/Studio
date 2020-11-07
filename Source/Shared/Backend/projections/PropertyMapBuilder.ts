// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor, PropertyAccessor, PropertyAccessorDescriptor } from '@dolittle/types';
import { IReducer } from './IReducer';
import { PropertyMapper } from './PropertyMapper';
import { PropertyUtilities } from './PropertyUtilities';

export type PropertyMapBuilderCallback = (builder: PropertyMapBuilder) => void;

export class PropertyMapBuilder {
    private _eventType?: Constructor;
    private _sourceProperty?: PropertyAccessorDescriptor;

    constructor(private readonly _targetProperty: PropertyAccessorDescriptor) { }

    from<TEvent extends object>(eventType: Constructor<TEvent>, sourceProperty: PropertyAccessor<TEvent>) {
        this._sourceProperty = PropertyUtilities.getPropertyDescriptorFor(sourceProperty);
        this._eventType = eventType;
    }

    build(): IReducer<any> {
        return new PropertyMapper(this._eventType!, this._targetProperty, this._sourceProperty!);
    }
}
