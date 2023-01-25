// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { isApplicationOnline } from '../api/application';

import { Box, List, ListItem, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import { AlertBox, AlertBoxErrorMessage, Button, LoadingSpinner } from '@dolittle/design-system';

export const Building = () => {
    const { applicationId } = useParams() as any;

    const [isLoading, setIsLoadig] = useState(false);

    useEffect(() => {
        checkApplicationStatus()
            .catch(console.error);
    }, []);

    const checkApplicationStatus = async () => {
        const result = await isApplicationOnline(applicationId);

        if (result.status === 200) {
            window.location.href = `/applications/`;
            setIsLoadig(true);
        }
    };

    if (!isLoading) {
        return (
            <Box sx={{ width: 1 }}>
                <AlertBox title='Could not create application' message={<AlertBoxErrorMessage />} severity='error' />
                <Button label='Go back to applications page' secondary startWithIcon={<ArrowBack />} href='/applications/' sx={{ mt: 4 }} />
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
