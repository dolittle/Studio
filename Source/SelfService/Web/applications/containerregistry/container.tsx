// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { HttpResponseApplication } from '../../apis/solutions/application';

import { View as Tags } from './tags';
import { View as Images } from './images';
import { View as Welcome } from './welcome';

import { getReposInContainerRegistry, ContainerRegistryImages } from '../../apis/solutions/containerregistry';
import { Typography } from '@mui/material';

type Props = {
    environment: string
    application: HttpResponseApplication
};

export const ContainerRegistryContainer: React.FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();
    const _props = props!;
    const application = _props.application;
    const applicationId = application.id;
    const environment = _props.environment;

    const [loaded, setLoaded] = useState(false);
    const [containerRegistryImages, setContainerRegistryImages] = useState({
        url: '',
        images: [],
    } as ContainerRegistryImages);

    useEffect(() => {
        Promise.all([
            getReposInContainerRegistry(applicationId)
        ]).then(values => {
            setContainerRegistryImages(values[0]);
            setLoaded(true);
        });
    }, []);


    if (!loaded) {
        return null;
    }


    const hasImages = containerRegistryImages.images.length > 0;


    // Force redirect if no images to the welcome screen
    if (!hasImages && !window.location.pathname.endsWith('/overview/welcome')) {
        const href = `/containerregistry/application/${applicationId}/${environment}/overview/welcome`;
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
                    <Route path="/" element={<Images applicationId={applicationId} environment={environment} data={containerRegistryImages} />} />

                    <Route path="/welcome" element={<Welcome applicationId={applicationId} />} />

                    <Route path="/tags/:image" element={<Tags url={containerRegistryImages.url} applicationId={applicationId} environment={environment} />} />
                </Routes>
            </div>
        </>
    );
};
