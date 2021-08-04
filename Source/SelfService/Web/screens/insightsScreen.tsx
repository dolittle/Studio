// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';

import { getApplication, getApplications, HttpResponseApplications2, ShortInfoWithEnvironment, HttpResponseApplications } from '../api/api';

import { EnvironmentChanger } from '../application/environmentChanger';


import { getDefaultMenu, LayoutWithSidebar } from '../layout/layoutWithSidebar';


// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
import '../application/applicationScreen.scss';
import { ApplicationsChanger } from '../application/applicationsChanger';

import { BreadCrumbContainer } from '../layout/breadcrumbs';
import { PickEnvironment } from '../components/pickEnvironment';
import { InsightsContainerScreen } from '../insights/container';
import { withRouteApplicationProps } from '../utils/route';




export const InsightsScreen: React.FunctionComponent = () => {
    const history = useHistory();

    const routeApplicationProps = withRouteApplicationProps('insights');
    const applicationId = routeApplicationProps.applicationId;
    const environment = routeApplicationProps.environment;

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

    const nav = getDefaultMenu(history, application.id, environment, '');

    const environmentOnClick = (applicationId: string, environment: string) => {
        const href = `/insights/application/${applicationId}/${environment}/overview`;
        history.push(href);
    };

    return (
        <LayoutWithSidebar navigation={nav}>
            <div id="topNavBar" className="nav flex-container">
                <div className="left flex-start">
                    <BreadCrumbContainer />
                </div>

                <Route path="/insights/application/:applicationId/:environment">
                    <div className="right item flex-end">
                        <EnvironmentChanger application={application} environment={environment} />
                        <ApplicationsChanger applications={applications} current={applicationId} />
                    </div>
                </Route>
            </div>

            <Route path="/insights/application/:applicationId/:environment">
                <InsightsContainerScreen application={application} environment={environment} />
            </Route>

            <Route exact path="/insights/application/:applicationId">
                <PickEnvironment application={application} onClick={environmentOnClick} />
            </Route>
        </LayoutWithSidebar >
    );
};
