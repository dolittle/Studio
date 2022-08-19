// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export enum MicroserviceStatus {
    Running = 0,
    Pending = 1,
    Failing = 2,
    Unknown = 3,
}

export const getMicroserviceState = (phase?: string): MicroserviceStatus => {
    const checkStatus = phase?.toLowerCase?.();

    if (typeof checkStatus !== 'string') {
        return MicroserviceStatus.Unknown;
    } else if (checkStatus.includes('running')) {
        return MicroserviceStatus.Running;
    } else if (checkStatus.includes('pending')) {
        return MicroserviceStatus.Pending;
    } else if (checkStatus.includes('failed')) {
        return MicroserviceStatus.Failing;
    }

    return MicroserviceStatus.Unknown;
};
