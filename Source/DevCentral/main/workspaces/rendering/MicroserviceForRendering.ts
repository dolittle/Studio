// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MicroservicePortsForRendering } from './MicroservicePortsForRendering';

export type MicroserviceForRendering = {
    id: string;
    name: string;
    applicationName: string;
    portal: boolean;
    ports: MicroservicePortsForRendering;
};
