// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * Regular expression for matching email addresses
 */
export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Regular expression for matching alpha characters
 */
export const alphaCharsRegex = /^([a-z0-9]+)$/;

/**
 * Regular expression for matching non-whitespace characters
 */
export const nonWhitespaceRegex = /\S+$/;

