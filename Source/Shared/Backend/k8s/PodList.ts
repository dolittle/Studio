// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PodListMetadata } from './PodListMetadata';
import { Pod } from './Pod';

export interface PodList {
    apiVersion: string;
    items: Pod[];
    kind: string;
    metadata: PodListMetadata;
}
