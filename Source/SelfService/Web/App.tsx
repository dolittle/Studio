// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Route, BrowserRouter, useLocation, Switch } from 'react-router-dom';

import { ApplicationsScreen } from './screens/applicationsScreen';

import { uriWithAppPrefix } from './store';
import { LoginScreen } from './screens/loginScreen';
import { BackupsScreen } from './screens/backupsScreen';
import { BusinessMomentsScreen } from './screens/businessMomentsScreen';
import { DocumentationScreen } from './screens/documentationScreen';
import { InsightsScreen } from './screens/insightsScreen';
import { DashboardScreen } from './screens/dashboardScreen';
import { EnvironmentScreen } from './screens/environmentScreen';
import { MicroservicesScreen } from './screens/microservicesScreen';



export const App = () => {
    const { pathname } = useLocation();
    // Little hack to force redirect
    if (['', '/', uriWithAppPrefix('/')].includes(pathname)) {
        window.location.href = uriWithAppPrefix('/applications');
        return null;
    }

    return (
        <>
            <BrowserRouter basename={uriWithAppPrefix('')}>
                <Switch>
                    <Route exact path="/login">
                        <LoginScreen />
                    </Route>

                    <Route path="/dashboard">
                        <DashboardScreen />
                    </Route>

                    <Route path="/backups/application/:applicationId">
                        <BackupsScreen />
                    </Route>

                    <Route exact path="/applications">
                        <ApplicationsScreen />
                    </Route>

                    <Route path="/environment/application/:applicationId">
                        <EnvironmentScreen />
                    </Route>

                    <Route path="/microservices/application/:applicationId">
                        <MicroservicesScreen />
                    </Route>

                    <Route path="/business-moments/application/:applicationId">
                        <BusinessMomentsScreen />
                    </Route>

                    <Route path="/documentation/application/:applicationId">
                        <DocumentationScreen />
                    </Route>

                    <Route path="/insights">
                        <InsightsScreen />
                    </Route>


                    <Route>
                        <h1>Somehting has gone wrong</h1>
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
};
