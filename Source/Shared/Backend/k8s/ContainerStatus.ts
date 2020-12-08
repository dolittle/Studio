// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ContainerState } from './ContainerState';

export interface ContainerStatus {
    containerID: string;
    image: string;
    imageID: string;
    name: string;
    ready: boolean;
    started: boolean;
    restartCount: number;
    state: ContainerState;
    lastState: ContainerState;
}
