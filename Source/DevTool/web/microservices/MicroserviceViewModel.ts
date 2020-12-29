// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Microservices } from '../Microservices';
import { injectable } from 'tsyringe';
import { Microservice, Application } from '@dolittle/vanir-common';
import { Applications } from '../Applications';

@injectable()
export class MicroserviceViewModel {
    application: Application;
    microservice!: Microservice;

    constructor(readonly applications: Applications, readonly microservices: Microservices) {
        applications.current.subscribe(_ => this.application = _);
        microservices.current.subscribe(_ => this.microservice = _);
    }
}
