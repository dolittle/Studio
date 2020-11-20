// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { IEventStore } from '@shared/backend/dolittle';
import { Body, Controller, Post, Route } from 'tsoa';
import { injectable } from 'tsyringe';
import { MicroserviceCreated } from './MicroserviceCreated';
import { MicroserviceCreateRequest } from './MicroserviceCreateRequest';
import { MicroserviceCreateResponse } from './MicroserviceCreateResponse';

@Route('api/k8s/Microservices')
@injectable()
export class MicroservicesController extends Controller {

    constructor(private readonly _eventStore: IEventStore) {
        super();
    }

    @Post()
    async create(@Body() microservice: MicroserviceCreateRequest): Promise<MicroserviceCreateResponse> {
        this.setStatus(200);

        const event = new MicroserviceCreated(
            Guid.create().toString(),
            microservice.name);
        await this._eventStore.commitPublic(event, Guid.create());

        return {
            name: microservice.name,
            result: 'Created'
        } as MicroserviceCreateResponse;
    }
}
