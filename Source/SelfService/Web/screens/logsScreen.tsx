// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, {
    useEffect,
    useState
} from 'react';
import {
    useHistory,
} from 'react-router-dom';

import { Typography } from '@mui/material';

import {
    ShortInfoWithEnvironment,
    HttpResponseMicroservices,
    getMicroservices
} from '../api/api';

import { LayoutWithSidebar, getMenuWithApplication } from '../layout/layoutWithSidebar';
import { withRouteApplicationState } from './withRouteApplicationState';

import '../application/applicationScreen.scss';

import {
    mergeMicroservicesFromGit,
    mergeMicroservicesFromK8s
} from '../stores/microservice';

import { useGlobalContext } from '../stores/notifications';
import {
    isEnvironmentValidFromUri,
    PickEnvironment
} from '../components/pickEnvironment';
import { TopNavBar } from '../components/topNavBar';
import { HttpResponseApplication, getApplications, getApplication, HttpResponseApplications } from '../api/application';

import { LogPanel } from '../logging/logPanel';
import { LogFilterObject, LogFilterPanel } from '../logging/logFilterPanel';

export const LogsScreen: React.FunctionComponent = withRouteApplicationState(({ routeApplicationParams }) => {
    const history = useHistory();
    const { setNotification } = useGlobalContext();
    const currentEnvironment = routeApplicationParams.environment;
    const currentApplicationId = routeApplicationParams.applicationId;

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [applications, setApplications] = useState({} as ShortInfoWithEnvironment[]);
    const [loaded, setLoaded] = useState(false);

    const [filters, setFilters] = useState<LogFilterObject>({ searchTerms: [] });


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
                history.push(href);
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

    if (!loaded) {
        return null;
    }

    if (application.id === '') {
        return (
            <>
                <Typography variant='h1' my={2}>Application with this environment not found</Typography>
            </>
        );
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

    const nav = getMenuWithApplication(history, application, currentEnvironment);

    return (
        <LayoutWithSidebar navigation={nav}>
            <TopNavBar routes={[]} applications={applications} applicationId={currentApplicationId} environment={currentEnvironment} />
            <LogFilterPanel filters={filters} setSearchFilters={setFilters} />

            <LogPanel time={{ last: 86400 }} query={{ labels: { applicationId: currentApplicationId, environment: currentEnvironment }, pipeline: filters.searchTerms }} />
        </LayoutWithSidebar >
    );
});

