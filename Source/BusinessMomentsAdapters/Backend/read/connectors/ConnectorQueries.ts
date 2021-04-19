// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Resolver, Query } from 'type-graphql';
import { Connector } from './Connector';

@Resolver()
export class ConnectorQueries {

    @Query(() => [Connector])
    async allConnectors(): Promise<Connector[]> {
        return [];
    }
}
