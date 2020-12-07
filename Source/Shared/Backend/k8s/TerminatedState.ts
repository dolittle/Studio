// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export interface TerminatedState {
    containerID: string;
    exitCode: number;
    finishedAt: string;
    message: string;
    reason: string;
    signal: number;
    startedAt: string;
}
