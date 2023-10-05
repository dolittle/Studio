// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useNavigate, Routes, Route } from 'react-router-dom';

import { Box } from '@mui/material';

import { HttpResponseApplication } from '../../../apis/solutions/application';
import { getReposInContainerRegistry, ContainerRegistryImages } from '../../../apis/solutions/containerregistry';

import { PageTitle } from '../../../layout/PageTitle';
import { RegistryImages } from './registryImages';
import { RegistryWelcome } from './registryWelcome';
import { RegistryTags } from './registryTags';

export type RegistryContainerProps = {
    application: HttpResponseApplication;
};

export const RegistryContainer = ({ application }: RegistryContainerProps) => {
    const navigate = useNavigate();

    const applicationId = application.id;

    const [containerRegistryImages, setContainerRegistryImages] = useState({
        url: '',
        images: [],
    } as ContainerRegistryImages);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Promise.all([getReposInContainerRegistry(applicationId)])
            .then(values => {
                setContainerRegistryImages(values[0]);
                setIsLoaded(true);
            });
    }, []);

    if (!isLoaded) return null;

    const hasImages = containerRegistryImages.images.length > 0;

    // Force redirect if no images to the welcome screen.
    if (!hasImages && !window.location.pathname.endsWith('/overview/welcome')) {
        const href = `/containerregistry/application/${applicationId}/overview/welcome`;
        navigate(href);
        return null;
    }

    return (
        <Box sx={{ mr: 3 }}>
            <PageTitle title='Container Registry' />
            <Routes>
                <Route path='/' element={<RegistryImages applicationId={applicationId} data={containerRegistryImages} />} />
                <Route path='/welcome' element={<RegistryWelcome applicationId={applicationId} />} />
                <Route path='/tags/:image' element={<RegistryTags url={containerRegistryImages.url} applicationId={applicationId} />} />
            </Routes>
        </Box>
    );
};
