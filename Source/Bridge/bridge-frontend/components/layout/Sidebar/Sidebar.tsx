// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Drawer } from '@mui/material';
import { Logo } from './Logo';
import { DolittleLogoMedium } from './logos';


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
            }}
            variant='permanent'
            anchor='left'
        >
            <Logo logo={<DolittleLogoMedium/>} />
            {props.children}
        </Drawer>
    );
};


