// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { V1Deployment } from '@kubernetes/client-node';

import { Context } from '@shared/backend/web';

export abstract class IMicroserviceResources {
    getDeployments!: (namespace: string, ctx: Context) => Promise<V1Deployment[]>;
}
