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
import { LandingPageDecider } from './layout/landingPageDecider';

import { BackupsIndex } from './applications/backup';
import { ContainerRegistryIndex } from './applications/containerregistry';
import { LogsIndex } from './applications/logging';
import { MicroservicesIndex } from './applications/microservice';
import { M3ConnectorIndex } from './applications/m3connector';
import { SetupIndex } from './applications/setup';

import { AdminIndex } from './admin';
import { HomeIndex } from './home';
import { IntegrationsIndex } from './integrations';

import { ApplicationsIndex } from './spaces/applications';
import { ApplicationBuilding } from './spaces/applications/applicationBuilding';

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
                            <Route path='/home' element={<HomeIndex />} />
                            <Route path='/applications' element={<ApplicationsIndex />} />
                            <Route path='/microservices/application/:applicationId/*' element={<MicroservicesIndex />} />
                            <Route path='/backups/application/:applicationId/*' element={<BackupsIndex />} />
                            <Route path='/containerregistry/application/:applicationId/*' element={<ContainerRegistryIndex />} />
                            <Route path='/m3connector/application/:applicationId/*' element={<M3ConnectorIndex />} />
                            <Route path='/logs/application/:applicationId' element={<LogsIndex />} />
                            <Route path='/setup/application/:applicationId/*' element={<SetupIndex />} />
                            <Route path='/integrations/*' element={<IntegrationsIndex />} />
                            <Route path='/admin/*' element={<AdminIndex />} />
                            <Route path='/building' element={<ApplicationBuilding />} />
                            <Route path='/problem' element={<Problem />} />
                            <Route path='*' element={<RouteNotFound redirectUrl='/' auto={true} />} />
                        </Routes>
                    </SnackbarProvider>
                </GlobalContextProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};
