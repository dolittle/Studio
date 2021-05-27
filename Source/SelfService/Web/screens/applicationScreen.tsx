// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, useParams, useHistory } from 'react-router-dom';

import { getApplication, getApplications, HttpResponseApplications2, ShortInfo, ShortInfoWithEnvironment, HttpResponseApplications } from '../api/api';

import { ApplicationOverviewScreen } from './applicationOverviewScreen';
import { MicroserviceNewScreen } from './microserviceNewScreen';

import { MicroserviceEditScreen } from './microserviceEditScreen';
import { MicroserviceViewScreen } from './microserviceViewScreen';
import { ContainerRegistryInfoScreen } from './containerRegistryInfoScreen';
import { PodViewScreen } from './podViewScreen';

import { EnvironmentNewScreen } from './environmentNewScreen';
import { EnvironmentChanger } from '../application/environmentChanger';
import { BackupScreen } from './backupScreen';
import { Editor as BusinessMomentEditor } from '../businessMoments/editor';
import { BusinessMomentsOverview } from '../businessMoments/Overview';
import {
    Link,
    TooltipHost,
    IDividerAsProps
} from '@fluentui/react';

import { DocumentationScreen } from './documentationScreen';
import { LayoutWithSidebar } from '../layout/layoutWithSidebar';
import { ApplicationDashboardScreen } from './applicationDashboard';

// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
import '../application/applicationScreen.scss';
import { ApplicationsChanger } from '../application/applicationsChanger';
import { IBreadcrumbItem, Breadcrumb } from '@fluentui/react/lib/Breadcrumb';

export const ApplicationScreen: React.FunctionComponent = () => {
    const history = useHistory();
    const { environment } = useParams() as any;
    const { applicationId } = useParams() as any;

    const [application, setApplication] = useState({} as HttpResponseApplications2);
    const [applications, setApplications] = useState({} as ShortInfoWithEnvironment[]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            getApplications(),
            getApplication(applicationId),
        ]).then(values => {
            const applicationsData = values[0] as HttpResponseApplications;
            const applicationData = values[1];
            // TODO this should be unique
            // TODO also when we have more than one application and more than one environment we should default to something.
            setApplications(applicationsData.applications);
            setApplication(applicationData);
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

    // TODO move to function
    function _onBreadcrumbItemClicked(ev?: React.MouseEvent<HTMLElement>, item?: IBreadcrumbItem): void {
        console.log('// TODO bring breadcrumbs to life');
        alert('TODO bring breadcrumbs to life');
    }

    const items: IBreadcrumbItem[] = [
        { text: 'Dashboard', key: 'dashboard', onClick: _onBreadcrumbItemClicked },
        { text: 'Todo', key: 'todo', onClick: _onBreadcrumbItemClicked },
    ];

    const breadCrumbs = (
        <Breadcrumb
            items={items}
            maxDisplayedItems={10}
            dividerAs={_getCustomDivider}
        />
    );

    return (
        <LayoutWithSidebar navigation={nav}>
            <div id="topNavBar" className="nav flex-container">
                <div className="left flex-start">
                    {breadCrumbs}
                </div>

                <div className="right item flex-end">
                    <EnvironmentChanger application={application} environment={environment} />
                    <ApplicationsChanger applications={applications} current={applicationId} />
                </div>
            </div>



            <Route exact path="/application/:applicationId/:environment/environment/create">
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

            <Route exact path="/application/:applicationId/:environment/pod/view/:podName/logs">
                <PodViewScreen />
            </Route>

            <Route path="/application/:applicationId/:environment/backup">
                <BackupScreen application={application} />
            </Route>
            <Route path="/application/:applicationId/:environment/dashboard">
                <ApplicationDashboardScreen />
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
                <BusinessMomentsOverview application={application} />
            </Route>

            <Route exact path="/application/:applicationId/:environment/business-moments/editor/:businessMomentId/microservice/:microserviceId">
                <BusinessMomentEditor application={application} />
            </Route>
        </LayoutWithSidebar >
    );
};

function _getCustomDivider(dividerProps: IDividerAsProps): JSX.Element {
    const tooltipText = dividerProps.item ? dividerProps.item.text : '';
    return (
        <TooltipHost content={`Show ${tooltipText} contents`} calloutProps={{ gapSpace: 0 }}>
            <span aria-hidden="true" style={{ cursor: 'pointer', padding: 5 }}>
                /
        </span>
        </TooltipHost>
    );
}

