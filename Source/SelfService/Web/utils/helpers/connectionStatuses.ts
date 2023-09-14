// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { StatusIndicatorProps } from '@dolittle/design-system';
import { StatusMessage } from '../../apis/integrations/generated';

export type StatusIndicatorStatus = Pick<StatusIndicatorProps, 'status' | 'label' | 'message'>;

export const getConnectionIndicatorStatusFromStatusMessage = (status?: StatusMessage): StatusIndicatorStatus => {
    const indicator: StatusIndicatorStatus = {
        status: 'unknown',
        label: status?.title,
        message: status?.message || undefined,
    };

    switch (status?.severity) {
        case 'Success':
            indicator.status = 'success';
            break;
        case 'Error':
            indicator.status = 'error';
            break;
        case 'Waiting':
            indicator.status = 'waiting';
            break;
        case 'Warning':
            indicator.status = 'warning';
            break;
        case 'Information': //TODO: Introduce Information status
        case 'Unknown':
        case 'None':
        default:
            indicator.status = 'unknown';
            break;

    }
    return indicator;
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
    return { status: 'unknown', label: 'unknown' };
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

    return { status: 'unknown', label: 'unknown' };
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

    return { status: 'unknown', label: 'unknown' };
};
