// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export const IApplicationLogToken = 'IApplicationLog';
export const ApplicationLogMessage = 'log-message';
export interface IApplicationLog {
    start(): Promise<void>;
}
