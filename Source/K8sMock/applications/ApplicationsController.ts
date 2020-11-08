// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { IEventStore } from '@shared/backend/dolittle';
import { Body, Controller, Post, Route } from 'tsoa';
import { injectable } from 'tsyringe';
import { ApplicationCreated } from './ApplicationCreated';
import { ApplicationCreateRequest } from './ApplicationCreateRequest';
import { ApplicationCreateResponse } from './ApplicationCreateResponse';

@Route('api/k8s/applications')
@injectable()
export class ApplicationsController extends Controller {

    constructor(private readonly _eventStore: IEventStore) {
        super();
    }

    @Post()
    async create(@Body() application: ApplicationCreateRequest): Promise<ApplicationCreateResponse> {
        this.setStatus(200);

        const event = new ApplicationCreated(application.name);
        await this._eventStore.commitPublic(event, Guid.create());

        return {
            name: application.name,
            result: 'Created'
        } as ApplicationCreateResponse;
    }
}
