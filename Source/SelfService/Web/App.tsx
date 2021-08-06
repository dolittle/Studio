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
import { MicroservicesScreen } from './screens/microservicesScreen';
import { GlobalContextProvider } from './stores/notifications';
import CssBaseline from '@material-ui/core/CssBaseline';
import { RouteNotFound } from './components/notfound';
import { EnvironmentScreen } from './screens/environmentScreen';

import {
    createTheme,
    ThemeProvider,
} from '@material-ui/core/styles';

const themeDark = createTheme({
    palette: {
        background: {
            default: '#323F4B',
            paper: '#323F4B',
        },
        text: {
            primary: '#1AD8C3'
        }
    }
});

export const App = () => {
    const { pathname } = useLocation();
    // Little hack to force redirect
    if (['', '/', uriWithAppPrefix('/')].includes(pathname)) {
        window.location.href = uriWithAppPrefix('/applications');
        return null;
    }

    return (
        <>
            <ThemeProvider theme={themeDark}>
                <CssBaseline />
                <GlobalContextProvider>
                    <BrowserRouter basename={uriWithAppPrefix('')}>
                        <Switch>
                            <Route exact path="/login">
                                <LoginScreen />
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


                            <RouteNotFound redirectUrl="/applications" auto={true} />
                        </Switch>
                    </BrowserRouter>
                </GlobalContextProvider>
            </ThemeProvider>
        </>
    );
};
