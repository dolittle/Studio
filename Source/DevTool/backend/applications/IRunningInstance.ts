// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export interface IRunningInstance {
    getLogs(): Promise<NodeJS.ReadableStream>;
    pause(): Promise<void>;
    stop(): Promise<void>;
}
