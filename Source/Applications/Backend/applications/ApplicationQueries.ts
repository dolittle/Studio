// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Query, Resolver, Arg } from 'type-graphql';
import { ILogger } from '@shared/backend/logging';
import { injectable } from 'tsyringe';
import { Application, ApplicationModel } from './Application';

import { NamespaceList } from '@shared/backend/k8s/NamespaceList';

import { Guid } from '@dolittle/rudiments';
import fetch from 'node-fetch';

@injectable()
@Resolver(Application)
export class ApplicationQueries {
    constructor(private readonly _logger: ILogger) {
    }

    @Query(returns => [Application])
    async allApplications() {

        const response = await fetch('http://localhost:3001/api/v1/namespaces');
        const namespaces = await response.json() as NamespaceList;

        const applications = namespaces.items.map(_ => {
            const guid = _.metadata.name.replace('application-', '');
            const application = new Application();
            application._id = Guid.parse(guid);
            application.name = _.metadata.labels.application || 'unknown';
            return application;
        });

        return applications;
    }
}