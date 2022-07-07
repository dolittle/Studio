// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Container } from '@mui/material';
import { BgLogo, MainLogo } from '../theme/assets/logos/logos';

interface Props {
    children: React.ReactNode;
}

const styles = {
    backgroundLogoContainer: {
        maxInlineSize: '793px',
        blockSize: '100vh'
    },
    mainContainer: {
        width: '456px',
        position: 'absolute',
        top: '20%',
        right: '20%',
        transform: 'translate(20%, 0%)',
        textAlign: 'center',
    }
};

export const LayoutWithoutSidebar: React.FunctionComponent<Props> = (props: Props) => {
    const children = props!.children;

    return (
        <>
            <Box sx={styles.backgroundLogoContainer}>
                <BgLogo />
            </Box>
            <Container maxWidth='sm' sx={styles.mainContainer} disableGutters>
                {children}
                <MainLogo mt={18.5} mb={18.5} />
            </Container>
        </>
    );
};
