// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { registerDecorator, ValidationArguments } from 'class-validator';
import { ConnectorTypes } from './ConnectorTypes';

export function connectorType() {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'connectorType',
            target: object.constructor,
            propertyName,
            constraints: [],
            options: {
                message: (validationArguments: ValidationArguments) => {
                    return `Connector of type '${validationArguments.value}' is not valid for '${validationArguments.object.constructor.name}'`;
                }
            },
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const connectorTypes = Object.values(ConnectorTypes);
                    return connectorTypes.some(_ => _.equals(value));
                }
            }
        });
    };
}
