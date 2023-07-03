// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

// TODO: Also added to the regexes in Source/SelfService/Web/utils/helpers/regex.ts

/**
 * Regular expression for matching email addresses
 */
export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Regular expression for matching lower-cased alpha numeric characters
 */
export const alphaNumericLowerCasedCharsRegex = /^([a-z0-9]+)$/;

/**
 * Regular expression for matching any cased alpha numeric characters
 */
export const alphaNumericCharsRegex = /^[a-zA-Z0-9]*$/;

/**
 * Regular expression for matching non-whitespace characters
 */
export const nonWhitespaceRegex = /^\S+$/;
