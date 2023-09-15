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
