// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * Defines a point of data for a metric timeseries.
 */
export type DataPoint = {
    time: number;
    value: number;
};

/**
 * Defines a metric timeseries dataset with a group and a name.
 */
export type DataSet = {
    group: string;
    name: string;
    values: DataPoint[];
};
