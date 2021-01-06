// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { RunState } from '../../../common/applications';

const runStateStrings: any = {};
runStateStrings[RunState.stopped] = 'Stopped';
runStateStrings[RunState.starting] = 'Starting';
runStateStrings[RunState.running] = 'Running';
runStateStrings[RunState.partial] = 'Partially running';
runStateStrings[RunState.stopping] = 'Stopping';
runStateStrings[RunState.unknown] = 'Unknown';

export function GetRunStateAsString(runState: RunState) {
    return runStateStrings[runState];
}
