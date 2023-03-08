// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Divider, Drawer, List, Toolbar } from '@mui/material';

type NavigationBarMobileProps = {
    isOpen: boolean;
    onClose: () => void;
    mobileMainLinks?: JSX.Element;
    mobileSecondaryLinks?: JSX.Element;
};

export const NavigationBarMobile = ({ isOpen, onClose, mobileMainLinks, mobileSecondaryLinks }: NavigationBarMobileProps) =>
    <Box component='nav'>
        <Drawer
            variant='temporary'
            open={isOpen}
            onClose={onClose}
            onClick={onClose}
            ModalProps={{ keepMounted: true }}
            sx={{ display: { xs: 'block', md: 'none' } }}
        >
            <Toolbar />

            <List sx={{ height: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                    {mobileMainLinks}
                    <Divider />
                </Box>

                <Box>
                    <Divider />
                    {mobileSecondaryLinks}
                </Box>
            </List>
        </Drawer>
    </Box>;
