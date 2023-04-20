// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export const generateMappedFieldNameFrom = (columnName: string, columnDescription: string) => {
    return toPascalCase(columnDescription);
};

/**
 * Converts any string to PascalCase. Source: https://quickref.me/convert-a-string-to-pascal-case
 * @param str String to convert to PascalCase
 * @returns PascalCased string
 */
const toPascalCase = str => (str.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');
