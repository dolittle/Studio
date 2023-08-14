// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { GlobalContextProvider } from './context/globalContext';
import { SnackbarProvider } from 'notistack';
import { Route, Routes } from 'react-router-dom';

import { Slide, SlideProps } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { LicenseInfo } from '@mui/x-license-pro';

import { themeDark, Icon } from '@dolittle/design-system';
import '@dolittle/design-system/theming/fonts';

import { useViewportResize } from './utils/useViewportResize';

import { RouteNotFound } from './components/notfound';
import { Problem } from './components/problem';
import { LandingPageDecider } from './components/layout/landingPageDecider';

import { BackupsScreen } from './applications/backupsScreen';
import { DocumentationScreen } from './applications/documentationScreen';
import { MicroservicesScreen } from './applications/microservicesScreen';
import { ContainerRegistryScreen } from './applications/containerRegistryScreen';
import { LogsScreen } from './applications/logsScreen';
import { M3ConnectorScreen } from './applications/m3connectorScreen';

import { ApplicationsScreen } from './spaces/applications/applicationsScreen';
import { ApplicationScreen } from './spaces/applications/applicationScreen';

import { Screen as AdminScreen } from './admin/adminScreen';
import { HomeScreen } from './home/homeScreen';
import { IntegrationsIndex } from './integrations';

// Set license info for MUI components
LicenseInfo.setLicenseKey(process.env.MUI_LICENSE_KEY!);

export const App = () => {
    useViewportResize();

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themeDark}>
                <CssBaseline />
                <GlobalContextProvider>
                    <SnackbarProvider
                        maxSnack={6}
                        autoHideDuration={4000}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        TransitionComponent={(props: SlideProps) => <Slide {...props} direction='up' />}
                        iconVariant={{ error: <Icon icon='ErrorRounded' sx={{ mr: 1 }} /> }}
                    >
                        <Routes>
                            <Route path='/' element={<LandingPageDecider />} />

                            <Route path='/applications' element={<ApplicationsScreen />} />

                            <Route path='/application/*' element={<ApplicationScreen />} />

                            <Route path='/backups/application/:applicationId/*' element={<BackupsScreen />} />

                            <Route path='/microservices/application/:applicationId/*' element={<MicroservicesScreen />} />

                            <Route path='/documentation/application/:applicationId/*' element={<DocumentationScreen />} />

                            <Route path='/containerregistry/application/:applicationId/:environment/*' element={<ContainerRegistryScreen />} />

                            <Route path='/m3connector/application/:applicationId/*' element={<M3ConnectorScreen />} />

                            <Route path='/logs/application/:applicationId/:environment' element={<LogsScreen />} />

                            <Route path='/admin/*' element={<AdminScreen />} />

                            <Route path='/problem' element={<Problem />} />

                            <Route path='/home' element={<HomeScreen />} />

                            <Route path='/integrations/*' element={<IntegrationsIndex />} />

                            <Route path='*' element={<RouteNotFound redirectUrl='/' auto={true} />} />
                        </Routes>
                    </SnackbarProvider>
                </GlobalContextProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};
