// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { restartMicroservice } from '../../api/api';

type MicroserviceRestartProps = {
    applicationId: string;
    environment: string;
    microserviceId: string;
    enqueueSnackbar: (message: string, options: any) => void;
};

export const microserviceRestart = async ({ applicationId, environment, microserviceId, enqueueSnackbar }: MicroserviceRestartProps) => {
    const success = await restartMicroservice(applicationId, environment, microserviceId);

    if (!success) {
        enqueueSnackbar('Failed to restart microservice', { variant: 'error' });
        return;
    }

    window.location.reload();
};
