// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MicroservicePorts } from '../../common/workspaces/MicroservicePorts';
import { TenantFile } from './TenantFile';

export type WorkspaceFile = {
    id: string;
    ports: MicroservicePorts[];
    tenants: TenantFile[];
};
