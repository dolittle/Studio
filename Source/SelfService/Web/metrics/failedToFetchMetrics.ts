// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * The exception that gets thrown when a request to Loki fails.
 */
export class FailedToFetchMetrics extends Error {
    /**
     * Initialises a new instance of the {@link FailedToFetchFromLoki} class.
     * @param status The status code of the response.
     * @param message The failure message.
     */
    constructor(status: number, message: string) {
        super(`Metrics request failed. Status ${status}, message: ${message}`);
    }
}
