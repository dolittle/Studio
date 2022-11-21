// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo, useState } from 'react';

import { RestartAltRounded } from '@mui/icons-material';

import { Graph } from '@dolittle/design-system/molecules/Metrics/Graph';
import { AlertBox } from '@dolittle/design-system/atoms/AlertBox/AlertBox';
import { Button } from '@dolittle/design-system/atoms/Button';

import { ContainerStatusInfo, HttpResponsePodStatus } from '../../../api/api';

import { Metric, useMetricsFromLast } from '../../../metrics/useMetrics';

import { DataTable, DataTableStats } from './dataTable';
import { RestartMicroserviceDialog } from '../RestartMicroserviceDialog';

const styles = {
    restartBtn: {
        lineHeight: '1.375rem',
        letterSpacing: '0.06em',
        display: 'flex',
        mb: 2.5,
        mt: 3.5
    }
};

const computeStats = (metric: Metric | undefined, scale: number): DataTableStats | undefined => {
    if (metric === undefined) {
        return undefined;
    }

    const current = metric.values[metric.values.length - 1].value * scale;
    const maximum = metric.values.reduce((max, datapoint) => datapoint.value > max ? datapoint.value : max, 0) * scale;
    const average = metric.values.reduce((sum, datapoint) => sum + datapoint.value, 0) / (metric.values.length ?? 1) * scale;

    return { average, maximum, current };
};

type HealthStatusProps = {
    status: string;
    data: HttpResponsePodStatus;
    environment: string;
    applicationId: string;
    microserviceId: string;
};

export const HealthStatus = ({ applicationId, microserviceId, data, environment }: HealthStatusProps) => {

    const [restartDialogIsOpen, setRestartDialogIsOpen] = useState(false);

    const timeRange = useMemo<[number, number]>(() => [Date.now() - 86_400_000, Date.now()], [Date.now() / 60_000]);
    const cpu = useMetricsFromLast(`microservice:container_cpu_usage_seconds:rate_max{application_id="${applicationId}", environment="${environment}", microservice_id="${microserviceId}"}`, 86_400, 60);
    const memory = useMetricsFromLast(`microservice:container_memory_working_set_bytes:max{application_id="${applicationId}", environment="${environment}", microservice_id="${microserviceId}"}`, 86_400, 60);

    const containerTables = data.pods?.map(pod => {
        const rows = pod.containers.map((container: ContainerStatusInfo) => {
            const containerCPU = cpu.metrics.find(_ => _.labels.container === container.name);
            const containerMemory = memory.metrics.find(_ => _.labels.container === container.name);

            const row = {
                id: `${pod.name}-${container.name}`,
                podName: pod.name,
                containerName: container.name,
                application: applicationId,
                image: container.image,
                state: container.state,
                started: container.started,
                age: container.age,
                restarts: container.restarts,
                cpu: computeStats(containerCPU, 100),
                memory: computeStats(containerMemory, 1 / 1_048_576),
            };

            return row;
        });

        return <DataTable key={pod.name} rows={rows} />;
    });

    const cpuGraphData = useMemo(() =>
        cpu.metrics.map(metric => ({
            group: metric.labels.container,
            name: 'CPU Usage',
            values: metric.values,
        }))
        , [cpu.metrics]);

    const memoryGraphData = useMemo(() =>
        memory.metrics.map(metric => ({
            group: metric.labels.container,
            name: 'Memory Usage',
            values: metric.values.map(({ time, value }) => ({ time, value: value / 1_048_576 })),
        }))
        , [memory.metrics]);

    return (
        <>
            <RestartMicroserviceDialog
                applicationId={applicationId}
                environment={environment}
                microserviceId={microserviceId}
                open={restartDialogIsOpen}
                setOpen={setRestartDialogIsOpen}
                handleSuccess={() => window.location.reload()}
            />

            <Button
                variant='text'
                label='Restart Microservice'
                startWithIcon={<RestartAltRounded />}
                onClick={() => setRestartDialogIsOpen(true)}
                sx={styles.restartBtn}
            />

            {containerTables.length > 0
                ? containerTables
                : <AlertBox
                    severity='error'
                    title='Cannot display microservice containers'
                    message='Please try again later. If problem persists, please'
                    link={{
                        href: 'mailto: support@dolittle.com',
                        text: 'contact support'
                    }}
                />
            }

            {cpu.loading
                ? null
                : <Graph title='CPU Usage' unit='CPUs' subtitle='Last 24 hours' range={[0, 2]} domain={timeRange} sx={{ mt: 3 }} data={cpuGraphData} />
            }
            {memory.loading
                ? null
                : <Graph title='Memory Usage' unit='MiB' subtitle='Last 24 hours' range={[0, 2048]} domain={timeRange} sx={{ mt: 3 }} data={memoryGraphData} />
            }
        </>
    );
};
