// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Divider, List, Toolbar } from '@mui/material';

import { Icon } from '@dolittle/design-system';

import { CustomListItem, Drawer } from './StyledCompenents';

/**
 * The props for a {@link SideBar} component.
 */
export type SideBarProps = {
    /**
     * The main links that will be displayed in the side bar.
     * @default undefined
     */
    primaryLinks?: React.ReactNode;

    /**
     * The secondary links that will be displayed in the side bar.
     * @default undefined
     */
    secondaryLinks?: React.ReactNode;
};

/**
 * The side bar is the left bar that contains the main navigation links and the secondary links.
 * @param {SideBarProps} props - The {@link SideBarProps} that contains the properties for the side bar.
 * @returns A {@link SideBar} component.
 */
export const SideBar = ({ primaryLinks, secondaryLinks }: SideBarProps) => {
    const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);

    const styles = {
        'py': 0,
        '.MuiListItemButton-root': {
            minHeight: 48,
            justifyContent: isSideBarExpanded ? 'initial' : 'center',
            px: 2.5,
        },
        '.MuiListItemIcon-root': {
            minWidth: 0,
            mr: isSideBarExpanded ? 3 : 'auto',
            justifyContent: 'center',
        },
        '.MuiListItemText-root': {
            opacity: isSideBarExpanded ? 1 : 0,
        },
    };

    return (
        <Drawer variant='permanent' open={isSideBarExpanded}>
            <Toolbar />

            <List sx={styles}>
                <CustomListItem
                    icon={<Icon icon={isSideBarExpanded ? 'KeyboardDoubleArrowLeft' : 'KeyboardDoubleArrowRight'} />}
                    text={isSideBarExpanded ? 'Collapse' : 'Expand'}
                    onClick={() => setIsSideBarExpanded(!isSideBarExpanded)}
                />

                <Divider />
                {primaryLinks}

                <Divider />
                {secondaryLinks}
            </List>
        </Drawer>
    );
};
