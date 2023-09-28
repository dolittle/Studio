// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo, useState } from 'react';

import { MicroserviceStore } from '../../../../stores/microservice';

import { AlertBox, AlertBoxErrorMessage, Button, Graph } from '@dolittle/design-system';

import { ContainerStatusInfo, HttpResponsePodStatus } from '../../../../../apis/solutions/api';

import { Metric, useMetricsFromLast } from '../../../../metrics/useMetrics';
import { HealthStatusDataGrid, HealthStatusTableStats } from './HealthStatusDataGrid';
import { RestartMicroserviceDialog } from '../../../components/restartMicroserviceDialog';

const computeStats = (metric: Metric | undefined, scale: number): HealthStatusTableStats | undefined => {
    if (metric === undefined) return undefined;

    const current = metric.values[metric.values.length - 1].value * scale;
    const maximum = metric.values.reduce((max, datapoint) => datapoint.value > max ? datapoint.value : max, 0) * scale;
    const average = metric.values.reduce((sum, datapoint) => sum + datapoint.value, 0) / (metric.values.length ?? 1) * scale;

    return { average, maximum, current };
};

export type HealthStatusIndexProps = {
    applicationId: string;
    currentMicroservice: MicroserviceStore;
    data: HttpResponsePodStatus;
};

export const HealthStatusIndex = ({ applicationId, currentMicroservice, data }: HealthStatusIndexProps) => {
    const [restartDialogIsOpen, setRestartDialogIsOpen] = useState(false);

    const microserviceId = currentMicroservice.id;
    const microserviceEnvironment = currentMicroservice.environment;

    const timeRange = useMemo<[number, number]>(() => [Date.now() - 86_400_000, Date.now()], [Date.now() / 60_000]);
    const cpu = useMetricsFromLast(`microservice:container_cpu_usage_seconds:rate_max{application_id="${applicationId}", environment="${microserviceEnvironment}", microservice_id="${microserviceId}"}`, 86_400, 60);
    const memory = useMetricsFromLast(`microservice:container_memory_working_set_bytes:max{application_id="${applicationId}", environment="${microserviceEnvironment}", microservice_id="${microserviceId}"}`, 86_400, 60);

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

        return <HealthStatusDataGrid key={pod.name} rows={rows} />;
    });

    const cpuGraphData = useMemo(() =>
        cpu.metrics.map(metric => ({
            group: metric.labels.container,
            name: 'CPU Usage',
            values: metric.values,
        })), [cpu.metrics]);

    const memoryGraphData = useMemo(() =>
        memory.metrics.map(metric => ({
            group: metric.labels.container,
            name: 'Memory Usage',
            values: metric.values.map(({ time, value }) => ({ time, value: value / 1_048_576 })),
        })), [memory.metrics]);

    return (
        <>
            <RestartMicroserviceDialog
                applicationId={applicationId}
                environment={microserviceEnvironment}
                microserviceId={microserviceId}
                msName={currentMicroservice.name}
                open={restartDialogIsOpen}
                setOpen={setRestartDialogIsOpen}
                handleSuccess={() => window.location.reload()}
            />

            <Button
                label='Restart Microservice'
                startWithIcon='RestartAltRounded'
                onClick={() => setRestartDialogIsOpen(true)}
                sx={{ mb: 2.5 }}
            />

            {/* TODO: Don't display AlertBox on first render. */}
            {containerTables.length > 0
                ? containerTables
                : <AlertBox title='Cannot display microservice containers' message={<AlertBoxErrorMessage />} />
            }

            {cpu.loading
                ? null
                : <Graph title='CPU Usage' unit='CPUs' subtitle='Last 24 hours' domain={timeRange} sx={{ mt: 3 }} data={cpuGraphData} />
            }
            {memory.loading
                ? null
                : <Graph title='Memory Usage' unit='MiB' subtitle='Last 24 hours' domain={timeRange} sx={{ mt: 3 }} data={memoryGraphData} />
            }
        </>
    );
};
