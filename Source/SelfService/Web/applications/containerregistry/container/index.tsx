// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useNavigate, Route, Routes } from 'react-router-dom';

import { Box } from '@mui/material';

import { LoadingSpinnerFullPage } from '@dolittle/design-system';

import { HttpResponseApplication } from '../../../apis/solutions/application';
import { ContainerRegistryImages, getReposInContainerRegistry } from '../../../apis/solutions/containerregistry';

import { PageTitle } from '../../../layout/PageTitle';
import { RegistryEmpty } from './RegistryEmpty';
import { RegistryImagesIndex } from './registryImages';

export type ContainerIndexProps = {
    application: HttpResponseApplication;
};

export const ContainerIndex = ({ application }: ContainerIndexProps) => {
    const navigate = useNavigate();

    const [containerRegistryImages, setContainerRegistryImages] = useState({
        url: '',
        images: [],
    } as ContainerRegistryImages);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([getReposInContainerRegistry(application.id)])
            .then(values => setContainerRegistryImages(values[0]))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <LoadingSpinnerFullPage />;

    const hasImages = containerRegistryImages.images.length > 0;

    // Force redirect if no images to the welcome screen.
    if (!hasImages && !window.location.pathname.endsWith('/overview/welcome')) {
        const href = `/containerregistry/application/${application.id}/overview/welcome`;
        navigate(href);
        return null;
    }

    return (
        <Box sx={{ mr: 3 }}>
            <PageTitle title='Container Registry' />
            <Routes>
                <Route path='/' element={<RegistryImagesIndex applicationId={application.id} data={containerRegistryImages} />} />
                <Route path='/welcome' element={<RegistryEmpty applicationId={application.id} />} />
            </Routes>
        </Box>
    );
};
