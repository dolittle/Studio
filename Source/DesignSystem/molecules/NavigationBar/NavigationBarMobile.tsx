// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Drawer, List, Toolbar } from '@mui/material';

import { RouterLinkListItem } from './RouterLinkListItem';

type NavigationBarMobileProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export const NavigationBarMobile = ({ isOpen, setIsOpen }: NavigationBarMobileProps) => {
    return (
        <Box component='nav'>
            <Drawer
                variant='temporary'
                open={isOpen}
                onClose={setIsOpen}
                ModalProps={{ keepMounted: true }}
                sx={{ display: { xs: 'block', md: 'none' } }}
            >
                <Toolbar />
                <List>
                    <RouterLinkListItem to='/' text='home' variantButton />
                    <RouterLinkListItem to='/' text='solutions' variantButton />
                    <RouterLinkListItem to='/' text='integrations' selected variantButton />
                </List>
            </Drawer>
        </Box>
    );
};
