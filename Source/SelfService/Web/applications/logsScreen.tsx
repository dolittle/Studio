// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';

import { Box, Typography } from '@mui/material';

import { ShortInfoWithEnvironment, HttpResponseMicroservices, getMicroservices } from '../apis/solutions/api';
import { HttpResponseApplication, getApplications, getApplication, HttpResponseApplications } from '../apis/solutions/application';

import { mergeMicroservicesFromGit, mergeMicroservicesFromK8s } from './stores/microservice';
import { LayoutWithSidebar, getMenuWithApplication } from '../components/layout/layoutWithSidebar';
import { isEnvironmentValidFromUri, PickEnvironment } from '../components/pickEnvironment';
import { TopNavBar } from '../components/layout/topNavBar';

import { LogFilterMicroservice, LogFilterPanel } from './logging/logFilter/logFilterPanel';
import { useLogFilters } from './logging/logFilter/useLogFilters';
import { LogsInRange } from './logging/logsInRange';
import { LogsFromLast } from './logging/logsFromLast';
import { LogPanel } from './logging/logPanel';

import { withRouteApplicationState } from '../spaces/applications/withRouteApplicationState';

/**
 * A day in Loki (log backend) time. Nanoseconds.
 */
const DAY = 86_400_000_000_000n;

export const LogsScreen = withRouteApplicationState(({ routeApplicationParams }) => {
    const navigate = useNavigate();
    const { hasOneCustomer, setNotification } = useGlobalContext();

    const currentEnvironment = routeApplicationParams.environment;
    const currentApplicationId = routeApplicationParams.applicationId;

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [applications, setApplications] = useState({} as ShortInfoWithEnvironment[]);
    const [loaded, setLoaded] = useState(false);

    const availableMicroservices: LogFilterMicroservice[] = application?.microservices !== undefined
        ? application.microservices
            .filter(_ => _.environment === currentEnvironment)
            .map(microservice => ({
                id: microservice.dolittle.microserviceId,
                name: microservice.name,
            }))
        : [];

    const [filters, setFilters] = useLogFilters({ dateRange: 'live', searchTerms: [] }, availableMicroservices);

    useEffect(() => {
        if (!currentEnvironment || !currentApplicationId) {
            return;
        }

        Promise.all([
            getApplications(),
            getApplication(currentApplicationId),
            getMicroservices(currentApplicationId),
        ]).then(values => {
            const applicationsData = values[0] as HttpResponseApplications;
            const applicationData = values[1];

            if (!applicationData?.id) {
                const href = `/problem`;
                navigate(href);
                return;
            }

            setApplications(applicationsData.applications);
            setApplication(applicationData);
            mergeMicroservicesFromGit(applicationData.microservices);

            const microservicesData = values[2] as HttpResponseMicroservices;
            const microservices = microservicesData.microservices.filter(microservice => microservice.environment === currentEnvironment);
            mergeMicroservicesFromK8s(microservices);
            setLoaded(true);
        }).catch((error) => {
            console.log(error);
            setNotification('Failed getting data from the server', 'error');
        });
    }, [currentEnvironment, currentApplicationId]);

    if (!loaded) return null;

    if (application.id === '') {
        return <Typography variant='h1' my={2}>Application with this environment not found</Typography>;
    }

    if (!isEnvironmentValidFromUri(applications, currentApplicationId, currentEnvironment)) {
        return (
            <PickEnvironment
                applications={applications}
                application={application}
                redirectTo={'/microservices/application/:applicationId/:environment/overview'}
                openModal={true} />
        );
    }

    const nav = getMenuWithApplication(navigate, application, currentEnvironment, hasOneCustomer);

    return (
        <LayoutWithSidebar navigation={nav}>
            <TopNavBar routes={[]} applications={applications} applicationId={currentApplicationId} environment={currentEnvironment} />
            <Typography variant='h1'>Logs</Typography>

            <Box mt={3}>
                <LogFilterPanel microservices={availableMicroservices} filters={filters} setSearchFilters={setFilters} />
                {
                    filters.dateRange === 'live'
                        ? <LogsFromLast
                            applicationId={currentApplicationId}
                            environment={currentEnvironment}
                            filters={filters}
                            last={DAY}
                            render={logs => (
                                <LogPanel
                                    application={application.name}
                                    environment={currentEnvironment}
                                    filters={filters}
                                    logs={logs}
                                />
                            )}
                        />
                        : <LogsInRange
                            applicationId={currentApplicationId}
                            environment={currentEnvironment}
                            filters={filters}
                            from={filters.dateRange.start}
                            to={filters.dateRange.stop}
                            render={(logs, loadMoreLogs) => (
                                <LogPanel
                                    application={application.name}
                                    environment={currentEnvironment}
                                    filters={filters}
                                    logs={logs}
                                    autoLoadMoreLogs
                                    loadMoreLogs={loadMoreLogs}
                                />
                            )}
                        />
                }
            </Box>
        </LayoutWithSidebar>
    );
});
