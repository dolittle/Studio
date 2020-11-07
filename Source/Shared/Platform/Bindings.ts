// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { constructor } from '@shared/dependencyinversion';
import { container } from 'tsyringe';
import { Applications } from './Applications';
import { IApplications } from './IApplications';
import { IMicroservices } from './IMicroservices';
import { Microservices } from './Microservices';

export class Bindings {
    static initialize() {
        container.registerType(IApplications as constructor<IApplications>, Applications);
        container.registerType(IMicroservices as constructor<IMicroservices>, Microservices);
    }
}
