// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ApplicationStatus } from './ApplicationStatus';
export const IApplicationsToken = 'IApplications';

export interface IApplications {
    getStatusFor(id: string): Promise<ApplicationStatus>;
}