// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Configuration } from './Configuration';

/**
 * Validates the provided configuration and returns an error if it is invalid.
 * @returns A configuration validation result.
 */
export const validateConfiguration = (): { isValid: true } | { isValid: false, error: Error} => {
    try {
        Configuration.validate({ allowed: 'strict' });
        return { isValid: true };
    } catch (error) {
        return { isValid: false, error };
    }
};