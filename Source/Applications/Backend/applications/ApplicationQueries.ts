// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Query, Resolver, Arg } from 'type-graphql';
import { ILogger } from '@shared/backend/logging';
import { injectable } from 'tsyringe';
import { Application, ApplicationModel } from './Application';


@injectable()
@Resolver(Application)
export class ApplicationQueries {
    constructor(private readonly _logger: ILogger) {
    }

    @Query(returns => [Application])
    async allApplications() {

       return [];
    }
}
