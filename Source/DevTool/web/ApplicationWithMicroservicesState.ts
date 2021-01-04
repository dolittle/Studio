// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MicroserviceState } from '../common/applications';

export type ApplicationWithMicroservicesState = {
    applicationId: string;
    microservices: MicroserviceState[];
};
