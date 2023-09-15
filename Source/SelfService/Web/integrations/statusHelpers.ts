// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { StatusMessage } from '../apis/integrations/generated';
import { StatusIndicatorMessage } from '../utils/helpers/connectionStatuses';


export const getIndicatorStatusFromStatusMessage = (status?: StatusMessage): StatusIndicatorMessage | undefined => {
    if (!status) return undefined;
    const indicator: StatusIndicatorMessage = {
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
            indicator.status = 'unknown';
            break;
        case 'None':
        default:
            return undefined;
    }
    return indicator;
};
