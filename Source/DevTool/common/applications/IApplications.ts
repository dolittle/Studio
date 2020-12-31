// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application } from '@dolittle/vanir-common';
import { ApplicationStatus } from './ApplicationStatus';
export const IApplicationsToken = 'IApplications';

export interface IApplications {

    start(path: string, application: Application): Promise<void>;
    stop(path: string, application: Application): Promise<void>;
    getStatusFor(id: string): Promise<ApplicationStatus>;
}