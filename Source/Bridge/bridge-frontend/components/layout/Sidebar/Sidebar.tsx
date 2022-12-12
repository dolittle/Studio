// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Box, Drawer } from '@mui/material';
import { ReactNode } from 'react';
import { Logo } from './Logo';
import { DolittleLogoMedium } from './Logos';
import { SidebarContent } from './SidebarContent';
import { SidebarFooter } from './SidebarFooter';
import { SidebarHeader } from './SidebarHeader';


const drawerWidth = 200;

export type SidebarProps = {
    // navigationElements?: NavigationElement[];
    children?: React.ReactNode;
};

export const Sidebar = (props: SidebarProps) => {
    return (
        <Drawer
            sx={{
                'width': drawerWidth,
                'flexShrink': 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                'display': 'flex',
            }}
            variant='permanent'
            anchor='left'
        >
            <SidebarHeader>
                <Logo logo={<DolittleLogoMedium />} />
            </SidebarHeader>

            <SidebarContent>
                {props.children}
            </SidebarContent>

            <SidebarFooter>
            </SidebarFooter>
        </Drawer>
    );
};
