// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Toolbar } from '@mui/material';

import { NavigationBar, SideBar } from '@dolittle/design-system';

import { MainLinks, MoreOptionsDropdown, SpaceSelectionMenu, SecondaryLinks, SideBarPrimaryLinks, SideBarSecondaryLinks } from './linksHelper';

type WorkSpaceLayoutProps = {
    children: React.ReactNode;
};

export const WorkSpaceLayout = ({ children }: WorkSpaceLayoutProps) =>
    <Box sx={{ display: 'flex' }}>
        <NavigationBar
            mainLinks={<MainLinks />}
            moreOptions={<MoreOptionsDropdown />}
            mobileDropdownMenu={<SpaceSelectionMenu />}
            mobileSecondaryLinks={<SecondaryLinks />}
        />

        <SideBar
            primaryLinks={<SideBarPrimaryLinks />}
            secondaryLinks={<SideBarSecondaryLinks />}
        />

        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar sx={{ minHeight: 100 }} />

            {children}
        </Box>
    </Box>;
