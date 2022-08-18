// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';
import Symbol from '../theme/assets/logos/symbol.svg?url';
import Logo from '../theme/assets/logos/logo.svg';

const styles = {
    backgroundSymbol: {
        textAlign: 'right',
        minHeight: '100vh',
        backgroundImage: `url(${Symbol})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 100vh',
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
    logo: {
        width: 166,
        height: 39,
        mt: 18.5
    }
};

export type LoginWrapperProps = {
    children: React.ReactNode;
};

export const LoginWrapper = ({ children }: LoginWrapperProps) => (
    <Box sx={styles.backgroundSymbol}>
        <Box sx={styles.mainContent}>
            {children}
            <Logo sx={styles.logo} />
        </Box>
    </Box>
);
