// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Toolbar } from '@mui/material';

import { NavigationBar, SideBar } from '@dolittle/design-system';

import { MainLinks, SecondaryMobileLinks } from './helpers';
import { SpaceSelectionMenu } from './links/SpaceSelectionMenu';
import { MoreOptionsMenu } from './links/MoreOptionsMenu';

type WorkSpaceLayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: WorkSpaceLayoutProps) =>
    <Box sx={{ display: 'flex' }}>
        <NavigationBar
            mainLinks={<MainLinks />}
            moreOptionsDropdown={
                <>
                    <SpaceSelectionMenu />
                    <MoreOptionsMenu />
                </>
            }
            mobileDropdownMenu={<SpaceSelectionMenu />}
            mobileSecondaryLinks={<SecondaryMobileLinks />}
        />

        <SideBar />

        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            {children}
        </Box>
    </Box>;
