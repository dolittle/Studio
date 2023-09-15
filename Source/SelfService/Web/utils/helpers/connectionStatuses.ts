// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { StatusIndicatorProps } from '@dolittle/design-system';

export type StatusIndicatorMessage = Pick<StatusIndicatorProps, 'status' | 'label' | 'message'>;

export const getPodHealthStatus = (status?: string): StatusIndicatorMessage => {
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

    return { status: 'unknown', label: 'unknown' };
};

export const getContainerStatus = (status: string[]): StatusIndicatorMessage => {
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

    return { status: 'unknown', label: 'unknown' };
};
