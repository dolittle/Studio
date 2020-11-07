// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Application } from './Application';
import { ApplicationCreationResult } from './ApplicationCreationResult';
import { IApplications } from './IApplications';

@injectable()
export class Applications implements IApplications {
    create(application: Application): ApplicationCreationResult {
        console.log('Go Create');
        return new ApplicationCreationResult();
    }
}
