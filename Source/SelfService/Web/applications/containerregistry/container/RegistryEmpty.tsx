// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Typography } from '@mui/material';

import { LoadingSpinner } from '@dolittle/design-system';

import { getPersonalisedInfo } from '../../../apis/solutions/application';

import { AccessContainerRegistry } from '../../setup/cicd/accessContainerRegistry';

export type RegistryEmptyProps = {
    applicationId: string;
};

export const RegistryEmpty = ({ applicationId }: RegistryEmptyProps) => {
    const [info, setInfo] = useState({} as any);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([getPersonalisedInfo(applicationId)])
            .then(values => {
                const data = values[0];
                data.applicationId = applicationId;
                setInfo(data);
            })
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <>
            <Typography variant='h2'>Your container registry is empty...</Typography>
            <Typography variant='h5' sx={{ my: 2 }}>How to access and add an image to your container registry</Typography>

            <AccessContainerRegistry info={info} />
        </>
    );
};
