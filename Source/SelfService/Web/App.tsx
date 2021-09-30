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

import { createTheme, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import { DieAndRestart } from './components/dieAndRestart';
import { LayoutWithSidebar } from './layout/layoutWithSidebar';

import { ClassNameMap, CombinedClassKey, SnackbarProvider } from 'notistack';
import Grow from '@material-ui/core/Grow';
import { TransitionProps } from '@material-ui/core/transitions';

const themeDark = createTheme({
    spacing: 8,
    palette: {
        background: {
            default: '#191A21',
            paper: '#191A21',
        },
        text: {
            primary: '#E9EAEC',
            secondary: '#93959F',
        }
    },
});

const useSnackbarStyles = makeStyles({
    contentRoot: {
        backgroundColor: '#2C2B33',
        color: '#FAFAFA',
    },
    variantError: {
        backgroundColor: '#F44040',
    }
});

export const App = () => {
    const { pathname } = useLocation();
    // Little hack to force redirect
    if (['', '/', uriWithAppPrefix('/')].includes(pathname)) {
        // It is possible to know that the user just picked a tenant
        // We could signal this to the applications page
        // This could then redirect, if the
        // We could offer redirect back to last page?
        // Referer https://dolittle.studio/.auth/select-tenant?login_challenge=c84329905dd7402bb45377dc8e1006c9
        window.location.href = uriWithAppPrefix('/applications');
        return null;
    }

    const snackbarClasses = useSnackbarStyles();

    return (
        <>
            <ThemeProvider theme={themeDark}>
                <CssBaseline />
                <GlobalContextProvider>
                    <SnackbarProvider
                        maxSnack={1}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        classes={snackbarClasses as Partial<ClassNameMap<CombinedClassKey>>}
                        TransitionComponent={Grow as React.ComponentType<TransitionProps>}
                    >
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

                                <Route path="/microservices/application/:applicationId/:environment">
                                    <MicroservicesScreen />
                                </Route>

                                <Route path="/business-moments/application/:applicationId/:environment">
                                    <BusinessMomentsScreen />
                                </Route>

                                <Route path="/documentation/application/:applicationId/:environment">
                                    <DocumentationScreen />
                                </Route>

                                <Route path="/insights/application/:applicationId/:environment">
                                    <InsightsScreen />
                                </Route>

                                <Route exact path="/problem">
                                    <LayoutWithSidebar navigation={[]}>
                                        <DieAndRestart />
                                    </LayoutWithSidebar>

                                </Route>

                                <RouteNotFound redirectUrl="/applications" auto={true} />
                            </Switch>
                        </BrowserRouter>
                    </SnackbarProvider>
                </GlobalContextProvider>
            </ThemeProvider>
        </>
    );
};
