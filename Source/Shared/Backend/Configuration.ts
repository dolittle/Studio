import { ExpressConfigCallback } from './web';
import { DolittleClientBuilderCallback } from './dolittle';
import { GraphQLSchema } from 'graphql';

export interface Configuration {
    prefix: string;
    publicPath: string;
    port: number,
    microserviceId: string;
    graphQLSchema: GraphQLSchema;
    defaultDatabaseName: string,
    dolittleRuntimePort: number;

    expressCallback?: ExpressConfigCallback;
    dolittleCallback?: DolittleClientBuilderCallback;
}
