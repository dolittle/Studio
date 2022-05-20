// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export class FailedToFetchLogsFromLoki extends Error {
    constructor(status: number, message: string) {
        super(`Loki request failed. Status ${status}, message: ${message}`);
    }
}
