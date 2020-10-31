import { buildSchema, Field, ObjectType, Query, Resolver, ResolverData } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

import { guid, GuidScalar } from '@shared/backend/data';
import { Guid } from '@dolittle/rudiments';
import { modelOptions, Severity } from '@typegoose/typegoose';
import { container } from 'tsyringe';

@ObjectType()
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
class Nothing {
    @Field({ name: 'id' })
    @guid()
    _id?: Guid;
}


@Resolver(Nothing)
class NoQueries {
    @Query(returns => [Nothing])
    async noresults() {
        return [];
    }
}


export async function getSchema(): Promise<GraphQLSchema> {
    const schema = await buildSchema({
        resolvers: [NoQueries],
        container: {
            get(someClass: any, resolverData: ResolverData<any>): any | Promise<any> {
                return container.resolve(someClass);
            }
        },
        scalarsMap: [
            { type: Guid, scalar: GuidScalar }
        ]
    });

    return schema;
}
