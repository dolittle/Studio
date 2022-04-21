// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { MenuItemProps } from '@material-ui/core';
import { Box } from '@mui/material';
import { BoxProps } from '@mui/system';

const StyledMenu = (props: MenuProps) => (
    <Menu
        sx={{
            '&.MuiMenu-root .MuiPaper-root': {
                border: '1px solid #d3d4d5'
            }
        }}
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
);

const StyledMenuItem = (props: MenuItemProps) => <MenuItem sx={{
    '&:focus': {
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: (theme) => theme.palette.common.white,
        }
    }
}} {...props} />;


const InlineBox = (props: BoxProps) => <Box sx={{ display: 'inline' }} {...props} />;

type Props = {
    child: any; //IconButton
};

export const AccountSettingsMenu: React.FunctionComponent<Props> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const child = props!.child;

    return (
        <InlineBox>
            <InlineBox onClick={handleClick}>
                {child}
            </InlineBox>

            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>
                    <ListItemText primary="Change Customer" onClick={() => {
                        const href = '/.auth/cookies/initiate';
                        window.location.href = href;
                        return;
                    }} />
                </StyledMenuItem>
            </StyledMenu>
        </InlineBox>
    );
};
