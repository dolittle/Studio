// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useGlobalContext } from '../../context/globalContext';

import { Box, Stack, Typography } from '@mui/material';

import { Button, Link } from '@dolittle/design-system';

import { ShortInfoWithEnvironment } from '../../apis/solutions/api';
import { HttpResponseApplications, getApplications } from '../../apis/solutions/application';

import { LoginWrapper } from '../../components/layout/loginWrapper';
import { SpaceCreateDialog } from '../../components/spaceCreateDialog';
import { ApplicationsList } from './applicationsList';

export const ApplicationsScreen = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { currentApplicationId, hasOneCustomer, setCurrentEnvironment } = useGlobalContext();

    const [applicationInfos, setApplicationInfos] = useState([] as ShortInfoWithEnvironment[]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [canCreateApplication, setCanCreateApplication] = useState(false);
    const [createSpaceDialogOpen, setCreateSpaceDialogOpen] = useState(false);

    // TODO handle when not 200!
    useEffect(() => {
        Promise.all([getApplications()])
            .then(values => {
                const response = values[0] as HttpResponseApplications;
                setCanCreateApplication(response.canCreateApplication);
                setApplicationInfos(response.applications);
                setIsLoaded(true);
            })
            .catch(() => enqueueSnackbar('Failed getting data from the server.', { variant: 'error' }));
    }, [currentApplicationId]);

    if (!isLoaded) return null;

    const onEnvironmentChoose = (application: ShortInfoWithEnvironment) => {
        const { environment, id } = application;
        setCurrentEnvironment(environment);
        const href = `/microservices/application/${id}/${environment}/overview`;
        navigate(href);
    };

    const handleApplicationCreate = () => {
        if (!canCreateApplication) {
            enqueueSnackbar('Currently disabled, please reach out via freshdesk or teams.', { variant: 'error' });
            return;
        }

        setCreateSpaceDialogOpen(true);
    };

    return (
        <LoginWrapper>
            <SpaceCreateDialog isOpen={createSpaceDialogOpen} onClose={() => setCreateSpaceDialogOpen(false)} />

            <Typography variant='h2' sx={{ mb: 4 }}>
                {applicationInfos.length > 0 ? 'Select Your Application & Environment' : 'There are no Applications'}
            </Typography>

            <Box sx={{ display: 'inline-block' }}>
                <ApplicationsList data={applicationInfos} onChoose={onEnvironmentChoose} />

                <Button
                    label='Create new Application'
                    variant='outlined'
                    isFullWidth
                    onClick={handleApplicationCreate}
                    sx={{ minWidth: 155, display: 'block' }}
                />
            </Box>

            <Stack sx={{ mt: 12, gap: 4 }}>
                {!hasOneCustomer &&
                    <Box>
                        <Button label='Back to Customers' color='subtle' startWithIcon='ArrowBack' href='/.auth/cookies/initiate' />
                    </Box>
                }

                <Typography>
                    Don’t have access to a applications? <Link message='Contact us' href='mailto:support@dolittle.com' /> to get started.
                </Typography>

                <Box>
                    <Button label='Log out' color='subtle' href='/.auth/cookies/logout' />
                </Box>
            </Stack>
        </LoginWrapper>
    );
};
