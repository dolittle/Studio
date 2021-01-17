// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { InstanceType } from '../../common/applications/index';

export interface IRunningInstance {
    id: string;
    name: string;
    type: InstanceType;

    getLogs(): Promise<NodeJS.ReadableStream>;
    pause(): Promise<void>;
    stop(): Promise<void>;
}
