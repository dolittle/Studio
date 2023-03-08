// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Toolbar } from '@mui/material';

import { NavigationBar, SideBar } from '@dolittle/design-system';

import { MainLinks, SecondaryLinks, SpaceSelectionMenu, MoreOptions, SideBarPrimaryLinks, SideBarSecondaryLinks } from './linksHelper';

type WorkSpaceLayoutProps = {
    children: React.ReactNode;
};

export const WorkSpaceLayout = ({ children }: WorkSpaceLayoutProps) =>
    <Box sx={{ display: 'flex' }}>
        <NavigationBar
            mainLinks={<MainLinks />}
            secondaryLinks={<SecondaryLinks />}
            mobileDropdownMenu={<SpaceSelectionMenu />}
            mobileSecondaryLinks={<MoreOptions />}
        />

        <SideBar
            primaryLinks={<SideBarPrimaryLinks />}
            secondaryLinks={<SideBarSecondaryLinks />}
        />

        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />

            {children}
        </Box>
    </Box>;
