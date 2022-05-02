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
import CssBaseline from '@mui/material/CssBaseline';
import { RouteNotFound } from './components/notfound';
import { Screen as AdminScreen } from './screens/adminScreen';

import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { DieAndRestart } from './components/dieAndRestart';
import { LayoutWithSidebar } from './layout/layoutWithSidebar';

import { SnackbarProvider } from 'notistack';
import Grow from '@mui/material/Grow';
import { TransitionProps } from '@mui/material/transitions';
import { ThemeScreen } from './screens/themeScreen';
import '@fontsource/rubik';
import { ApplicationScreen } from './screens/applicationScreen';
import { Box } from '@mui/material';
import { ContainerRegistryScreen } from './screens/containerRegistryScreen';


const typography = {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    htmlFontSize: 14,
    fontSize: 14,
    body1: {
        fontFamily: 'Rubik',
        color: '#E9EAEC',
        fontSize: '14px',
        letterSpacing: '-0.01em',
        lineHeight: '16px'
    }
};


const themeDark = createTheme({
    typography,
    palette: {
        primary: {
            main: '#8C9AF8',
            light: '#b3bbfb',
            dark: '#6678f6',
            contrastText: '#191A21',
        },
        secondary: {
            main: '#76E8DB',
            light: '#A3EFE7',
            dark: '#48E0CF',
            contrastText: '#191A21',
        },
        background: {
            default: '#0F1014',
            paper: '#191A21',
        },
        text: {
            disabled: '#93959f',
            primary: '#fafafa',
            secondary: '#cecfd0',
        },
    },
});

const snackbarStyles = {
    '& .SnackbarContent-root.': {
        backgroundColor: '#2C2B33',
        color: '#FAFAFA',
    },
    '& .SnackbarContent-root.SnackbarItem-variantError': {
        backgroundColor: '#F44040',
    }
};

export const App = () => {
    const { pathname } = useLocation();
    // Little hack to force redirect
    if (['', '/', uriWithAppPrefix('/')].includes(pathname)) {
        // It is possible to know that the user just picked a customer
        // We could signal this to the applications page
        // This could then redirect, if the
        // We could offer redirect back to last page?
        // Referer https://dolittle.studio/.auth/select-tenant?login_challenge=c84329905dd7402bb45377dc8e1006c9
        window.location.href = uriWithAppPrefix('/applications');
        return null;
    }

    return <>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themeDark}>
                <CssBaseline />
                <GlobalContextProvider>
                    <Box sx={snackbarStyles}>
                        <SnackbarProvider
                            maxSnack={1}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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

                                    <Route path="/application/">
                                        <ApplicationScreen />
                                    </Route>


                                    <Route path="/microservices/application/:applicationId/:environment">
                                        <MicroservicesScreen />
                                    </Route>

                                    <Route path="/business-moments/application/:applicationId/:environment">
                                        <BusinessMomentsScreen />
                                    </Route>

                                    <Route path="/containerregistry/application/:applicationId/:environment">
                                        <ContainerRegistryScreen />
                                    </Route>

                                    <Route path="/documentation/application/:applicationId/:environment">
                                        <DocumentationScreen />
                                    </Route>

                                    <Route path="/insights/application/:applicationId/:environment">
                                        <InsightsScreen />
                                    </Route>


                                    <Route path="/admin/">
                                        <AdminScreen />
                                    </Route>

                                    <Route path="/debug/theme">
                                        <ThemeScreen />
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
                    </Box>
                </GlobalContextProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    </>;
};
