// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Container } from '@mui/material';
import { BgLogo } from '../theme/assets/logos/logos';

interface Props {
    children: React.ReactNode;
}

const layoutContainerStyles = {
    position: 'absolute',
    top: '20%',
    right: '20%',
    transform: 'translate(20%, 0%)',
    textAlign: 'center'
};

export const LayoutWithoutSidebar: React.FunctionComponent<Props> = (props: Props) => {
    const children = props!.children;

    return (
        <>
            <BgLogo />
            <Container maxWidth='sm' sx={layoutContainerStyles} disableGutters>
                {children}
            </Container>
        </>
    );
};
