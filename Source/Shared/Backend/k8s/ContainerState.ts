// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { RunningState } from './RunningState';
import { TerminatedState } from './TerminatedState';
import { WaitingState } from './WaitingState';

export interface ContainerState {
    running?: RunningState;
    terminated?: TerminatedState;
    waiting?: WaitingState;
}
