// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { NamespaceList } from './NamespaceList';

export abstract class IK8sClient {
    getNamespaces!: () => Promise<NamespaceList>;
}
