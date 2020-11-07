// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PropertyAccessor, PropertyPathResolverProxyHandler, PropertyAccessorDescriptor } from '@dolittle/types';

export class PropertyUtilities {
    static getPropertyDescriptorFor<T extends object>(propertyAccessor: PropertyAccessor<T>) {
        const handler = new PropertyPathResolverProxyHandler();
        const proxy = new Proxy<T>({} as T, handler);
        propertyAccessor(proxy);
        const propertyDescriptor = new PropertyAccessorDescriptor(propertyAccessor, [...handler.segments]);
        return propertyDescriptor;
    }
}
