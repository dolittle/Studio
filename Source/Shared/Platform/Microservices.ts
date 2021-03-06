// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Microservice } from './Microservice';
import { MicroserviceCreationResult } from './MicroserviceCreationResult';
import { IMicroservices } from './IMicroservices';

@injectable()
export class Microservices implements IMicroservices {
    async create(microservice: Microservice): Promise<MicroserviceCreationResult> {
        console.log('Will Create Microservice 🦄');
        const result = await fetch('/api/k8s/microservices', {
            method: 'POST',
            body: JSON.stringify(microservice),
            headers:{'content-type': 'application/json'}
        });
        const jsonResult = await result.json();
        console.log('Microservice created! 🦄');
        return { message: jsonResult.message };
    }
}
