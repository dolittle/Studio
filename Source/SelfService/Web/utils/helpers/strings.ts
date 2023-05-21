// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { alphanumericCharacter } from './regex';

/**
 * Capitalizes the first letter of a string.
 * @param str String to capitalize.
 * @returns Capitalized string.
 */
export const capitalize = (str: string) => {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Removes pattern from string.
 * @param str String to remove pattern from.
 * @param remove Pattern to remove.
 * @returns String without pattern.
 */
export const removeStringPattern = (str: string, remove: RegExp) => {
    if (typeof str !== 'string') return '';
    return str.replace(remove, '');
};

/**
 * Removes pattern from string and capitalizes the first letter.
 * @param str String to remove pattern from.
 * @param remove Pattern to remove.
 * @returns String without pattern and with first letter capitalized.
 */
export const removeStringPatternAndCapitalize = (str: string, remove: RegExp) => {
    if (typeof str !== 'string') return '';
    return capitalize(removeStringPattern(str, remove));
};

/**
 * Gets the runtime number from a string.
 * @param str String to get runtime number from.
 * @returns Runtime number.
 */
export const getRuntimeNumberFromString = (str: string) => {
    if (typeof str !== 'string') return 'N/A';
    return removeStringPatternAndCapitalize(str, /dolittle\/runtime:/gi);
};

/**
 * Remove a specified prefix from the beginning of a string, if it is present.
 *
 * If the string does not start with the prefix, the function returns the original string unchanged.
 * @param str String to trim prefix from.
 * @param prefix Prefix to trim.
 */
export const trimPrefix = (str: string, prefix: string) => {
    if (str.startsWith(prefix)) return str.slice(prefix.length);
    else return str;
};

/**
 * Remove a specified suffix from the end of a string, if it is present.
 *
 * If the string does not end with the suffix, the function returns the original string unchanged.
 * @param str String to trim suffix from.
 * @param suffix Suffix to trim.
 */
export const trimSuffix = (str: string, suffix: string) => {
    if (str.endsWith(suffix)) return str.slice(0, -(suffix.length));
    else return str;
};

/**
 * Converts any string to PascalCase. Source: https://quickref.me/convert-a-string-to-pascal-case
 * @param str String to convert to PascalCase.
 * @returns PascalCased string.
 */
export const toPascalCase = (str: string) => {
    if (typeof str !== 'string') return '';
    return (str.match(alphanumericCharacter) || []).map((word: string) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join('');
};
