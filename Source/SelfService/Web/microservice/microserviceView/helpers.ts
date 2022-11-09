// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export const capitalize = (s: string) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const removeFromString = (s: string, remove: RegExp) => {
    if (typeof s !== 'string') return '';
    return s.replace(remove, '');
};
