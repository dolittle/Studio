// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

// Matches one or more consecutive characters that are not hyphens, underscores,
// periods, letters (either uppercase or lowercase), or digits.
export const isAlphaNumeric = /[^-._a-zA-Z0-9]+/;

// Matches one or more consecutive characters that are either uppercase letters, lowercase letters, or digits.
export const alphanumericCharacter = /[a-zA-Z0-9]+/g;
