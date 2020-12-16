// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { V1Deployment } from '@kubernetes/client-node';

export abstract class IMicroserviceResources {
    getDeployments!: (namespace: string) => Promise<V1Deployment[]>;
}
