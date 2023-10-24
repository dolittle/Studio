// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * Regular expression for matching one or more consecutive characters that are not hyphens, underscores, periods,
 * letters (either uppercase or lowercase), or digits.
 */
export const isAlphaNumeric = /[^-._a-zA-Z0-9]+/;

// TODO: Combine them?
/**
 * Regular expression for matching one or more consecutive characters that are either uppercase letters, lowercase letters, or digits.
 */
export const alphanumericCharacter = /[a-zA-Z0-9]+/g;
/**
 * Regular expression for matching any cased alpha numeric characters.
 */
export const alphaNumericCharsRegex = /^[a-zA-Z0-9]*$/;

// Regular expression for matching alphanumeric characters or '-', start with an alphabetic character, and end with an alphanumeric character.
// (e.g. 'My-name',  or 'abc-123')
export const alphaNumericHyphenRegex = /^([a-z]([-a-z0-9]*[a-zA-Z0-9])+)$/;

/**
 * Regular expression for matching lower-cased alpha numeric characters.
 */
export const alphaNumericLowerCasedCharsRegex = /^([a-z0-9]+)$/;

/**
 * Regular expression for matching dates in a YYYY-MM-DD format.
 */
export const dateRegex = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

/**
 * Regular expression for matching time in a HH:MM:SS format.
 */
export const timeRegex = /^(2[0-3]|[0-1]?[\d]):[0-5][\d]:[0-5][\d]/;
