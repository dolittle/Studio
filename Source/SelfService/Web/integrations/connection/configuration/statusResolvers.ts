// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { StatusIndicatorProps } from '@dolittle/design-system';
import { ConnectionStatus, RemoteServiceStatus } from '../../../apis/integrations/generated';


export const configurationStatusFromConnectionStatus = (connectionStatus?: ConnectionStatus): [StatusIndicatorProps['status'], StatusIndicatorProps['label']] => {
    switch (connectionStatus?.name) {
        case 'Connected':
        case 'Failing':
        case 'Deleted':
            return ['success', 'Connected'];
        case 'Pending':
        case 'Registered':
        default:
            return ['waiting', 'Waiting for access'];
    }
};

export const configurationStatusFromServiceCredentialsStatus = (serviceStatus?: RemoteServiceStatus | undefined): [StatusIndicatorProps['status'], StatusIndicatorProps['label']] => {
    switch (serviceStatus?.name) {
        case 'Unresponsive':
        case 'Inactive':
        case 'Disconnected':
        case 'ServiceFailing':
            return ['error', 'Failed'];
        case 'Active':
            return ['success', 'Connected'];
        case 'Configured':
            return ['waiting', 'Configured'];
        case 'Alive':
        case 'Undeployed':
        case 'DeploymentChosen':
        default:
            return ['waiting', 'Waiting for credential verification'];
    }
};
