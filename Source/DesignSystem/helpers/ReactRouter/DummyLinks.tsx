// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { RouterLinkListItem } from './ReactRouter';

import { Menu } from '@mui/material';

import { Button, IconButton, Icon } from '@dolittle/design-system';

// TODO: Create a Design System component for this.
export const MoreOptionsMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    return (
        <>
            <IconButton
                tooltipText='More options'
                icon='MoreVertRounded'
                edge='end'
                onClick={e => setAnchorEl(e.currentTarget)}
                aria-controls={open ? 'more-options' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
            />

            <Menu
                id='more-options'
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                onClick={() => setAnchorEl(null)}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MobileSecondaryLinks />
            </Menu>
        </>
    );
};

// TODO: Create a Design System component for this.
export const SelectionMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    return (
        <>
            <Button
                label='Selection menu'
                color='subtle'
                endWithIcon={open ? 'ArrowDropUpRounded' : 'ArrowDropDownRounded'}
                onClick={e => setAnchorEl(e.currentTarget)}
                aria-haspopup='true'
                aria-controls={open ? 'select-selected' : undefined}
                aria-expanded={open ? 'true' : undefined}
            />

            <Menu
                id='select-selected'
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                onClick={() => setAnchorEl(null)}
                MenuListProps={{ 'aria-labelledby': 'select-selected' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <RouterLinkListItem to='/selection-menu' text='Selection menu' icon={<Icon icon='CheckRounded' />} />
                <RouterLinkListItem to='/select-option' text='Select option' inset />
                <RouterLinkListItem to='/create-new' text='Create new' icon={<Icon icon='AddBoxRounded' />} />
            </Menu>
        </>
    );
};

export const MainLinks = () =>
    <>
        <RouterLinkListItem to='/main1' text='main1' variantButton />
        <RouterLinkListItem to='/main2' text='main2' variantButton />
        <RouterLinkListItem to='/main3' text='main3' selected variantButton />
    </>;

export const MobileSecondaryLinks = () =>
    <>
        <RouterLinkListItem to='secondary-link-1' text='Secondary link 1' icon={<Icon icon='DescriptionRounded' />} />
        <RouterLinkListItem to='secondary-link-2' text='Secondary link 2' icon={<Icon icon='SupervisedUserCircleRounded' />} />
        <RouterLinkListItem to='secondary-link-3' text='Secondary link 3' icon={<Icon icon='LogoutRounded' />} />
    </>;

export const SecondaryLinks = () =>
    <>
        <SelectionMenu />
        <MoreOptionsMenu />
    </>;

export const SideBarPrimaryLinks = () =>
    <>
        <RouterLinkListItem to='connections' text='ERP Connections' icon={<Icon icon='PolylineRounded' />} />
        <RouterLinkListItem to='sidebar-primary-link-2' text='Primary link 2' icon={<Icon icon='Bridge' />} />
    </>;

export const SideBarSecondaryLinks = () =>
    <>
        <RouterLinkListItem to='sidebar-secondary-link-1' text='Secondary link 1' icon={<Icon icon='HexagonRounded' />} />
        <RouterLinkListItem to='sidebar-secondary-link-2' text='Secondary link 2' icon={<Icon icon='BackupRounded' />} />
        <RouterLinkListItem to='sidebar-secondary-link-3' text='Secondary link 3' icon={<Icon icon='ContainerRegistry' />} />
        <RouterLinkListItem to='sidebar-secondary-link-4' text='Secondary link 4' icon={<Icon icon='TextSnippetRounded' />} />
    </>;
