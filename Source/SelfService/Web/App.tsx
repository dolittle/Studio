// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

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

import { GlobalContextProvider } from './context/globalContext';

import { RouteNotFound } from './components/notfound';
import { DieAndRestart } from './components/dieAndRestart';

import { LayoutWithSidebar } from './components/layout/layoutWithSidebar';

import { BackupsScreen } from './applications/backupsScreen';
import { DocumentationScreen } from './applications/documentationScreen';
import { MicroservicesScreen } from './applications/microservicesScreen';
import { Screen as AdminScreen } from './admin/adminScreen';
import { ApplicationsScreen } from './spaces/applications/applicationsScreen';
import { ApplicationScreen } from './spaces/applications/applicationScreen';
import { ContainerRegistryScreen } from './applications/containerRegistryScreen';
import { M3ConnectorScreen } from './applications/m3connectorScreen';
import { LogsScreen } from './applications/logsScreen';
import { HomeScreen } from './home/homeScreen';
import { IntegrationsIndex } from './integrations';

// Set license info for MUI components
LicenseInfo.setLicenseKey(process.env.MUI_LICENSE_KEY!);

// Make all stacked snackbars with same width and add full height to container
const snackbarStyles = { 'height': '100%', '& .notistack-SnackbarContainer>*': { width: 1 } };

export const App = () => {
    useViewportResize();

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
                                    <Route path='/' element={<Navigate to='/applications' />} />

                                    <Route path='/applications' element={<ApplicationsScreen />} />

                                    <Route path='/application/*' element={<ApplicationScreen />} />

                                    <Route path='/backups/application/:applicationId/*' element={<BackupsScreen />} />

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

                                    <Route path="/home" element={<HomeScreen />} />

                                    <Route path="/integrations/*" element={<IntegrationsIndex />} />

                                    <Route path='*' element={<RouteNotFound redirectUrl='/applications' auto={true} />} />
                                </Routes>
                            </SnackbarProvider>
                        </Box>
                    </GlobalContextProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </>
    );
};
