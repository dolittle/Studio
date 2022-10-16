// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { restartMicroservice } from '../../api/api';

export const MicroserviceRestart = async ({ applicationId, environment, microserviceId, enqueueSnackbar }: any) => {
    const success = await restartMicroservice(applicationId, environment, microserviceId);

    if (!success) {
        enqueueSnackbar('Failed to restart microservice', { variant: 'error' });
        return;
    }

    window.location.reload();
};
