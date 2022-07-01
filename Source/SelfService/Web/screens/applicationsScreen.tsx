// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, {
    useState,
    useEffect
} from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import {
    ShortInfoWithEnvironment
} from '../api/api';

import { LayoutWithoutSidebar } from '../layout/layoutWithoutSidebar';
import { useGlobalContext } from '../stores/notifications';
import { HttpResponseApplications, getApplications } from '../api/application';

import { Box, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import './applicationsScreen.scss';
import { ButtonText } from '../theme/buttonText';
import { Button } from '../theme/button';
import { MainLogo } from '../theme/assets/logos/logos';

const styles = {
    'marginBlockStart': '98px',
    'marginBlockEnd': '148px',
    '& button:first-child': {
        marginInlineEnd: '66px'
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
            <LayoutWithoutSidebar>

                <Typography variant='h2' my={2} sx={{ letterSpacing: '-0.5px', lineHeight: '26px', mb: '28px' }}>
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

                <Box sx={styles}>
                    {/* TODO: Add links */}
                    <ButtonText sx={{ color: '#FFFFFF' }} startIcon={<ArrowBack />}>Back to tenant</ButtonText>
                    <ButtonText sx={{ color: '#FFFFFF' }}>Log Out</ButtonText>
                </Box>

                {/* TODO: Add a link to the main page? */}
                <MainLogo />

            </LayoutWithoutSidebar>
        </>
    );
};
