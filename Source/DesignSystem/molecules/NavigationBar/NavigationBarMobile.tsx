// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Drawer, List, Toolbar } from '@mui/material';

import { Icon } from '@dolittle/design-system';

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

                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2 }}>
                    <Icon icon='Dolittle' />
                </Box>
            </Drawer>
        </Box>
    );
};
