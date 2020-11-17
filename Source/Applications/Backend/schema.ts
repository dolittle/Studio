// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { buildSchema, ResolverData } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

import { GuidScalar } from '@shared/backend/data';
import { Guid } from '@dolittle/rudiments';
import { container } from 'tsyringe';
import { ApplicationQueries } from './applications';

export async function getSchema(): Promise<GraphQLSchema> {
    const schema = await buildSchema({
        resolvers: [ApplicationQueries],
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