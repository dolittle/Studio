// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Divider, Drawer, List, Toolbar } from '@mui/material';

type NavigationBarResponsiveProps = {
    isOpen: boolean;
    onClose: () => void;
    responsiveMainLinks?: JSX.Element;
    responsiveSecondaryLinks?: JSX.Element;
};

export const NavigationBarResponsive = ({ isOpen, onClose, responsiveMainLinks, responsiveSecondaryLinks }: NavigationBarResponsiveProps) =>
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
                    {responsiveMainLinks}
                    <Divider />
                </Box>

                <Box>
                    <Divider />
                    {responsiveSecondaryLinks}
                </Box>
            </List>
        </Drawer>
    </Box>;
