// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export function trimPrefix(str: string, prefix: string): string {
    if (str.startsWith(prefix)) {
        return str.slice(prefix.length);
    } else {
        return str;
    }
};

export function trimSuffix(str: string, suffix: string): string {
    if (str.endsWith(suffix)) {
        return str.slice(0, -(suffix.length));
    } else {
        return str;
    }
};
