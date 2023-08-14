// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Route, useNavigate, Routes } from 'react-router-dom';

import { useReadable } from 'use-svelte-store';

import { info, load, isLoaded } from '../stores/documentationInfo';

import { Box, Link, List, Typography } from '@mui/material';

import { HttpResponseApplication } from '../../apis/solutions/application';

import { Doc as VerifyKubernetesAccess } from './verifyKubernetesAccess';
import { Doc as AccessContainerRegistry } from './accessContainerRegistry';
import { Doc as SetupAzurePipelines } from './cicd/setupAzurePipelines';

import { RouteNotFound } from '../../components/notfound';

export type DocumentationContainerScreenProps = {
    application: HttpResponseApplication;
};

export const DocumentationContainerScreen = ({ application }: DocumentationContainerScreenProps) => {
    const navigate = useNavigate();
    const $info = useReadable(info) as any;
    const $isLoaded = useReadable(isLoaded) as boolean;

    const [loaded, setLoaded] = useState(false);

    const applicationId = application.id;

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

    const handleInfoClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        const href = `/documentation/application/${applicationId}/container-registry-info`;
        navigate(href);
    };

    const handleKubernetesAccessClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        const href = `/documentation/application/${applicationId}/verify-kubernetes-access`;
        navigate(href);
    };

    const handleAzurePipelinesClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        const href = `/documentation/application/${applicationId}/ci-cd/azure-pipelines`;
        navigate(href);
    };

    const handleBackClick = () => {
        const href = `/documentation/application/${applicationId}/overview`;
        navigate(href);
    };

    return (
        <Box sx={{ '& a': { color: 'text.primary' } }}>
            <Routes>
                <Route path='/overview' element={
                    <List sx={{ '& li': { my: 1 } }}>
                        <li><a href='#' onClick={handleInfoClick}>Container Registry Info</a></li>
                        <li><a href="#" onClick={handleKubernetesAccessClick}>Verify access to kubernetes</a></li>
                        <li><a href="#" onClick={handleAzurePipelinesClick}>Setup Azure Pipelines</a></li>
                    </List>
                } />

                <Route path='/container-registry-info' element={
                    <>
                        <Link onClick={handleBackClick}>Back</Link>
                        <Typography variant='h1' my={2}>Container Registry Info</Typography>
                        <AccessContainerRegistry info={$info} />
                    </>
                } />

                <Route path='/verify-kubernetes-access' element={
                    <>
                        <Link onClick={handleBackClick}>Back</Link>
                        <Typography variant='h1' my={2}>Verify access to kubernetes</Typography>
                        <VerifyKubernetesAccess info={$info} />
                    </>
                } />

                <Route path='/ci-cd/azure-pipelines' element={
                    <>
                        <Link onClick={handleBackClick}>Back</Link>
                        <Typography variant='h1' my={2}>Setup Azure Pipelines</Typography>
                        <SetupAzurePipelines info={$info} />
                    </>
                } />

                <Route element={<Typography variant='h1' my={2}>Something has gone wrong: documentation</Typography>} />
                <Route path='*' element={<RouteNotFound redirectUrl='overview' auto={true} />} />
            </Routes>
        </Box>
    );
};
