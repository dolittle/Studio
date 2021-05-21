// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, useParams, useHistory } from 'react-router-dom';

import { getApplication, HttpResponseApplications2 } from '../api';

import { ApplicationOverviewScreen } from './applicationOverviewScreen';
import { MicroserviceNewScreen } from './microserviceNewScreen';

import { MicroserviceEditScreen } from './microserviceEditScreen';
import { MicroserviceViewScreen } from './microserviceViewScreen';
import { ContainerRegistryInfoScreen } from './containerRegistryInfoScreen';
import { PodViewScreen } from './podViewScreen';

import { EnvironmentNewScreen } from './environmentNewScreen';
import { EnvironmentChanger } from '../application/environment';
import { BackupScreen } from './backupScreen';
import { Editor as BusinessMomentEditor } from '../businessMoments/Editor';
import { BusinessMomentsOverview } from '../businessMoments/Overview';
import { Link } from '@fluentui/react';
import { TodoScreen } from './todoScreen';

import { DocumentationScreen } from './documentationScreen';
import { LayoutWithSidebar } from '../layout/layoutWithSidebar';

export const ApplicationScreen: React.FunctionComponent = () => {
    const history = useHistory();
    const { environment } = useParams() as any;
    const { applicationId } = useParams() as any;

    const [application, setApplication] = useState({} as HttpResponseApplications2);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getApplication(applicationId).then(data => {
            setApplication(data);
            setLoaded(true);
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

    const nav = (
        <ul>
            <li>
                <Link onClick={() => {
                    // This is annoying as balls
                    const href = `/application/${application.id}/${environment}/dashboard`;
                    history.push(href);
                }}>
                    Dashboard
                    </Link>
            </li>
            <li>
                <Link onClick={() => {
                    // This is annoying as balls
                    const href = `/application/${application.id}/${environment}/backup/overview`;
                    history.push(href);
                }}>
                    Backups
                </Link>
            </li>
            <li>
                <Link onClick={() => {
                    // This is annoying as balls
                    const href = `/application/${application.id}/${environment}/business-moments`;
                    history.push(href);
                }}>
                    Business Moments
                    </Link>
            </li>
            <li>

                <Link onClick={() => {
                    // This is annoying as balls
                    const href = `/application/${application.id}/${environment}/microservices/overview`;
                    history.push(href);
                }}>
                    Microservices
                    </Link>
            </li>
            <li>

                <Link onClick={() => {
                    // This is annoying as balls
                    const href = `/application/${application.id}/${environment}/documentation`;
                    history.push(href);
                }}>
                    Documentation
            </Link>
            </li>
        </ul>
    );

    return (
        <LayoutWithSidebar navigation={nav}>
            <EnvironmentChanger application={application} environment={environment} />
            <h1 title={`${application.name} (${application.id})`}>{application.name}</h1>

            <Route exact path="/application/:applicationId/environment/create">
                <EnvironmentNewScreen />
            </Route>

            <Route exact path="/application/:applicationId/:environment">
                <ApplicationOverviewScreen application={application} />
            </Route>

            <Route exact path="/application/:applicationId/:environment/microservice/create">
                <MicroserviceNewScreen application={application} />
            </Route>

            <Route exact path="/application/:applicationId/:environment/microservice/edit/:microserviceId">
                <MicroserviceEditScreen />
            </Route>

            <Route exact path="/application/:applicationId/:environment/microservice/view/:microserviceId">
                <MicroserviceViewScreen />
            </Route>

            <Route exact path="/application/:applicationId/pod/view/:podName/logs">
                <PodViewScreen />
            </Route>

            <Route path="/application/:applicationId/:environment/backup">
                <BackupScreen />
            </Route>
            <Route path="/application/:applicationId/:environment/dashboard">
                <TodoScreen />
            </Route>

            <Route path="/application/:applicationId/:environment/microservices">
                <ApplicationOverviewScreen application={application} />
            </Route>
            <Route exact path="/application/:applicationId/:environment/documentation">
                <DocumentationScreen />
            </Route>
            <Route exact path="/application/:applicationId/:environment/documentation/container-registry-info">
                <ContainerRegistryInfoScreen application={application} />
            </Route>

            <Route exact path="/application/:applicationId/:environment/business-moments">
                <BusinessMomentsOverview />
            </Route>

            <Route exact path="/application/:applicationId/:environment/business-moments/editor/:businessMomentId">
                <BusinessMomentEditor />
            </Route>
        </LayoutWithSidebar>
    );
};
// 3:20


