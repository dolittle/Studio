// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Box, Divider, Drawer, Toolbar, List, ListItem } from '@mui/material';


const drawerWidth = 200;

export type NavigationElement = {
    text: string;
    navigateTo: string;
    icon?: React.ReactNode;
};

export type NavigationProps = {
    navigationElements?: NavigationElement[];
    children?: React.ReactNode;
};

export const Navigation = (props: NavigationProps) => {
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
            <Box
                sx={{
                    p: 2,
                    mb: 2
                }}
            >LOGO</Box>
            {props.children}
        </Drawer>
    );
};

