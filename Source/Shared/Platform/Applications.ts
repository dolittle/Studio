// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { injectable } from 'tsyringe';
import { Application } from './Application';
import { ApplicationCreationResult } from './ApplicationCreationResult';
import { AssignMicroserviceToApplicationResult } from './AssignMicroserviceToApplicationResult';
import { IApplications } from './IApplications';

@injectable()
export class Applications implements IApplications {
    static readonly BaseUri: string = '/api/k8s/applications';

    async create(application: Application): Promise<ApplicationCreationResult> {
        const result = await fetch(Applications.BaseUri, {
            method: 'POST',
            body: JSON.stringify(application),
            headers:{'content-type': 'application/json'}
        });
        const jsonResult = await result.json();
        return { message: jsonResult.message };
    }

    async assignMicroserviceToApplication(applicationId: Guid, microserviceId: Guid): Promise<AssignMicroserviceToApplicationResult> {
        const endpoint = `${Applications.BaseUri}/${applicationId}/microservices/${microserviceId}`;
        const result = await fetch(endpoint,{
            method: 'POST',
            headers:{'content-type': 'application/json'}
        });

        const jsonResult = await result.json() as AssignMicroserviceToApplicationResult;
        return {message: jsonResult.message};
    }
}
