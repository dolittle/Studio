// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { ShortInfoWithEnvironment } from '../api/api';
import { AppView } from '../layout/appView';
import { useGlobalContext } from '../stores/notifications';
import { HttpResponseApplications, getApplications } from '../api/application';

import './applicationsScreen.scss';
import { themeDark } from '../theme/theme';
import { Box, Link, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { ButtonText } from '../theme/buttonText';
import { Button } from '../theme/button';

const styles = {
    '& button': {
        color: themeDark.palette.text.primary
    },
    /* TODO: Add functionality to logout button */
    /*     '& button:first-of-type': {
            marginInlineEnd: '66px'
        } */
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

    if (!loaded) {
        return null;
    }

    const onEnvironmentChoose = (application) => {
        setCurrentEnvironment(application.environment);
        const href = `/microservices/application/${application.id}/${application.environment}/overview`;
        history.push(href);
    };

    return (
        <>
            <AppView>
                <Typography variant='h2' my={2} mb={5} sx={{ letterSpacing: '-0.5px', lineHeight: '26px' }}>
                    Select Your Application & Environment
                </Typography>

                <ButtonText withIcon={true} onClick={() => {
                    if (!canCreateApplication) {
                        enqueueSnackbar('Currently disabled, please reach out via freshdesk or teams.', { variant: 'error' });
                        return;
                    }

                    const href = '/application/create';
                    history.push(href);

                }}>Create new Application</ButtonText>

                <ul className='application-select-wrapper'>
                    {data.map(application => {
                        return (
                            <Button key={application.environment} onClick={() => onEnvironmentChoose(application)}
                            >
                                {application.name} - {application.environment}
                            </Button>
                        );
                    })}
                </ul>

                <Box mt={12.5} sx={styles}>
                    <Link
                        href='/.auth/cookies/initiate'>
                        <ButtonText startIcon={<ArrowBack />}>Select new customer</ButtonText>
                    </Link>
                    {/* TODO: Add functionality to logout button */}
                    {/* <ButtonText>Log Out</ButtonText> */}
                </Box>
            </AppView>
        </>
    );
};
