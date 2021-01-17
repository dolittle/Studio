// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Workspace } from '../../common/workspaces';
import { MicroservicePorts } from '../../common/workspaces/MicroservicePorts';

export abstract class IMicroservicePortsAllocator {
    abstract allocateFor(workspace: Workspace): MicroservicePorts[];
}

