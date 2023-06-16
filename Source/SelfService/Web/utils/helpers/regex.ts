// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

// Matches one or more consecutive characters that are not hyphens, underscores,
// periods, letters (either uppercase or lowercase), or digits.
export const isAlphaNumeric = /[^-._a-zA-Z0-9]+/;

// Matches one or more consecutive characters that are either uppercase letters, lowercase letters, or digits.
export const alphanumericCharacter = /[a-zA-Z0-9]+/g;

// This regex validates date in a YYYY-MM-DD format.
export const dateRegex = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

// This regex validates time in a HH:MM:SS format.
export const timeRegex = /^(2[0-3]|[0-1]?[\d]):[0-5][\d]:[0-5][\d]/;
