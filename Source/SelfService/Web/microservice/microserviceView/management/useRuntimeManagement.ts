// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useMemo } from 'react';

export const useRuntimeManagementUrl = (applicationId: string, environment: string, microserviceId: string): string => {
    const url = useMemo(
        () => `/proxy/${applicationId}/${environment}/${microserviceId}/runtime-management`,
        [applicationId, environment, microserviceId]);

    return url;
};
