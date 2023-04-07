// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useGlobalContext } from '../../context/globalContext';

import { Box, Typography } from '@mui/material';

import { Button } from '@dolittle/design-system';

import { ShortInfoWithEnvironment } from '../../apis/solutions/api';
import { HttpResponseApplications, getApplications } from '../../apis/solutions/application';

import { LoginWrapper } from '../../components/layout/loginWrapper';
import { ApplicationsList } from './applicationsList';

export const ApplicationsScreen = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { hasOneCustomer, setCurrentEnvironment } = useGlobalContext();

    const [applicationInfos, setApplicationInfos] = useState([] as ShortInfoWithEnvironment[]);
    const [loaded, setLoaded] = useState(false);
    const [canCreateApplication, setCanCreateApplication] = useState(false);

    // TODO handle when not 200!
    useEffect(() => {
        Promise.all([
            getApplications(),
        ]).then(values => {
            const response = values[0] as HttpResponseApplications;
            setCanCreateApplication(response.canCreateApplication);
            setApplicationInfos(response.applications);
            setLoaded(true);
        }).catch(error => {
            console.log(error);
            enqueueSnackbar('Failed getting data from the server', { variant: 'error' });
        });
    }, []);

    if (!loaded) return null;

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

        const href = '/application/create';
        navigate(href);
    };

    return (
        <LoginWrapper>
            <Typography variant='h2' sx={{ my: 2, mb: 5 }}>
                {applicationInfos.length > 0 ? 'Select Your Application & Environment' : 'There are no Applications'}
            </Typography>

            <Box sx={{ width: 1 }}>
                <Button label='Create new Application' startWithIcon='AddCircle' onClick={handleApplicationCreate} />
            </Box>

            <ApplicationsList data={applicationInfos} onChoose={onEnvironmentChoose} />

            <Box sx={{ mt: 12.5, display: 'flex', justifyContent: 'space-around' }}>
                {!hasOneCustomer &&
                    <Button label='Back to Customers' color='subtle' startWithIcon='ArrowBack' href='/.auth/cookies/initiate' />
                }
                <Button label='Log out' color='subtle' href='/.auth/cookies/logout' />
            </Box>
        </LoginWrapper>
    );
};
