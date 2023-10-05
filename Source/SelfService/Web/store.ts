// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const basePath = '/selfservice';

export function uriWithBasePathPrefix(uri: string): string {
    return `${basePath}${uri}`;
}

export function uriWithoutBasePathPrefix(uri: string): string {
    return uri.replace(basePath, '');
}
