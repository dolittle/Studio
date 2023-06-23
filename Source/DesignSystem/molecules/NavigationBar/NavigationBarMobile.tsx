// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Divider, Drawer, Toolbar } from '@mui/material';

import { Button, Icon, MenuList, NavigationBarProps } from '@dolittle/design-system';

type NavigationBarMobileProps = {
    isOpen: boolean;
    onClose: () => void;
    logo?: NavigationBarProps['logo'];
    mainLinks?: NavigationBarProps['primaryNavigationItems'];
    secondaryLinks?: NavigationBarProps['secondaryNavigationItems'];
};

export const NavigationBarMobile = ({ isOpen, onClose, logo, mainLinks, secondaryLinks }: NavigationBarMobileProps) =>
    <Drawer
        variant='temporary'
        open={isOpen}
        onClose={onClose}
        onClick={onClose}
        ModalProps={{ keepMounted: true }}
    >
        <Toolbar sx={{ justifyContent: 'center' }}>
            {logo && <Icon icon={logo} />}
        </Toolbar>

        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {mainLinks?.map(navigationItem =>
                    <Button
                        key={navigationItem.label}
                        {...navigationItem}
                        sx={{ color: window.location.href.includes(navigationItem.label) ? 'primary.main' : 'text.primary' }}
                    />
                )}
                <Divider />
            </Box>

            {secondaryLinks &&
                <Box>
                    <Divider />
                    <MenuList menuListItem={secondaryLinks} />
                </Box>
            }
        </Box>
    </Drawer>;
