// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Grid, Paper, Typography } from '@mui/material';
import { RocketLaunch } from '@mui/icons-material';

import { Button } from '@dolittle/design-system';

const styles = {
    deployButtonWrapper: {
        position: 'relative',
        width: '413px',
        height: '174px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dashedBorder: {
        'width': 1,
        'height': 1,
        'position': 'absolute',
        'top': '-8px',
        'left': '-8px',
        'pointerEvents': 'none',
        'clipPath': 'inset(0 round 5px)',
        ':before': {
            content: '""',
            position: 'absolute',
            left: '-3px',
            top: '-3px',
            right: '-3px',
            bottom: '-3px',
            border: '4px dashed #504D4D',
            borderRadius: '10px',
            boxSizing: 'border-box'
        }
    }
};

type NoMicroservicesProps = {
    onCreate: () => void;
};

export const NoMicroservices = ({ onCreate }: NoMicroservicesProps) =>
    <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{ minHeight: '80vh' }}
    >
        <Typography variant='h2'>No microservices deployed yet...</Typography>

        <Box component={Paper} mt={6.75} mb={5.75} sx={styles.deployButtonWrapper}>
            <Box sx={styles.dashedBorder}></Box>
            <Button label='Deploy new microservice' isFullWidth startWithIcon={<RocketLaunch />} onClick={onCreate} sx={{ height: 1 }} />
        </Box>

        <Typography variant='body1' mb={2}>
            After you deploy your first microservice it will appear here.
        </Typography>

        <Typography variant='body1'>
            To deploy a new mircoservice click on the 'deploy new microservice' button or 'deploy new' tab at the top.
        </Typography>
    </Grid>;
