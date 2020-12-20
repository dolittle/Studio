// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { Constructor } from '@dolittle/types';
import { buildSchema, Field, ObjectType, Query, Resolver, ResolverData } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

import { GuidScalar } from '.';
import { container } from 'tsyringe';
import { guid } from './guid';

@ObjectType()
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


export async function getSchemaFor(resolvers: Constructor[]): Promise<GraphQLSchema> {

    const schema = await buildSchema({
        resolvers: resolvers.length > 0 ? resolvers as any : [NoQueries],
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
