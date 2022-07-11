// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { ShortInfoWithEnvironment } from '../api/api';
import { AppView } from '../layout/appView';
import { useGlobalContext } from '../stores/notifications';
import { HttpResponseApplications, getApplications } from '../api/application';

import { themeDark } from '../theme/theme';
import { Box, Button, Link, Typography } from '@mui/material';
import { AddCircle, ArrowBack } from '@mui/icons-material';

const styles = {
    title: {
        letterSpacing: '-0.5px',
        lineHeight: '26px'
    },
    button: {
        letterSpacing: '0.06em'
    },
    environmentButtons: {
        display: 'block',
        minWidth: '155px',
        minHeight: '36px',
        marginBlockStart: '-4px',
        marginBlockEnd: '16px',
        marginInline: 'auto',
    }
};

export const ApplicationsScreen: React.FunctionComponent = () => {
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
        setCurrentEnvironment(application.environment);
        const href = `/microservices/application/${application.id}/${application.environment}/overview`;
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
        <>
            <AppView>
                <Typography variant='h2' my={2} mb={5} sx={styles.title}>
                    Select Your Application & Environment
                </Typography>

                <Button
                    variant='text'
                    startIcon={<AddCircle />}
                    sx={styles.button}
                    onClick={handleCreate}>
                    Create new Application
                </Button>

                <ul style={{ padding: '0' }}>
                    {data.map(application => {
                        return (
                            <Button
                                variant='contained'
                                sx={{ ...styles.environmentButtons, ...styles.button }}
                                key={application.environment}
                                onClick={() => onEnvironmentChoose(application)}
                            >
                                {application.name} - {application.environment}
                            </Button>
                        );
                    })}
                </ul>

                <Box mt={12.5} sx={styles}>
                    <Link
                        href='/.auth/cookies/initiate'>
                        <Button
                            startIcon={<ArrowBack />}
                            sx={{ ...styles.button, color: themeDark.palette.text.primary }}
                        >Select new customer
                        </Button>
                    </Link>
                    {/* <Button sx={styles.button}>Log Out</Button> */}
                </Box>
            </AppView>
        </>
    );
};
