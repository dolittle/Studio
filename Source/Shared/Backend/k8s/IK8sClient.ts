// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { NamespaceList } from './NamespaceList';
import { PodList } from './PodList';

export abstract class IK8sClient {
    getNamespaces!: () => Promise<NamespaceList>;
    getPods!: (namespace: string) => Promise<PodList>;
}
