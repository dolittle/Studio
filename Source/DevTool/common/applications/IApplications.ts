// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application, Microservice } from '@dolittle/vanir-common';
import { ApplicationStatus } from './ApplicationStatus';
export const IApplicationsToken = 'IApplications';

export enum RunningInstanceType {
    Mongo,
    Ingress,
    Runtime,
    Backend,
    Web,
};

export interface IApplications {
    start(path: string, application: Application): Promise<void>;
    stop(path: string, application: Application): Promise<void>;
    getStatusFor(id: string): Promise<ApplicationStatus>;
    captureLogFor(application: Application, instance: RunningInstanceType, microservice?: Microservice): Promise<void>;
}
