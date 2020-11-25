// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { Application } from './Application';
import { ApplicationCreationResult } from './ApplicationCreationResult';
import { AssignMicroserviceToApplicationResult } from './AssignMicroserviceToApplicationResult';

export abstract class IApplications {
    abstract create(application: Application): Promise<ApplicationCreationResult>;
    abstract assignMicroserviceToApplication(
        applicationId: Guid,
        microserviceId: Guid
    ): Promise<AssignMicroserviceToApplicationResult>;
}
