// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, List, ListItem, Stack, Typography } from '@mui/material';

import { AigonFixingSvg, AigonIsLostSvg, Button, Icon } from '../../index';

const getPageVariant = (variant: string) => {
    const styles = { width: 1, minWidth: 200, maxWidth: 342, height: 'auto' };

    switch (variant) {
        case 'maintenance':
            return {
                vector: <AigonFixingSvg sx={styles} />,
                title: 'Aigon is currently improving this page.',
                subtitle: 'We apologize for the inconvenience.',
                description: 'Please give us a few hours to get it up and running again.',
            };
        case 'problem':
            return {
                vector: <AigonIsLostSvg sx={styles} />,
                title: 'Houston, we have a problem...',
                subtitle: `Looks like we're having issues with our server.`,
                description: `Don't worry, we're working on a fix.`,
            };
        case 'building':
            return {
                vector: <AigonFixingSvg sx={styles} />,
                title: 'Building application... This might take a few moments.',
                subtitle: 'What is happening?',
                description:
                    <>
                        <List sx={{ fontSize: 13 }}>
                            <ListItem>Setting up your application in the platform...</ListItem>
                            <ListItem>Setting up your backups...</ListItem>
                            <ListItem>Setting up your environments...</ListItem>
                            <ListItem>Setting up your welcome microservice...</ListItem>
                        </List>
                    </>,
            };
        default:
            return {
                vector: <AigonFixingSvg sx={styles} />,
                title: 'Aigon is currently improving this page.',
                subtitle: 'We apologize for the inconvenience.',
                description: 'Please give us a few hours to get it up and running again.',
            };
    }
};

export type ProblemPageProps = {
    variant: 'maintenance' | 'problem' | 'building';
};

export const ProblemPage = ({ variant }: ProblemPageProps) =>
    <Stack sx={{ height: 1, minHeight: '100vh', mt: 8, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        {getPageVariant(variant).vector}

        <Typography variant='h1' sx={{ mt: 8 }}>
            {getPageVariant(variant).title}
        </Typography>

        <Typography variant='subtitle1' sx={{ mt: 3 }}>
            {getPageVariant(variant).subtitle}
        </Typography>

        <Typography variant='subtitle1' sx={{ mb: 8 }}>
            {getPageVariant(variant).description}
        </Typography>

        <Typography variant='subtitle1' sx={{ mb: 8 }}>
            {`Here's a few things you can try in the meantime:`}
        </Typography>

        <Box>
            <Button label='Return home' startWithIcon='HomeRounded' href='/' sx={{ mr: 3 }} />
            <Button label='Send us an email' startWithIcon='EmailRounded' href='mailto:support@dolittle.com' />
        </Box>

        <Box sx={{ mt: 18, mb: 8, cursor: 'pointer' }} onClick={() => window.location.pathname = '/'}>
            <Icon icon='AigonixLightLogo' sx={{ width: 166, height: 28 }} />
        </Box>
    </Stack>;
