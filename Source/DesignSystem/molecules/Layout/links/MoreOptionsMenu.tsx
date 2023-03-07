// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Menu } from '@mui/material';

import { IconButton, Icon, RouterLinkListItem } from '@dolittle/design-system';

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
                <RouterLinkListItem to='' text='Documentation' icon={<Icon icon='DescriptionRounded' />} />
                <RouterLinkListItem to='' text='Change Organization' icon={<Icon icon='SupervisedUserCircleRounded' />} />
                <RouterLinkListItem to='' text='Log out' icon={<Icon icon='LogoutRounded' />} />
            </Menu>
        </>
    );
};
