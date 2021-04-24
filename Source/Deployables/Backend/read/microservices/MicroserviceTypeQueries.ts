// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Resolver, Query } from 'type-graphql';
import { graphRoot } from '@dolittle/vanir-backend';
import { MicroserviceType } from './MicroserviceType';
import { MicroserviceTypes } from '../../concepts/MicroserviceTypes';

@Resolver()
@graphRoot('microservices')
export class MicroserviceTypeQueries {

    @Query(() => [MicroserviceType])
    allMicroserviceTypes(): MicroserviceType[] {
        return [
            { id: MicroserviceTypes.Custom, name: 'Custom' },
            { id: MicroserviceTypes.BusinessMomentsAdapter, name: 'Business Moments Adapter' }
        ];
    }
}
