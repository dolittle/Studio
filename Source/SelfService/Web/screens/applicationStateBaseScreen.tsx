// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, useHistory, Switch, generatePath } from 'react-router-dom';
import {
    ShortInfoWithEnvironment,
    HttpResponseMicroservices,
    getMicroservices,
} from '../api/api';

import { MicroservicesOverviewScreen } from '../microservice/overview';
import { MicroserviceNewScreen } from '../microservice/microserviceNewScreen';
import { MicroserviceEditScreen } from '../microservice/microserviceEditScreen';
import { MicroserviceViewScreen } from '../microservice/microserviceViewScreen';
import { View as MicroserviceEnvironmentVariablesView } from '../microservice/environmentVariables/view';
import { Delete as DeleteView } from '../microservice/delete';
import { PodLogScreen } from '../microservice/podLogScreen';
import { LayoutWithSidebar, getMenuWithApplication } from '../layout/layoutWithSidebar';
import { BreadcrumbsRoute } from '../layout/breadcrumbs';

// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
import '../application/applicationScreen.scss';

import {
    mergeMicroservicesFromGit,
    mergeMicroservicesFromK8s,
} from '../stores/microservice';

import { useGlobalContext } from '../stores/notifications';
import {
    isEnvironmentValidFromUri,
    PickEnvironment,
} from '../components/pickEnvironment';
import { RouteNotFound } from '../components/notfound';
import { TopNavBar } from '../components/topNavBar';
import {
    HttpResponseApplication,
    getApplications,
    getApplication,
    HttpResponseApplications,
} from '../api/application';
import { withRouteApplicationState } from './withRouteApplicationState';
import { Typography } from '@mui/material';

export type ApplicationStateBaseScreenProps = {
    children?: React.ReactNode;
    topNavBarRoutes?: BreadcrumbsRoute[];
};

export const ApplicationStateBaseScreen: React.FunctionComponent<ApplicationStateBaseScreenProps> =
    withRouteApplicationState(({ routeApplicationParams, ...props }) => {
        const history = useHistory();
        const { setNotification } = useGlobalContext();
        const currentEnvironment = routeApplicationParams.environment;
        const currentApplicationId = routeApplicationParams.applicationId;

        const [application, setApplication] = useState({} as HttpResponseApplication);
        const [applications, setApplications] = useState(
            {} as ShortInfoWithEnvironment[]
        );
        const [loaded, setLoaded] = useState(false);

        useEffect(() => {
            if (!currentEnvironment || !currentApplicationId) {
                return;
            }

            Promise.all([
                getApplications(),
                getApplication(currentApplicationId),
                getMicroservices(currentApplicationId),
            ])
                .then((values) => {
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
                    const microservices = microservicesData.microservices.filter(
                        (microservice) => microservice.environment === currentEnvironment
                    );
                    mergeMicroservicesFromK8s(microservices);
                    setLoaded(true);
                })
                .catch((error) => {
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
                    <Typography variant='h1' my={2}>
                        Application with this environment not found
                    </Typography>
                </>
            );
        }

        if (
            !isEnvironmentValidFromUri(
                applications,
                currentApplicationId,
                currentEnvironment
            )
        ) {
            return (
                <PickEnvironment
                    applications={applications}
                    application={application}
                    redirectTo={
                        '/microservices/application/:applicationId/:environment/overview'
                    }
                    openModal={true}
                />
            );
        }

        const nav = getMenuWithApplication(history, application, currentEnvironment);

        return (
            <LayoutWithSidebar navigation={nav}>
                <TopNavBar
                    routes={props.topNavBarRoutes || []}
                    applications={applications}
                    applicationId={currentApplicationId}
                    environment={currentEnvironment}
                />
                {props.children}
            </LayoutWithSidebar>
        );
    });
