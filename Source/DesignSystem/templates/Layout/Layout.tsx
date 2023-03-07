// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Toolbar } from '@mui/material';

import { NavigationBar, SideBar } from '@dolittle/design-system';

import { MainLinks, MoreOptions, SelectionMenu, SecondaryLinks, SideBarPrimaryLinks, SideBarSecondaryLinks } from '../../helpers/dummyContent';

type WorkSpaceLayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: WorkSpaceLayoutProps) =>
    <Box sx={{ display: 'flex' }}>
        <NavigationBar
            mainLinks={<MainLinks />}
            moreOptions={<MoreOptions />}
            mobileDropdownMenu={<SelectionMenu />}
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
