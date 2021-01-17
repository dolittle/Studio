// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MicroservicePorts } from '../../common/workspaces/MicroservicePorts';

export type WorkspaceFile = {
    path: string;
    ports: MicroservicePorts[];
};
