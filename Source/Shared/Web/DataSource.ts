import { OperationVariables, WatchQueryOptions, QueryOptions, MutationOptions, ApolloQueryResult, ObservableQuery } from 'apollo-client';
import { FetchResult } from 'apollo-link';

export abstract class DataSource {
    abstract watchQuery<T = any, TVariables = OperationVariables>(options: WatchQueryOptions<TVariables>): ObservableQuery<T, TVariables>;
    abstract query<T = any, TVariables = OperationVariables>(options: QueryOptions<TVariables>): Promise<ApolloQueryResult<T>>;
    abstract mutate<T = any, TVariables = OperationVariables>(options: MutationOptions<T, TVariables>): Promise<FetchResult<T>>;
}
