// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Grid, Box, Toolbar } from '@mui/material';

import { NavigationBar, SideBar } from '@dolittle/design-system';

import { MainLinks, SecondaryLinks, SpaceSelectionMenu, MoreOptions, SideBarPrimaryLinks, SideBarSecondaryLinks } from './linksHelper';

const styles = {
    main: {
        'display': 'flex',
        'flexDirection': 'column',
        'flexGrow': 1,
        'm': 4,
        'mt': 8,
        '& .MuiToolbar-root': { p: 0 },
    },
};

type WorkSpaceLayoutProps = {
    children: React.ReactNode;
};

export const WorkSpaceLayout = ({ children }: WorkSpaceLayoutProps) =>
    <Grid container>
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
    </Grid>;
