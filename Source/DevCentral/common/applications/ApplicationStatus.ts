// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ApplicationRunState } from './ApplicationRunState';
import { ContainerInfo } from 'dockerode';

export type ApplicationStatus = {
    runState: ApplicationRunState;
    containers: ContainerInfo[];
};


