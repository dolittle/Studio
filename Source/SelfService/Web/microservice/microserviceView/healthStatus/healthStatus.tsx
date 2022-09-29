// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect } from 'react';

import { RestartAlt } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

import { HttpResponsePodStatus, restartMicroservice } from '../../../api/api';

import { useMetricsFromLast } from '../../../metrics/useMetrics';

import { Notification } from '../../../theme/Notification';
import { ButtonText } from '../../../theme/buttonText';
import { DataTable } from './dataTable';

const styles = {
    restartBtn: {
        fontWeight: 500,
        lineHeight: '1.375rem',
        letterSpacing: '0.06em',
        mb: 2.5,
        mt: 3.5
    },
    notification: {
        mt: 2.5,
        maxWidth: 520
    }
};

const errorMessage = 'Cannot display microservice containers';

type HealthStatusProps = {
    status: string
    data: HttpResponsePodStatus
    environment: string
    applicationId: string
    microserviceId: string
};

export const HealthStatus = ({ applicationId, microserviceId, data, environment }: HealthStatusProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleRestart = async () => {
        const success = await restartMicroservice(applicationId, environment, microserviceId);

        if (!success) {
            enqueueSnackbar('Failed to restart microservice', { variant: 'error' });
            return;
        }

        window.location.reload();
    };

    const cpu = useMetricsFromLast('microservice:head_container_cpu_usage_seconds:rate_max', 86_400, 60);

    // const cpuUsage = /* */[];

    // useEffect(() => {
    //     queryRange({
    //         query: 'microservice:head_container_cpu_usage_seconds:rate_max',
    //         start: BigInt(Date.now()) - 84_400n,
    //         end: BigInt(Date.now()),
    //         step: 60,
    //     }).then(data => console.log('Data', data));
    // }, []);

    return (
        <>
            <ButtonText
                sx={styles.restartBtn}
                startIcon={<RestartAlt />}
                onClick={handleRestart}>
                Restart microservice
            </ButtonText>

            {
                cpu.loading && <h1>Loading CPU Metrics</h1>
            }

            {data
                ? <DataTable data={data} applicationId={applicationId} />
                : <Notification title={errorMessage} sx={styles.notification} />
            }
        </>
    );
};
