// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export const formatBytes = (bytes: number, decimals = 2) => {
    // Checks if bytes is a valid number and not falsy (i.e. 0, NaN, null, undefined, or an empty string).
    if (!+bytes) return '0 Bytes';

    const kilobyte = 1024;
    const setDecimals = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const integer = Math.floor(Math.log(bytes) / Math.log(kilobyte));

    return `${parseFloat((bytes / Math.pow(kilobyte, integer)).toFixed(setDecimals))} ${sizes[integer]}`;
};
