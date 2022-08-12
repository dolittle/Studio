// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';
import { BgLogo, MainLogo } from '../theme/assets/logos/logos';
import Logo from '../theme/assets/logos/logo.svg';

const styles = {
    backgroundLogoContainer: {
        maxInlineSize: '793px',
        blockSize: '100vh'
    },
    mainContainer: {
        inlineSize: '100%',
        maxInlineSize: '496px',
        position: 'absolute',
        top: '20%',
        right: '20%',
        transform: 'translate(20%, 0%)',
        textAlign: 'center',
        padding: '20px'
    }
};

export type LoginWrapperProps = {
    children: React.ReactNode;
};

export const LoginWrapper: React.FC<LoginWrapperProps> = ({ children }: LoginWrapperProps) => {
    return (
        <>
            <Box sx={styles.backgroundLogoContainer}>
                <BgLogo />
            </Box>
            <Box sx={styles.mainContainer}>
                {children}
                <Logo my={18.5} />
            </Box>
        </>
    );
};
