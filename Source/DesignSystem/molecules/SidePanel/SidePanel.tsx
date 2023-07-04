// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Divider, Toolbar } from '@mui/material';

import { List, ListProps } from '@dolittle/design-system';

import { Drawer } from './StyledCompenents';

export const getSidePanelItems = (sidePanelItems: ListProps['listItems']) =>
    <List listItems={sidePanelItems} dense withIcons />;

/**
 * The props for a {@link SidePanel} component.
 */
export type SidePanelProps = {
    /**
     * The links that will be displayed in the side panel.
     */
    sidePanelNavigationItems: React.ReactNode;
};

/**
 * The side panel component is the main component that contains the side menu items.
 * @param {SidePanelProps} props - The {@link SidePanelProps}.
 * @returns A {@link SidePanel} component.
 */
export const SidePanel = ({ sidePanelNavigationItems }: SidePanelProps) => {
    const [isSidePanelExpanded, setIsSidePanelExpanded] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('isSidePanelExpanded') === 'true') {
            setIsSidePanelExpanded(true);
        }
    }, []);

    const handleSidePanelToggle = () => {
        setIsSidePanelExpanded(!isSidePanelExpanded);
        sessionStorage.setItem('isSidePanelExpanded', (!isSidePanelExpanded).toString());
    };

    const styles = {
        '& .MuiListItemText-root': {
            opacity: isSidePanelExpanded ? 1 : 0,
        },
    };

    const expandButton: ListProps['listItems'] = [
        {
            label: isSidePanelExpanded ? 'Collapse' : 'Expand',
            icon: isSidePanelExpanded ? 'KeyboardDoubleArrowLeft' : 'KeyboardDoubleArrowRight',
            onClick: handleSidePanelToggle,
            sx: { minHeight: 64 }
        },
    ];

    return (
        <Drawer variant='permanent' open={isSidePanelExpanded}>
            <Toolbar />

            <List listItems={expandButton} withIcons sx={styles} />
            <Divider />
            {sidePanelNavigationItems}
        </Drawer>
    );
};
