// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Divider, Toolbar } from '@mui/material';

import { List, ListProps } from '@dolittle/design-system';

import { Drawer } from './StyledCompenents';

export const getSidebarItems = (sidebarItems: ListProps['listItems']) =>
    <List listItems={sidebarItems} dense withIcons sx={{ py: 2 }} />;

/**
 * The props for a {@link SideBar} component.
 */
export type SideBarProps = {
    /**
     * The links that will be displayed in the side bar.
     */
    sideBarNavigationItems: React.ReactNode;
};

/**
 * The side bar is the left bar that contains links.
 * @param {SideBarProps} props - The {@link SideBarProps}.
 * @returns A {@link SideBar} component.
 */
export const SideBar = ({ sideBarNavigationItems }: SideBarProps) => {
    const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('isSidebarExpanded') === 'true') {
            setIsSideBarExpanded(true);
        }
    }, []);

    const handleSidebarToggle = () => {
        setIsSideBarExpanded(!isSideBarExpanded);
        sessionStorage.setItem('isSidebarExpanded', (!isSideBarExpanded).toString());
    };

    const styles = {
        '& .MuiListItemText-root': {
            opacity: isSideBarExpanded ? 1 : 0,
        },
    };

    const expandButton: ListProps['listItems'] = [
        {
            label: isSideBarExpanded ? 'Collapse' : 'Expand',
            icon: isSideBarExpanded ? 'KeyboardDoubleArrowLeft' : 'KeyboardDoubleArrowRight',
            onClick: handleSidebarToggle,
            sx: { minHeight: 64 }
        },
    ];

    return (
        <Drawer variant='permanent' open={isSideBarExpanded}>
            <Toolbar />

            <List listItems={expandButton} withIcons sx={styles} />
            <Divider />
            {sideBarNavigationItems}
        </Drawer>
    );
};
