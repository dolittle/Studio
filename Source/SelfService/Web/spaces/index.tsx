// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useGlobalContext } from '../context/globalContext';
import { useSnackbar } from 'notistack';

import { Box, Stack, Typography } from '@mui/material';

import { Button, Link } from '@dolittle/design-system';

import { ShortInfo } from '../apis/solutions/api';
import { getApplicationsListing, getLiveApplications } from '../apis/solutions/application';

import { ApplicationsList } from './applicationsList';
import { LoginWrapper } from '../layout/loginWrapper';
import { ApplicationCreateDialog } from '../components/applicationCreateDialog';
import { usePageTitle } from '../utils/usePageTitle';

export const ApplicationsIndex = () => {
    usePageTitle('Applications');
    const { enqueueSnackbar } = useSnackbar();
    const { currentApplicationId, hasOneCustomer } = useGlobalContext();

    const [applicationInfos, setApplicationInfos] = useState([] as ShortInfo[]);
    const [liveApplications, setLiveApplications] = useState([] as ShortInfo[]);
    const [canCreateApplication, setCanCreateApplication] = useState(false);
    const [createSpaceDialogOpen, setCreateSpaceDialogOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            getApplicationsListing(),
            getLiveApplications(),
        ]).then(values => {
            setApplicationInfos(values[0].applications);
            setLiveApplications(values[1].applications);
            setCanCreateApplication(values[0].canCreateApplication);
            setIsLoaded(true);
        }).catch(() => enqueueSnackbar('Failed getting data from the server.', { variant: 'error' }));
    }, [currentApplicationId]);

    if (!isLoaded) return null;

    const handleApplicationCreate = () => {
        if (!canCreateApplication) {
            enqueueSnackbar('Currently disabled, please reach out via freshdesk or teams.', { variant: 'error' });
            return;
        }

        setCreateSpaceDialogOpen(true);
    };

    return (
        <LoginWrapper>
            <ApplicationCreateDialog isOpen={createSpaceDialogOpen} onClose={() => setCreateSpaceDialogOpen(false)} />

            <Typography variant='h2' sx={{ mb: 4 }}>
                {applicationInfos.length > 0 ? 'Select Your Application' : 'There are no Applications'}
            </Typography>

            <Box sx={{ display: 'inline-block' }}>
                <ApplicationsList data={applicationInfos} liveApplicationsList={liveApplications} />

                <Button
                    label='Create new Application'
                    variant='outlined'
                    isFullWidth
                    onClick={handleApplicationCreate}
                    sx={{ minWidth: 155 }}
                />
            </Box>

            <Stack sx={{ mt: 12, gap: 4 }}>
                {!hasOneCustomer &&
                    <Box>
                        <Button label='Back to organizations' color='subtle' startWithIcon='ArrowBack' href='/.auth/cookies/initiate' />
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
