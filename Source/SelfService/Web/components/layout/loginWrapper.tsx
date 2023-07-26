// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';

import { Icon } from '@dolittle/design-system';

import Symbol from '../../assets/logos/symbol.svg?url';

const styles = {
    backgroundSymbol: {
        textAlign: 'right',
        minHeight: '100vh',
        backgroundImage: `url(${Symbol})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 142vh',
        backgroundPosition: '-60vh -25vh'
    },
    mainContent: {
        'textAlign': 'center',
        'width': '100vw',
        'maxWidth': '33.8125rem',
        'ml': 'auto',
        '@media (min-width: 33.8125rem)': {
            mr: 'calc((100vw - 33.8125rem)*0.233)'
        },
        'p': '1.25rem',
        'pt': '12.5rem'
    },
};

export type LoginWrapperProps = {
    children: React.ReactNode;
};

export const LoginWrapper = ({ children }: LoginWrapperProps) =>
    <Box sx={styles.backgroundSymbol}>
        <Box sx={styles.mainContent}>
            {children}

            <Box sx={{ mt: 18 }}>
                <Icon icon='AigonixLightLogo' />
            </Box>
        </Box>
    </Box>;
