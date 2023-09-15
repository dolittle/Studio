// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { StatusIndicatorProps } from '@dolittle/design-system';

import { RemoteServiceStatus, StatusMessage } from '../../../../../apis/integrations/generated';
import { StatusIndicatorMessage } from '../../../../../utils/helpers/connectionStatuses';

export type StatusMessageLocal = [StatusIndicatorProps['status'], StatusIndicatorProps['label']];

export const hostBundleStatusFromServicesStatus = (mdpStatus?: RemoteServiceStatus, ionStatus?: RemoteServiceStatus): StatusMessageLocal => {
    const nonSuccessStatuses = ['DeploymentChosen', 'Undeployed'];
    if ([ionStatus, mdpStatus].every(status => status && nonSuccessStatuses.includes(status.name))) {
        return ['waiting', 'Waiting for access'];
    }
    return ['success', 'Connected'];
};


export const getConnectionIndicatorStatusFromStatusMessage = (status?: StatusMessage): StatusIndicatorMessage => {
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
        case 'None':
        default:
            indicator.status = 'unknown';
            break;
    }
    return indicator;
};
