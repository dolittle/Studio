// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { RunState } from './index';
import { InstanceType } from './InstanceType';

export type InstanceState = {
    id: string;
    name: string;
    state: RunState;
    type: InstanceType;
    started: Date;
};
