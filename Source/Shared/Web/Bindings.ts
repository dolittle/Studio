import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DataSource } from './DataSource';
import { constructor } from '@shared/dependencyinversion';
import { container } from 'tsyringe';
import { Configuration } from './Configuration';

export class Bindings {
    static initialize(configuration: Configuration) {
        const cache = new InMemoryCache();
        const link = new HttpLink({
            uri: `/_/${configuration.prefix}/graphql`
        });

        const client = new ApolloClient({
            cache,
            link,
            name: `${configuration.name} Client`,
            version: configuration.versionInfo.version,
            queryDeduplication: false,
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'cache-and-network'
                }
            }
        });

        container.registerInstance(DataSource as constructor<DataSource>, client);
    }
}