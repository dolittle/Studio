// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, {
    useEffect,
    useState
} from 'react';
import {
    Route,
    useHistory,
    Switch,
    generatePath
} from 'react-router-dom';
import {
    ShortInfoWithEnvironment,
    HttpResponseMicroservices,
    getMicroservices
} from '../api/api';

import { MicroservicesOverviewScreen } from '../microservice/overview';
import { MicroserviceNewScreen } from '../microservice/microserviceNewScreen';
import { MicroserviceEditScreen } from '../microservice/microserviceEditScreen';
import { MicroserviceViewScreen } from '../microservice/microserviceViewScreen';
import { View as MicroserviceEnvironmentVariablesView } from '../microservice/environmentVariables/view';
import { Delete as DeleteView } from '../microservice/delete';
import { PodLogScreen } from '../microservice/podLogScreen';
import {
    LayoutWithSidebar,
    getDefaultMenu
} from '../layout/layoutWithSidebar';

// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
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
import { RouteNotFound } from '../components/notfound';
import { TopNavBar } from '../components/topNavBar';
import { HttpResponseApplication, getApplications, getApplication, HttpResponseApplications } from '../api/application';
import { withRouteApplicationState } from './withRouteApplicationState';

export const MicroservicesScreen: React.FunctionComponent = withRouteApplicationState(() => {
    const history = useHistory();
    const { setNotification, currentEnvironment, currentApplicationId } = useGlobalContext();

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [applications, setApplications] = useState({} as ShortInfoWithEnvironment[]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
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
    }, []);

    if (!loaded) {
        return null;
    }

    if (application.id === '') {
        return (
            <>
                <h1>Application with this environment not found</h1>
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

    const nav = getDefaultMenu(history, currentApplicationId, currentEnvironment);

    const routes = [
        {
            path: '/microservices/application/:applicationId/:environment',
            to: generatePath(
                '/microservices/application/:applicationId/:environment/overview', {
                applicationId: application.id,
                environment: currentEnvironment
            }),
            name: 'Microservices'
        },
        {
            path: '/microservices/application/:applicationId/:environment/overview',
            to: generatePath(
                '/microservices/application/:applicationId/:environment/overview', {
                applicationId: application.id,
                environment: currentEnvironment
            }),
            name: 'Overview'
        },
        {
            path: '/microservices/application/:applicationId/:environment/create',
            to: generatePath(
                '/microservices/application/:applicationId/:environment/create', {
                applicationId: application.id,
                environment: currentEnvironment
            }),
            name: 'Create'
        },
        {
            path: '/microservices/application/:applicationId/:environment/edit',
            to: generatePath(
                '/microservices/application/:applicationId/:environment/edit', {
                applicationId: application.id,
                environment: currentEnvironment
            }),
            name: 'Edit'
        },
        {
            path: '/microservices/application/:applicationId/:environment/view',
            to: generatePath(
                '/microservices/application/:applicationId/:environment/view', {
                applicationId: application.id,
                environment: currentEnvironment
            }),
            name: 'View'
        }
    ];


    const redirectUrl = generatePath('/microservices/application/:applicationId/:environment/overview', {
        applicationId: currentApplicationId,
        environment: currentEnvironment,
    });

    return (
        <LayoutWithSidebar navigation={nav}>
            <TopNavBar routes={routes} applications={applications} applicationId={currentApplicationId} environment={currentEnvironment} />
            <Switch>
                <Route exact path="/microservices/application/:applicationId/:environment/overview">
                    <MicroservicesOverviewScreen application={application} environment={currentEnvironment} />
                </Route>
                <Route exact path="/microservices/application/:applicationId/:environment/create">
                    <MicroserviceNewScreen application={application} environment={currentEnvironment} />
                </Route>
                <Route exact path="/microservices/application/:applicationId/:environment/edit/:microserviceId">
                    <MicroserviceEditScreen application={application} environment={currentEnvironment} />
                </Route>
                <Route exact path="/microservices/application/:applicationId/:environment/view/:microserviceId/delete">
                    <DeleteView application={application} environment={currentEnvironment} />
                </Route>
                <Route exact path="/microservices/application/:applicationId/:environment/view/:microserviceId">
                    <MicroserviceViewScreen application={application} environment={currentEnvironment} />
                </Route>
                <Route exact path="/microservices/application/:applicationId/:environment/view/:microserviceId/environment-variables">
                    <MicroserviceEnvironmentVariablesView application={application} environment={currentEnvironment} />
                </Route>
                <Route exact path="/microservices/application/:applicationId/:environment/pod/view/:podName/logs">
                    <PodLogScreen />
                </Route>
                <RouteNotFound redirectUrl={redirectUrl} />
            </Switch>
        </LayoutWithSidebar >
    );
});
