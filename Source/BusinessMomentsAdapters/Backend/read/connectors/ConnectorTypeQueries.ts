// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Resolver, Query } from 'type-graphql';
import { ConnectorType } from './ConnectorType';
import { ConnectorTypes } from '../../concepts';

@Resolver()
export class ConnectorTypeQueries {

    @Query(() => [ConnectorType])
    allConnectorTypes(): ConnectorType[] {
        return [
            { id: ConnectorTypes.WebHook, name: 'WebHook' }
        ];
    }
}
