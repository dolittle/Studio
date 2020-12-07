// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PodMetadata } from './PodMetadata';
import { PodSpec } from './PodSpec';

export interface Pod {
    apiVersion?: string;
    kind?: string;
    metadata: PodMetadata;
    spec: PodSpec;
}

