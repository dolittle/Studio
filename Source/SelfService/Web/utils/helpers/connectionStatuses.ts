// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { StatusIndicatorProps } from '@dolittle/design-system';

export type StatusIndicatorStatus = Pick<StatusIndicatorProps, 'status' | 'label'>;

export const getConnectionIndicatorStatus = (status: string): StatusIndicatorStatus => {
    const compareStatus = status.toLowerCase();
    if (compareStatus === 'connected') {
        return {
            status: 'success',
            label: 'connected',
        };
    } else if (compareStatus === 'registered' || compareStatus === 'pending') {
        return {
            status: 'warning',
            label: 'pending',
        };
    } else if (compareStatus === 'failing') {
        return {
            status: 'error',
            label: 'failing',
        };
    }

    return { status: 'unknown' };
};

export const getConnectionsStatus = (status?: string): StatusIndicatorStatus => {
    if (status) {
        const compareStatus = status.toLowerCase();
        if (compareStatus === 'connected') {
            return {
                status: 'table-success',
                label: 'connected',
            };
        } else if (compareStatus === 'registered' || compareStatus === 'pending') {
            return {
                status: 'warning',
                label: 'pending',
            };
        } else if (compareStatus === 'failing') {
            return {
                status: 'error',
                label: 'Not connected',
            };
        }
    }
    return { status: 'unknown' };
};

export const getPodHealthStatus = (status?: string): StatusIndicatorStatus => {
    if (status) {
        const compareStatus = status.toLowerCase();
        if (compareStatus === 'running') {
            return {
                status: 'table-success',
                label: 'running',
            };
        } else if (compareStatus === 'waiting' || compareStatus === 'pending') {
            return {
                status: 'warning',
                label: 'pending',
            };
        } else if (compareStatus === 'failed') {
            return {
                status: 'error',
                label: 'failing',
            };
        }
    }

    return { status: 'unknown' };
};

export const getContainerStatus = (status: string[]): StatusIndicatorStatus => {
    if (!status && typeof status !== 'string') {
        return { status: 'unknown' };
    } else if (status.includes('failed')) {
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
