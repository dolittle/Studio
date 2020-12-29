// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Microservices } from './Microservices';
import { injectable } from 'tsyringe';
import { Microservice } from '@dolittle/vanir-common';

@injectable()
export class MicroserviceViewModel {
    microservice?: Microservice;

    constructor(readonly microservices: Microservices) {
        microservices.current.subscribe(_ => {
            this.microservice = _;
        });
    }
}
