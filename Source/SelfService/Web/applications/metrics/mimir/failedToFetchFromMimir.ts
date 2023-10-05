// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * The exception that gets thrown when a request to metrics fails.
 */
export class FailedToFetchFromMimir extends Error {
    /**
     * Initialises a new instance of the {@link FailedToFetchFromMimir} class.
     * @param status The status code of the response.
     * @param message The failure message.
     */
    constructor(status: number, message: string) {
        super(`Mimi request failed. Status ${status}, message: ${message}`);
    }
}
