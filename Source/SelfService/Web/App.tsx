// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Route, useLocation, Routes } from 'react-router-dom';

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

import { LoginScreen } from './screens/loginScreen';
import { BackupsScreen } from './screens/backupsScreen';
import { DocumentationScreen } from './screens/documentationScreen';
import { MicroservicesScreen } from './screens/microservicesScreen';
import { Screen as AdminScreen } from './screens/adminScreen';
import { ApplicationsScreen } from './screens/applicationsScreen/applicationsScreen';
import { ApplicationScreen } from './screens/applicationScreen';
import { ContainerRegistryScreen } from './screens/containerRegistryScreen';
import { M3ConnectorScreen } from './screens/m3connectorScreen';
import { LogsScreen } from './screens/logsScreen';

// Set license info for MUI components
LicenseInfo.setLicenseKey(process.env.MUI_LICENSE_KEY!);

// Make all stacked snackbars with same width
const snackbarStyles = { '& .notistack-SnackbarContainer>*': { width: 1 } };

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
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                TransitionComponent={(props: SlideProps) => <Slide {...props} direction='up' />}
                                autoHideDuration={4000}
                                maxSnack={6}
                                Components={{
                                    error: Snackbar,
                                    warning: Snackbar,
                                    info: Snackbar,
                                    success: Snackbar
                                }}
                                iconVariant={{
                                    error: <ErrorRounded fontSize='small' sx={{ mr: 1 }} />,
                                    warning: null,
                                    info: null,
                                    success: null,
                                    default: null
                                }}
                            >
                                <Routes>
                                    <Route path='/login' element={<LoginScreen />} />

                                    <Route path='/backups/application/:applicationId/*' element={<BackupsScreen />} />

                                    <Route path='/applications' element={<ApplicationsScreen />} />

                                    <Route path='/application/*' element={<ApplicationScreen />} />

                                    <Route path='/microservices/application/:applicationId/:environment/*' element={<MicroservicesScreen />} />

                                    <Route path='/documentation/application/:applicationId/:environment/*' element={<DocumentationScreen />} />

                                    <Route path='/containerregistry/application/:applicationId/:environment/*' element={<ContainerRegistryScreen />} />

                                    <Route path='/m3connector/application/:applicationId/*' element={<M3ConnectorScreen />} />

                                    <Route path='/logs/application/:applicationId/:environment' element={<LogsScreen />} />

                                    <Route path='/admin/*' element={<AdminScreen />} />

                                    <Route path='/problem' element={
                                        <LayoutWithSidebar navigation={[]}>
                                            <DieAndRestart />
                                        </LayoutWithSidebar>
                                    } />

                                    {/* TODO Pav: remove custom RouteNotFound https://reactrouter.com/en/main/upgrading/v5#upgrade-to-react-router-v6 */}
                                    <RouteNotFound
                                        redirectUrl='/applications'
                                        auto={true}
                                    />
                                </Routes>
                            </SnackbarProvider>
                        </Box>
                    </GlobalContextProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </>
    );
};
