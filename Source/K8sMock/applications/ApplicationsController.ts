// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { IEventStore } from '@shared/backend/dolittle';
import { Body, Controller, Get, Post, Route } from 'tsoa';
import { injectable } from 'tsyringe';
import { ApplicationCreated } from './ApplicationCreated';
import { ApplicationCreateRequest } from './ApplicationCreateRequest';
import { ApplicationCreateResponse } from './ApplicationCreateResponse';
import { AssignMicroserviceToApplicationResponse } from './AssignMicroserviceToApplicationResponse';
import { MicroserviceAssignedToApplication } from './MicroserviceAssignedToApplication';

@Route('api/k8s/applications')
@injectable()
export class ApplicationsController extends Controller {

    constructor(private readonly _eventStore: IEventStore) {
        super();
    }

    @Post()
    async create(@Body() application: ApplicationCreateRequest): Promise<ApplicationCreateResponse> {
        this.setStatus(200);

        const event = new ApplicationCreated(
            Guid.create().toString(),
            application.name);
        await this._eventStore.commitPublic(event, Guid.create());

        return {
            name: application.name,
            result: 'Created'
        } as ApplicationCreateResponse;
    }

    @Post('{applicationId}/microservices/{microserviceId}')
    async assignMicroservice(applicationId: string, microserviceId: string)
        : Promise<AssignMicroserviceToApplicationResponse> {

        try {
            const event = new MicroserviceAssignedToApplication(
                applicationId,
                microserviceId
            )

            await this._eventStore.commitPublic(event, applicationId);

            this.setStatus(200);
            return { result: 'signed' };

        } catch (error) {
            this.setStatus(500);
            return {
                result: `failed with error: ${error?.message ?? 'no message'}`
            };
        }
    }
}
