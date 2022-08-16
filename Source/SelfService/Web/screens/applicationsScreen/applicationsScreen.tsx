// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { ShortInfoWithEnvironment } from '../../api/api';
import { LoginWrapper } from '../../layout/loginWrapper';
import { useGlobalContext } from '../../stores/notifications';
import { HttpResponseApplications, getApplications } from '../../api/application';

import { Box, Button, Theme, Typography } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import { ActionButtons } from './actionButtons';

const styles = {
    title: {
        letterSpacing: '-0.5px',
        lineHeight: '26px'
    },
    listWrapper: {
        padding: '0',
        display: 'inline-block'
    },
    createBtnWrapper: {
        inlineSize: '100%',
    },
    button: {
        letterSpacing: '0.059rem',
        typography: 'body2',
        fontWeight: 500,
        color: (theme: Theme) => theme.palette.text.primary
    },
    environmentButtons: {
        display: 'block',
        inlineSize: '100%',
        minInlineSize: '155px',
        minBlockSize: '36px',
        marginBlockStart: '-4px',
        marginBlockEnd: '1rem',
        marginInline: 'auto',
    }
};

export const ApplicationsScreen: React.FC = () => {
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

    const { title, listWrapper, createBtnWrapper, button, environmentButtons } = styles;
    return (
        <LoginWrapper>
            <Typography variant='h2' my={2} mb={5} sx={title}>
                Select Your Application & Environment
            </Typography>

            <Box sx={createBtnWrapper}>
                <Button
                    variant='text'
                    startIcon={<AddCircle />}
                    sx={button}
                    onClick={handleCreate}>
                    Create new Application
                </Button>
            </Box>

            <ul style={listWrapper}>
                {data.map(application => {
                    return (
                        <Button
                            variant='contained'
                            sx={{ ...environmentButtons, ...button }}
                            key={application.environment}
                            onClick={() => onEnvironmentChoose(application)}
                        >
                            {application.name} - {application.environment}
                        </Button>
                    );
                })}
            </ul>

            <ActionButtons />

        </LoginWrapper>
    );
};
