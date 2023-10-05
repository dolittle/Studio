// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';

import { Icon } from '@dolittle/design-system';

import Symbol from '../assets/logos/symbol.svg?url';

const styles = {
    backgroundSymbol: {
        minHeight: '100vh',
        backgroundImage: `url(${Symbol})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 100vh',
    },
    mainContent: {
        'width': '100vw',
        'maxWidth': '33.8125rem',
        'p': 3,
        'pt': 25,
        'ml': 'auto',
        'textAlign': 'center',
        '@media (min-width: 33.8125rem)': {
            mr: 'calc((100vw - 33.8125rem)*0.233)',
        },
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
                <Icon icon='AigonixLightLogo' sx={{ width: 166, height: 28 }} />
            </Box>
        </Box>
    </Box>;
