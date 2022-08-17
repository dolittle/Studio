// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { ShortInfoWithEnvironment } from '../../api/api';
import { LoginWrapper } from '../../layout/loginWrapper';
import { useGlobalContext } from '../../stores/notifications';
import { HttpResponseApplications, getApplications } from '../../api/application';

import { Typography } from '@mui/material';

import { CreateButton } from './createButton';
import { ApplicationsList } from './applicationsList';
import { ActionButtons } from './actionButtons';

const styles = {
    my: 2,
    mb: 5,
    letterSpacing: '-0.5px',
    lineHeight: '1.625rem'
};

export const ApplicationsScreen = () => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const [data, setData] = useState([] as ShortInfoWithEnvironment[]);
    const [loaded, setLoaded] = useState(false);
    const [canCreateApplication, setCanCreateApplication] = useState(false);
    const { setCurrentEnvironment } = useGlobalContext();

    // TODO handle when not 200!
    useEffect(() => {
        Promise.all([
            getApplications(),
        ]).then(values => {
            const response = values[0] as HttpResponseApplications;
            setCanCreateApplication(response.canCreateApplication);
            setData(response.applications);
            setLoaded(true);
        }).catch((error) => {
            console.log(error);
            enqueueSnackbar('Failed getting data from the server', { variant: 'error' });
        });
    }, []);

    if (!loaded) return null;

    const onEnvironmentChoose = (application) => {
        const { environment, id } = application;
        setCurrentEnvironment(environment);
        const href = `/microservices/application/${id}/${environment}/overview`;
        history.push(href);
    };

    const handleCreate = () => {
        if (!canCreateApplication) {
            enqueueSnackbar('Currently disabled, please reach out via freshdesk or teams.', { variant: 'error' });
            return;
        }

        const href = '/application/create';
        history.push(href);
    };

    return (
        <LoginWrapper>
            <Typography variant='h2' sx={styles}>
                Select Your Application & Environment
            </Typography>

            <CreateButton onCreate={handleCreate} />

            <ApplicationsList data={data} onChoose={onEnvironmentChoose} />

            <ActionButtons />

        </LoginWrapper>
    );
};
