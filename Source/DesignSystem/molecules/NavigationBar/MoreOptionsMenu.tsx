// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Menu } from '@mui/material';
import { DescriptionRounded, LogoutRounded, SupervisedUserCircleRounded } from '@mui/icons-material';

import { IconButton } from '@dolittle/design-system';

import { RouterLinkListItem } from './RouterLinkListItem';

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
                <RouterLinkListItem to='' linkText='Documentation' icon={<DescriptionRounded fontSize='small' />} />
                <RouterLinkListItem to='' linkText='Change Organization' icon={<SupervisedUserCircleRounded fontSize='small' />} />
                <RouterLinkListItem to='' linkText='Log out' icon={<LogoutRounded fontSize='small' />} />
            </Menu>
        </>
    );
};
