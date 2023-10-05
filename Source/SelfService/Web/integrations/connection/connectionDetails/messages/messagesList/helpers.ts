// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * Default date value returned from the API when no date is set.
 * This matches DateTome.MinValue in C#, and is translated in the generated integrations API
 */
export const defaultEmptyDate = new Date('0001-01-01T00:00:00+00:00');

/**
 * Convenience function to check if a date is the default empty date
 */
export const isDefaultEmptyDate = (date: Date | undefined | null) => date && date.toISOString() === defaultEmptyDate.toISOString();
