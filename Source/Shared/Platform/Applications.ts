// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Application } from './Application';
import { ApplicationCreationResult } from './ApplicationCreationResult';
import { IApplications } from './IApplications';

@injectable()
export class Applications implements IApplications {
    async create(application: Application): Promise<ApplicationCreationResult> {
        console.log('Go Create');
        const result = await fetch('/api/k8s/ping');
        return new ApplicationCreationResult();
    }
}
