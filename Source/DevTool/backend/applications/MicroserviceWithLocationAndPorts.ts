// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MicroservicePorts } from '../../common/workspaces/MicroservicePorts';

export type MicroserviceWithLocationAndPorts = {
    id: string;
    name: string;
    version: string;
    commit: string;
    built: string;
    location: string;
    ports: MicroservicePorts;
};
