// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application } from './Application';
import { ApplicationCreationResult } from './ApplicationCreationResult';

export abstract class IApplications {
    abstract create(application: Application): Promise<ApplicationCreationResult>;
}

