// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Menu } from '@mui/material';

import { Button, IconButton, Icon } from '@dolittle/design-system';

import { RouterLinkListItem } from './workSpaceLayoutLinks';

export const MainLinks = () =>
    <>
        <RouterLinkListItem to='#' text='home' variantButton />
        <RouterLinkListItem to='#' text='applications' variantButton />
        <RouterLinkListItem to='integrations' text='integrations' variantButton />
    </>;

export const MoreOptions = () =>
    <>
        <RouterLinkListItem to='#' text='Documentation' icon={<Icon icon='DescriptionRounded' />} />
        <RouterLinkListItem to='#' text='Change Organization' icon={<Icon icon='SupervisedUserCircleRounded' />} />
        <RouterLinkListItem to='#' text='Log out' icon={<Icon icon='LogoutRounded' />} />
    </>;

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
                <MoreOptions />
            </Menu>
        </>
    );
};

export const SpaceSelectionMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    return (
        <>
            <Button
                label='Default space'
                color='subtle'
                endWithIcon={open ? 'ArrowDropUpRounded' : 'ArrowDropDownRounded'}
                onClick={e => setAnchorEl(e.currentTarget)}
                aria-haspopup='true'
                aria-controls={open ? 'select-space' : undefined}
                aria-expanded={open ? 'true' : undefined}
            />

            <Menu
                id='select-space'
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                onClick={() => setAnchorEl(null)}
                MenuListProps={{ 'aria-labelledby': 'select-space' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <RouterLinkListItem to='#' text='Default space' icon={<Icon icon='CheckRounded' />} />
                <RouterLinkListItem to='#' text='Space 2' inset />
                <RouterLinkListItem to='#' text='Create New Space' icon={<Icon icon='AddBoxRounded' />} />
            </Menu>
        </>
    );
};

export const SecondaryLinks = () =>
    <>
        <SpaceSelectionMenu />
        <MoreOptionsMenu />
    </>;

export const SideBarPrimaryLinks = () =>
    <>
        <RouterLinkListItem to='connections' text='ERP Connections' icon={<Icon icon='PolylineRounded' />} />
        <RouterLinkListItem to='#' text='Bridge Designer' icon={<Icon icon='Bridge' />} />
    </>;

export const SideBarSecondaryLinks = () =>
    <>
        <RouterLinkListItem to='#' text='Microservices' icon={<Icon icon='HexagonRounded' />} />
        <RouterLinkListItem to='#' text='Backups' icon={<Icon icon='BackupRounded' />} />
        <RouterLinkListItem to='#' text='Container Registry' icon={<Icon icon='ContainerRegistry' />} />
        <RouterLinkListItem to='#' text='Logs' icon={<Icon icon='TextSnippetRounded' />} />
    </>;
