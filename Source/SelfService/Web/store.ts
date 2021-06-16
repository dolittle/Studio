// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export function uriWithAppPrefix(uri: string): string {
    const prefix = '/selfservice';
    return `${prefix}${uri}`;
}
