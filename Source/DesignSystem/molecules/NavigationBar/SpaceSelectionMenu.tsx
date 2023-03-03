// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Menu } from '@mui/material';
import { ArrowDropDownRounded, ArrowDropUpRounded } from '@mui/icons-material';

import { Button, Icon } from '@dolittle/design-system';

import { RouterLinkListItem } from './RouterLinkListItem';

export const SpaceSelectionMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    return (
        <>
            <Button
                label='Default space'
                color='subtle'
                endWithIcon={open ? <ArrowDropUpRounded /> : <ArrowDropDownRounded />}
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
                <RouterLinkListItem to='/' linkText='Default space' icon={<Icon icon='CheckRounded' />} />
                <RouterLinkListItem to='/' linkText='Space 2' />
                <RouterLinkListItem to='/' linkText='Create New Space' icon={<Icon icon='AddBoxRounded' />} />
            </Menu>
        </>
    );
};
