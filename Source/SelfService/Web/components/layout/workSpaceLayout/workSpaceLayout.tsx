// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Toolbar } from '@mui/material';

import { NavigationBar, SideBar } from '@dolittle/design-system';

import { MainLinks, SecondaryLinks, SpaceSelectionMenu, MoreOptions, SideBarPrimaryLinks, SideBarSecondaryLinks } from './linksHelper';

const styles = {
    layout: {
        height: 1,
        display: 'flex',
    },
    main: {
        'display': 'flex',
        'flexDirection': 'column',
        'flexGrow': 1,
        'm': 5,
        'mt': 8,
        '& .MuiToolbar-root': { p: 0 },
    },
};

type WorkSpaceLayoutProps = {
    children: React.ReactNode;
};

export const WorkSpaceLayout = ({ children }: WorkSpaceLayoutProps) =>
    <Box sx={styles.layout}>
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

        <Box component='main' sx={styles.main}>
            <Toolbar />
            {children}
        </Box>
    </Box>;
