// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Divider, List, Toolbar } from '@mui/material';

import { Icon } from '@dolittle/design-system';

import { RouterLinkListItem } from '../RouterLinkListItem';
import { CustomListItem, Drawer } from './StyledCompenents';

export const SideBar = () => {
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

                <RouterLinkListItem to='' text='ERP Connections' icon={<Icon icon='PolylineRounded' />} />
                <RouterLinkListItem to='' text='Bridge Designer' icon={<Icon icon='Bridge' />} />

                <Divider />

                <RouterLinkListItem to='' text='Microservices' icon={<Icon icon='HexagonRounded' />} />
                <RouterLinkListItem to='' text='Backups' icon={<Icon icon='BackupRounded' />} />
                <RouterLinkListItem to='' text='Container Registry' icon={<Icon icon='ContainerRegistry' />} />
                <RouterLinkListItem to='' text='Logs' icon={<Icon icon='TextSnippetRounded' />} />
            </List>
        </Drawer>
    );
};
