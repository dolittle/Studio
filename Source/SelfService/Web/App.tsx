// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Route, BrowserRouter, useLocation, Switch } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import { SnackbarProvider } from 'notistack';

import { LicenseInfo } from '@mui/x-license-pro';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { Box, Slide, SlideProps } from '@mui/material';
import { ErrorRounded } from '@mui/icons-material';

import '@dolittle/design-system/theming/fonts';
import { themeDark } from '@dolittle/design-system';
import { Snackbar } from '@dolittle/design-system/atoms/Snackbar/Snackbar';

import { useViewportResize } from './utils/useViewportResize';

import { uriWithAppPrefix } from './store';
import { GlobalContextProvider } from './stores/notifications';

import { RouteNotFound } from './components/notfound';
import { DieAndRestart } from './components/dieAndRestart';

import { LayoutWithSidebar } from './layout/layoutWithSidebar';

import { ThemeScreen } from './screens/themeScreen';
import { LoginScreen } from './screens/loginScreen';
import { BackupsScreen } from './screens/backupsScreen';
import { DocumentationScreen } from './screens/documentationScreen';
//import { InsightsScreen } from './screens/insightsScreen';
import { MicroservicesScreen } from './screens/microservicesScreen';
import { Screen as AdminScreen } from './screens/adminScreen';
import { ApplicationsScreen } from './screens/applicationsScreen/applicationsScreen';
import { ApplicationScreen } from './screens/applicationScreen';
import { ContainerRegistryScreen } from './screens/containerRegistryScreen';
import { M3ConnectorScreen } from './screens/m3connectorScreen';
import { LogsScreen } from './screens/logsScreen';

LicenseInfo.setLicenseKey('4a83cf3032e8518adfbe8694d092262dTz00ODUxMyxFPTE2OTEyMjE0ODgxODUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');

const snackbarStyles = {
    '& .notistack-SnackbarContainer>*': {
        width: '100%'
    }
};

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
};

export const App = () => {
    useViewportResize();

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
    };

    return (
        <>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themeDark}>
                    <CssBaseline />
                    <GlobalContextProvider>
                        <Box sx={snackbarStyles}>
                            <SnackbarProvider
                                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                                TransitionComponent={SlideTransition}
                                autoHideDuration={4000}
                                maxSnack={6}
                                Components={{
                                    error: Snackbar,
                                    warning: Snackbar,
                                    info: Snackbar,
                                    success: Snackbar
                                }}
                                iconVariant={{
                                    error: <ErrorRounded fontSize="small" sx={{ mr: 1 }} />,
                                    warning: null,
                                    info: null,
                                    success: null,
                                    default: null
                                }}
                            >
                                <BrowserRouter basename={uriWithAppPrefix('')}>
                                    <QueryParamProvider ReactRouterRoute={Route}>
                                        <Switch>
                                            <Route exact path='/login'>
                                                <LoginScreen />
                                            </Route>

                                            <Route path='/backups/application/:applicationId'>
                                                <BackupsScreen />
                                            </Route>

                                            <Route exact path='/applications'>
                                                <ApplicationsScreen />
                                            </Route>

                                            <Route path='/application/'>
                                                <ApplicationScreen />
                                            </Route>

                                            <Route path='/microservices/application/:applicationId/:environment'>
                                                <MicroservicesScreen />
                                            </Route>

                                            <Route path='/documentation/application/:applicationId/:environment'>
                                                <DocumentationScreen />
                                            </Route>

                                            {/* <Route path='/insights/application/:applicationId/:environment'>
                                                <InsightsScreen />
                                            </Route> */}

                                            <Route path='/containerregistry/application/:applicationId/:environment'>
                                                <ContainerRegistryScreen />
                                            </Route>

                                            <Route path='/m3connector/application/:applicationId'>
                                                <M3ConnectorScreen />
                                            </Route>

                                            <Route path='/logs/application/:applicationId/:environment'>
                                                <LogsScreen />
                                            </Route>

                                            <Route path='/admin/'>
                                                <AdminScreen />
                                            </Route>

                                            <Route path='/debug/theme'>
                                                <ThemeScreen />
                                            </Route>

                                            <Route exact path='/problem'>
                                                <LayoutWithSidebar navigation={[]}>
                                                    <DieAndRestart />
                                                </LayoutWithSidebar>
                                            </Route>

                                            <RouteNotFound
                                                redirectUrl='/applications'
                                                auto={true}
                                            />
                                        </Switch>
                                    </QueryParamProvider>
                                </BrowserRouter>
                            </SnackbarProvider>
                        </Box>
                    </GlobalContextProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </>
    );
};
