// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Box, Typography } from '@mui/material';

import { HttpResponseMicroservices, getMicroservices } from '../../apis/solutions/api';
import { HttpResponseApplication, getApplicationsListing, getApplication } from '../../apis/solutions/application';

import { mergeMicroservicesFromGit, mergeMicroservicesFromK8s } from '../stores/microservice';

import { WorkSpaceLayoutWithSidePanel } from '../../layout/workSpaceLayout';
import { LogFilterMicroservice, LogFilterPanel } from './logFilter/logFilterPanel';
import { useLogFilters } from './logFilter/useLogFilters';
import { LogsInRange } from './logsInRange';
import { LogsFromLast } from './logsFromLast';
import { LogPanel } from './logPanel';

import { withRouteApplicationState } from '../../spaces/applications/withRouteApplicationState';

/**
 * A day in Loki (log backend) time. Nanoseconds.
 */
const DAY = 86_400_000_000_000n;

export const LogsIndex = withRouteApplicationState(({ routeApplicationParams }) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [isLoaded, setIsLoaded] = useState(false);

    const currentApplicationId = routeApplicationParams.applicationId;

    const availableMicroservices: LogFilterMicroservice[] = application?.microservices !== undefined ? application.microservices.map(microservice => ({
        id: microservice.dolittle.microserviceId,
        name: microservice.name,
    })) : [];

    const uniqueMicroservices = new Map<string, LogFilterMicroservice>();
    availableMicroservices.forEach(microservice => uniqueMicroservices.set(microservice.name, microservice));
    const uniqueMicroservicesList = Array.from(uniqueMicroservices.values());

    const availableEnvironments = application?.environments !== undefined ? application.environments.map(env => env.name) : [];

    const [filters, setFilters] = useLogFilters(
        { dateRange: 'live', searchTerms: [] },
        uniqueMicroservicesList,
        availableEnvironments,
    );

    useEffect(() => {
        if (!currentApplicationId) return;

        Promise.all([
            getApplication(currentApplicationId),
            getMicroservices(currentApplicationId),
        ]).then(values => {
            const applicationData = values[0];

            if (!applicationData.id) {
                const href = `/problem`;
                navigate(href);
                return;
            }

            setApplication(applicationData);
            mergeMicroservicesFromGit(applicationData.microservices);

            const microservicesData = values[1] as HttpResponseMicroservices;

            mergeMicroservicesFromK8s(microservicesData.microservices);
            setIsLoaded(true);
        }).catch(() => {
            enqueueSnackbar('Failed getting data from the server.', { variant: 'error' });
        });
    }, [currentApplicationId]);

    if (!isLoaded) return null;

    if (application.id === '') {
        return <Typography variant='h1' my={2}>Application  not found.</Typography>;
    }

    return (
        <WorkSpaceLayoutWithSidePanel pageTitle='Logs | Applications' sidePanelMode='applications'>
            <Typography variant='h1' sx={{ my: 3 }}>Logs</Typography>

            <Box sx={{ minWidth: 640, mt: 3 }}>
                <LogFilterPanel
                    environments={availableEnvironments}
                    microservices={uniqueMicroservicesList}
                    filters={filters}
                    setSearchFilters={setFilters}
                />

                {filters.dateRange === 'live' ?
                    <LogsFromLast
                        applicationId={currentApplicationId}
                        filters={filters}
                        last={DAY}
                        render={logs =>
                            <LogPanel application={application.name} filters={filters} logs={logs} />
                        }
                    /> :
                    <LogsInRange
                        applicationId={currentApplicationId}
                        filters={filters}
                        from={filters.dateRange.start}
                        to={filters.dateRange.stop}
                        render={(logs, loadMoreLogs) =>
                            <LogPanel application={application.name} filters={filters} logs={logs} autoLoadMoreLogs loadMoreLogs={loadMoreLogs} />
                        }
                    />
                }
            </Box>
        </WorkSpaceLayoutWithSidePanel>
    );
});
