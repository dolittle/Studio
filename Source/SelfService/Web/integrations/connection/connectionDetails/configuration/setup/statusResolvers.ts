// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { StatusIndicatorProps } from '@dolittle/design-system';

import { ConnectionStatus, RemoteServiceStatus } from '../../../../../apis/integrations/generated';

export type StatusMessage = [StatusIndicatorProps['status'], StatusIndicatorProps['label']];

export const configurationStatusFromConnectionStatus = (connectionStatus?: ConnectionStatus): StatusMessage => {
    switch (connectionStatus?.name) {
        case 'Connected':
            return ['success', 'Connected'];
        case 'Failing':
            return ['error', 'Failing'];
        case 'Deleted':
            return ['unknown', 'Deleted'];
        case 'Registered':
        case 'Pending':
        default:
            return ['waiting', 'Waiting for access'];
    }
};

export const hostBundleStatusFromServicesStatus = (mdpStatus?: RemoteServiceStatus, ionStatus?: RemoteServiceStatus): StatusMessage => {
    const nonSuccessStatuses = ['DeploymentChosen', 'Undeployed'];
    if ([ionStatus, mdpStatus].every(status => status && nonSuccessStatuses.includes(status.name))) {
        return ['waiting', 'Waiting for access'];
    }
    return ['success', 'Connected'];
};

export const configurationStatusFromServiceCredentialsStatus = (serviceStatus?: RemoteServiceStatus): StatusMessage | undefined => {
    switch (serviceStatus?.name) {
        case 'Unresponsive':
        case 'Inactive':
        case 'Disconnected':
        case 'ServiceFailing':
            return ['error', 'Failed'];
        case 'Active':
            return ['success', 'Connected'];
        case 'Configured':
            return ['waiting', 'Waiting for credential verification'];
        case 'Alive':
        case 'Undeployed':
        case 'DeploymentChosen':
        default:
            return undefined;
    }
};
