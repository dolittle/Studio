// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export function uriWithBasePathPrefix(uri: string): string {
    const basePath = '/selfservice';
    return `${basePath}${uri}`;
}
