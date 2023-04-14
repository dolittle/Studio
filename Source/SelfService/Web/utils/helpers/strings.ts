// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export const capitalize = (s: string) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const removeStringPattern = (s: string, remove: RegExp) => {
    if (typeof s !== 'string') return '';
    return s.replace(remove, '');
};

export const removeStringPatternAndCapitalize = (s: string, remove: RegExp) => {
    return capitalize(removeStringPattern(s, remove));
};

// Return only microservice runtime image number from: dolittle/runtime:8.6.0
export const getRuntimeNumberFromString = (s: string) => {
    if (typeof s !== 'string') return 'N/A';
    return removeStringPatternAndCapitalize(s, /dolittle\/runtime:/gi);
};

export function trimPrefix(str: string, prefix: string): string {
    if (str.startsWith(prefix)) return str.slice(prefix.length);
    else return str;
};

export function trimSuffix(str: string, suffix: string): string {
    if (str.endsWith(suffix)) return str.slice(0, -(suffix.length));
    else return str;
};
