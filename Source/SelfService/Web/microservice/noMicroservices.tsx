// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import { RocketLaunch } from '@mui/icons-material';

const styles = {
    // Hack for keeping content responsive - temporarily.
    responsiveContainer: {
        minInlineSize: '400px',
        minBlockSize: '600px',
        position: 'relative'
    },
    wrapper: {
        textAlign: 'center',
        lineHeight: '20px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-30%, -50%)'
    },
    buttonWrapper: {
        position: 'relative',
        inlineSize: '413px',
        blockSize: '174px',
        marginInline: 'auto'
    },
    deployButton: {
        'paddingInline': '100px',
        'paddingBlock': '75px',
        'background': 'rgba(140, 154, 248, 0.08)',
        ':hover': {
            background: 'rgba(255, 255, 255, 0.12)'
        }
    },
    dashedBorder: {
        'inlineSize': '100%',
        'blockSize': '100%',
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
        },
    }
};

type NoMicroservicesProps = {
    onCreate: () => void;
};

export const NoMicroservices: React.FC<NoMicroservicesProps> = ({ onCreate }: NoMicroservicesProps) => {
    const { dashedBorder, deployButton, wrapper, buttonWrapper, responsiveContainer } = styles;

    return (
        <Box sx={responsiveContainer}>
            <Box maxWidth={540} sx={wrapper}>
                <Typography variant='h2' sx={{ lineHeight: '26px' }}>No microservices deployed yet...</Typography>

                <Box sx={buttonWrapper} mt={6.75} mb={5.75}>
                    <Box sx={dashedBorder}></Box>
                    <Button
                        startIcon={<RocketLaunch />}
                        sx={deployButton}
                        onClick={onCreate}
                    >
                        Deploy NEW microservice
                    </Button>
                </Box>

                <Typography variant='body1' mb={2}>
                    After you deploy your first microservice it will appear here.
                </Typography>

                <Typography variant='body1'>
                    To deploy a new mircoservice click on the ‘deploy new microservice’ button or ‘deploy new’ tab at the top.
                </Typography>
            </Box>
        </Box>
    );
};
