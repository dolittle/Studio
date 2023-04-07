// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { isApplicationOnline } from '../../apis/solutions/application';

import { Box, List, ListItem, Typography } from '@mui/material';

import { AlertBox, AlertBoxErrorMessage, LoadingSpinner } from '@dolittle/design-system';

import { ButtonLink } from '../../components/buttonLink';

export const Building = () => {
    const navigate = useNavigate();
    const { applicationId } = useParams() as any;

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        checkApplicationStatus()
            .catch(console.error);
    }, []);

    const checkApplicationStatus = async () => {
        const result = await isApplicationOnline(applicationId);

        if (result.status === 200) {
            navigate(`/applications/`);
            setIsLoading(true);
        }
    };

    if (!isLoading) {
        return (
            <Box sx={{ width: 1 }}>
                <AlertBox title='Could not create application' message={<AlertBoxErrorMessage />} severity='error' />
                <ButtonLink
                    label='Go back to applications page'
                    color='subtle'
                    startWithIcon='ArrowBack'
                    sx={{ mt: 4 }}
                    href='/applications'
                />
            </Box>
        );
    };

    return (
        <>
            <>
                <Typography variant='h1' sx={{ my: 2 }}>Building application:</Typography>
                <Typography variant='h3' sx={{ my: 2 }}>{applicationId}</Typography>
            </>

            <>
                <Typography variant='h6' sx={{ my: 4 }}>This might take a few moments.</Typography>
                <LoadingSpinner />
            </>

            <Typography variant='h6' sx={{ textAlign: 'left', my: 2 }}>What is happening?</Typography>
            <List>
                <ListItem>Setting up your application in the platform...</ListItem>
                <ListItem>Setting up your backups...</ListItem>
                <ListItem>Setting up your environments...</ListItem>
                <ListItem>Setting up your welcome microservice...</ListItem>
            </List>
        </>
    );
};
