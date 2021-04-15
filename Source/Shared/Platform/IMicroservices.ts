// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Microservice } from './Microservice';
import { MicroserviceCreationResult } from './MicroserviceCreationResult';

export abstract class IMicroservices {
    abstract create(microservice: Microservice): Promise<MicroserviceCreationResult>;
}
