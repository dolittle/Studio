// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { StatusIndicatorProps } from '@dolittle/design-system';

enum MicroserviceStatus {
    Running = 0,
    Pending = 1,
    Failing = 2,
    Unknown = 3,
};

export const customStatusFieldSort = (_, __, left, right) => {
    const leftStatus = getMicroserviceState(left.value);
    const rightStatus = getMicroserviceState(right.value);
    return leftStatus - rightStatus;
};

const getMicroserviceState = (phase?: string): MicroserviceStatus => {
    const checkStatus = phase?.toLowerCase?.();

    if (!checkStatus && typeof checkStatus !== 'string') {
        return MicroserviceStatus.Unknown;
    } else if (checkStatus.includes('failed')) {
        return MicroserviceStatus.Failing;
    } else if (checkStatus.includes('pending') ||
        checkStatus.includes('waiting')) {
        return MicroserviceStatus.Pending;
    } else if (checkStatus.includes('running')) {
        return MicroserviceStatus.Running;
    }

    return MicroserviceStatus.Unknown;
};

export const healthStatus = (status: string): StatusIndicatorProps => {
    if (status === 'running') {
        return {
            status: 'table-success',
            label: 'running',
        };
    } else if (status === 'waiting' || status === 'pending') {
        return {
            status: 'warning',
            label: 'pending',
        };
    } else if (status === 'failed') {
        return {
            status: 'error',
            label: 'failing',
        };
    }

    return { status: 'unknown' };
};

export const getContainerHealthStatus = (status: string[]): StatusIndicatorProps => {
    if (status.includes('failed')) {
        return {
            status: 'error',
            label: 'failing',
        };
    } else if (status.includes('waiting') || status.includes('pending')) {
        return {
            status: 'warning',
            label: 'pending',
        };
    } else if (status.includes('running')) {
        return {
            status: 'success',
            label: 'running',
        };
    }

    return { status: 'unknown' };
};
