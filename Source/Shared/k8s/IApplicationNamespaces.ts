// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { V1Namespace } from '@kubernetes/client-node';

export abstract class IApplicationNamespaces {
    getNamespacesForTenant!: (tenantId: string) => V1Namespace[];
}
