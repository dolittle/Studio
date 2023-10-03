// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Route, Routes, useNavigate, useHref } from 'react-router-dom';

import { useReadable } from 'use-svelte-store';

import { info, load, isLoaded } from '../../stores/documentationInfo';

import { Box, List, Typography } from '@mui/material';

import { Button, Link } from '@dolittle/design-system';

import { HttpResponseApplication } from '../../../apis/solutions/application';

import { VerifyKubernetesAccess } from './verifyKubernetesAccess';
import { AccessContainerRegistry } from './accessContainerRegistry';
import { SetupAzurePipelines } from './setupAzurePipelines';

import { RouteNotFound } from '../../../components/notfound';

export type SetupContainerScreenProps = {
    application: HttpResponseApplication;
};

export const SetupContainerScreen = ({ application }: SetupContainerScreenProps) => {
    const navigate = useNavigate();
    const $info = useReadable(info) as any;
    const $isLoaded = useReadable(isLoaded) as boolean;

    const [loaded, setLoaded] = useState(false);

    const applicationId = application.id;

    const containerRegistryHref = useHref(`/setup/application/${applicationId}/container-registry-info`);
    const kubernetesAccessHref = useHref(`/setup/application/${applicationId}/verify-kubernetes-access`);
    const azurePipelineHref = useHref(`/setup/application/${applicationId}/ci-cd/azure-pipelines`);

    useEffect(() => {
        if (!$isLoaded) {
            Promise.all([load(applicationId)])
                .then(() => setLoaded(true));
        } else {
            setLoaded(true);
        }
    }, []);

    if (!loaded) return null;

    if ($info.applicationId === '') return null;

    const handleBackClick = () => {
        const href = `/setup/application/${applicationId}/overview`;
        navigate(href);
    };

    return (
        <Box sx={{ '& a': { color: 'text.primary' }, '& h1': { mt: 4, mb: 2 } }}>
            <Routes>
                <Route path='/overview' element={
                    <List sx={{ '& li': { my: 2 } }}>
                        <li><Link href={containerRegistryHref} message='Container Registry Info' /></li>
                        <li><Link href={kubernetesAccessHref} message='Verify access to kubernetes' /></li>
                        <li><Link href={azurePipelineHref} message='Setup Azure Pipelines' /></li>
                    </List>
                } />

                <Route path='/container-registry-info' element={
                    <>
                        <Button label='Back to setup' startWithIcon='ArrowBack' color='subtle' onClick={handleBackClick} />
                        <Typography variant='h1'>Container Registry Info</Typography>
                        <AccessContainerRegistry info={$info} />
                    </>
                } />

                <Route path='/verify-kubernetes-access' element={
                    <>
                        <Button label='Back to setup' startWithIcon='ArrowBack' color='subtle' onClick={handleBackClick} />
                        <Typography variant='h1'>Verify access to kubernetes</Typography>
                        <VerifyKubernetesAccess info={$info} />
                    </>
                } />

                <Route path='/ci-cd/azure-pipelines' element={
                    <>
                        <Button label='Back to setup' startWithIcon='ArrowBack' color='subtle' onClick={handleBackClick} />
                        <Typography variant='h1'>Setup Azure Pipelines</Typography>
                        <SetupAzurePipelines info={$info} />
                    </>
                } />

                <Route element={<Typography variant='h1'>Something has gone wrong: documentation</Typography>} />
                <Route path='*' element={<RouteNotFound redirectUrl='overview' auto={true} />} />
            </Routes>
        </Box>
    );
};
