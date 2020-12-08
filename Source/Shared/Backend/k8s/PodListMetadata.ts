// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export interface PodListMetadata {
    resourceVersion: string;
    selfLink: string;
    /* Paging */
    continue?: string;
    remainingItemCount?: number;
}
