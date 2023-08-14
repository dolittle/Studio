// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useNavigate, Routes, Route } from 'react-router-dom';

import { Typography } from '@mui/material';

import { HttpResponseApplication } from '../../apis/solutions/application';
import { getReposInContainerRegistry, ContainerRegistryImages } from '../../apis/solutions/containerregistry';

import { View as Tags } from './tags';
import { View as Images } from './images';
import { View as Welcome } from './welcome';

export type ContainerRegistryContainerProps = {
    environment: string;
    application: HttpResponseApplication;
};

export const ContainerRegistryContainer = ({ environment, application }: ContainerRegistryContainerProps) => {
    const navigate = useNavigate();

    const applicationId = application.id;

    const [containerRegistryImages, setContainerRegistryImages] = useState({
        url: '',
        images: [],
    } as ContainerRegistryImages);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            getReposInContainerRegistry(applicationId)
        ]).then(values => {
            setContainerRegistryImages(values[0]);
            setIsLoaded(true);
        });
    }, []);

    if (!isLoaded) return null;

    const hasImages = containerRegistryImages.images.length > 0;

    // Force redirect if no images to the welcome screen
    if (!hasImages && !window.location.pathname.endsWith('/overview/welcome')) {
        const href = `/containerregistry/application/${applicationId}/overview/welcome`;
        navigate(href);
        return null;
    }

    return (
        <>
            <div>
                <Typography variant='h1' my={2}>Container Registry</Typography>
            </div>

            <div>
                <Routes>
                    <Route path='/' element={<Images applicationId={applicationId} environment={environment} data={containerRegistryImages} />} />
                    <Route path='/welcome' element={<Welcome applicationId={applicationId} />} />
                    <Route path='/tags/:image' element={<Tags url={containerRegistryImages.url} applicationId={applicationId} environment={environment} />} />
                </Routes>
            </div>
        </>
    );
};
