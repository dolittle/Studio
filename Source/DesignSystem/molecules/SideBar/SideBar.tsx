// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Divider, List, Toolbar } from '@mui/material';

import { Icon } from '@dolittle/design-system';

import { CustomListItem, Drawer } from './StyledCompenents';

type SideBarProps = {
    primaryLinks?: React.ReactNode;
    secondaryLinks?: React.ReactNode;
};

export const SideBar = ({ primaryLinks, secondaryLinks }: SideBarProps) => {
    const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);

    return (
        <Drawer variant='permanent' open={isSideBarExpanded}>
            <Toolbar />

            <List sx={{ py: 0 }}>
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
