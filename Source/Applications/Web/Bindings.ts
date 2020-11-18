// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DataSource } from './DataSource';
import { constructor } from '@shared/dependencyinversion';
import { container } from 'tsyringe';

const versionInfo = require('../version.json');

export class Bindings {
    static initialize() {
        const cache = new InMemoryCache();
        const link = new HttpLink({
            uri: '/_/applications/graphql/',
        });

        const client = new ApolloClient({
            cache,
            link,
            name: 'Studio Applications Client',
            version: versionInfo.version,
            queryDeduplication: false,
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'cache-and-network',
                },
            },
        });

        container.registerInstance(DataSource as constructor<DataSource>, client);
    }
}
