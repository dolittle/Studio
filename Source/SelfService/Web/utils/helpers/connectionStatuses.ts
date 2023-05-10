// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { StatusIndicatorProps } from '@dolittle/design-system';

export const getConnectionStatus = (status: string): StatusIndicatorProps => {
    if (status === 'connected') {
        return {
            status: 'success',
            label: 'connected',
        };
    } else if (status === 'registered' || status === 'pending') {
        return {
            status: 'warning',
            label: 'pending',
        };
    } else if (status === 'failing') {
        return {
            status: 'error',
            label: 'failing',
        };
    }

    return { status: 'unknown' };
};

export const getConnectionsStatus = (status: string): StatusIndicatorProps => {
    if (status === 'connected') {
        return {
            status: 'table-success',
            label: 'connected',
        };
    } else if (status === 'registered' || status === 'pending') {
        return {
            status: 'warning',
            label: 'pending',
        };
    } else if (status === 'failing') {
        return {
            status: 'error',
            label: 'Not connected',
        };
    }

    return { status: 'unknown' };
};

export const getPodHealthStatus = (status: string): StatusIndicatorProps => {
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
    if (status.includes('unknown')) {
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
