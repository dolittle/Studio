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
    getApplication,
    getApplications,
    HttpResponseApplications2,
    ShortInfoWithEnvironment,
    HttpResponseApplications,
    HttpResponseMicroservices,
    getMicroservices
} from '../api/api';
import { MicroservicesOverviewScreen } from '../microservice/overview';
import { MicroserviceNewScreen } from '../microservice/microserviceNewScreen';
import { MicroserviceEditScreen } from '../microservice/microserviceEditScreen';
import { MicroserviceViewScreen } from '../microservice/microserviceViewScreen';
import { PodLogScreen } from '../microservice/podLogScreen';
import {
    LayoutWithSidebar,
    getDefaultMenu
} from '../layout/layoutWithSidebar';

// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
import '../application/applicationScreen.scss';
import { ApplicationsChanger } from '../application/applicationsChanger';
import {
    mergeMicroservicesFromGit,
    mergeMicroservicesFromK8s
} from '../stores/microservice';
import { BreadCrumbContainer } from '../layout/breadcrumbs';

import { withRouteApplicationProps } from '../utils/route';

import { useGlobalContext } from '../stores/notifications';
import {
    isEnvironmentValidFromUri,
    PickEnvironment
} from '../components/pickEnvironment';
import { RouteNotFound } from '../components/notfound';
import { TopRightMenu } from '../components/topRightMenu';
import { Grid } from '@material-ui/core';

export const MicroservicesScreen: React.FunctionComponent = () => {
    const history = useHistory();
    const { setNotification, currentEnvironment, currentApplicationId } = useGlobalContext();

    const routeApplicationProps = withRouteApplicationProps('microservices');
    const applicationId = routeApplicationProps.applicationId;

    const [application, setApplication] = useState({} as HttpResponseApplications2);
    const [applications, setApplications] = useState({} as ShortInfoWithEnvironment[]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            getApplications(),
            getApplication(applicationId),
            getMicroservices(applicationId),
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

    if (!isEnvironmentValidFromUri(routeApplicationProps, applications, currentApplicationId, currentEnvironment)) {
        return (
            <PickEnvironment
                applications={applications}
                application={application}
                redirectTo={'/microservices/application/:applicationId/:environment/overview'}
                openModal={true} />
        );
    }

    const nav = getDefaultMenu(history, applicationId, currentEnvironment);


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
        applicationId,
        environment: currentEnvironment,
    });

    return (
        <LayoutWithSidebar navigation={nav}>
            <div id="topNavBar" >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                >
                    <BreadCrumbContainer routes={routes} />
                    <Grid
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                    >
                        <TopRightMenu applications={applications} applicationId={applicationId} environment={currentEnvironment} />
                    </Grid>
                </Grid>
            </div>

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

                <Route exact path="/microservices/application/:applicationId/:environment/view/:microserviceId">
                    <MicroserviceViewScreen application={application} environment={currentEnvironment} />
                </Route>

                <Route exact path="/microservices/application/:applicationId/:environment/pod/view/:podName/logs">
                    <PodLogScreen />
                </Route>

                <RouteNotFound redirectUrl={redirectUrl} />
            </Switch>

        </LayoutWithSidebar >
    );
};
