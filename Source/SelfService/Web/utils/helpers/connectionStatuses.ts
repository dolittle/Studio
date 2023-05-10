// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { StatusIndicatorProps } from '@dolittle/design-system';

export const getConnectionHealthStatus = (status: string): StatusIndicatorProps => {
    const checkStatus = status?.toLowerCase?.();

    if (status === 'unknown' || !checkStatus && typeof checkStatus !== 'string') {
        return { status: 'unknown' };
    } else if (status === 'connected') {
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
