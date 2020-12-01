// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Guid } from '@dolittle/rudiments';
import { MicroserviceModel } from './MicroserviceModel';
import { TenantModel } from './TenantModel';

export type EnvironmentModel = {
    id: Guid;
    environmentId: Guid;
    name: string;
    tenants: TenantModel[];
    microservices: MicroserviceModel[];
};
