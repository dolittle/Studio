// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Typography } from '@mui/material';

import { getPersonalisedInfo } from '../../apis/solutions/application';

import { AccessContainerRegistry } from '../setup/accessContainerRegistry';

export type RegistryWelcomeProps = {
    applicationId: string;
};

export const RegistryWelcome = ({ applicationId }: RegistryWelcomeProps) => {
    const [info, setInfo] = useState({} as any);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Promise.all([getPersonalisedInfo(applicationId)])
            .then(values => {
                const data = values[0];
                data.applicationId = applicationId;
                setInfo(data);
                setIsLoaded(true);
            });
    }, []);

    if (!isLoaded) return null;

    return (
        <>
            <Typography>Your container registry is empty</Typography>
            <br />

            <Typography variant='h1' my={2}>How to access and add an image to your container registry</Typography>
            <br />

            <AccessContainerRegistry info={info} />
        </>
    );
};
