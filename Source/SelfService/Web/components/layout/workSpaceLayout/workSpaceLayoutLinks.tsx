// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Link as RouterLink, LinkProps as RouterLinkProps, useLocation } from 'react-router-dom';

import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { Icon, NavigationBarProps } from '@dolittle/design-system';

type RouterLinkListItemProps = {
    to: string;
    icon?: React.ReactElement;
    text?: string;
    inset?: boolean;
    variantButton?: boolean;
};

// TUTORIAL: https://mui.com/material-ui/guides/composition/
const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(itemProps, ref) {
    return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

export const RouterLinkListItem = ({ to, icon, text, inset, variantButton }: RouterLinkListItemProps) =>
    <ListItem disablePadding>
        <ListItemButton component={Link} to={to} selected={window.location.href.includes(to)} dense sx={{ whiteSpace: 'nowrap' }}>
            {icon ? <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon> : null}

            <ListItemText inset={inset} primary={text} primaryTypographyProps={{ variant: variantButton ? 'button' : 'body2' }} />
        </ListItemButton>
    </ListItem>;

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

export const primaryNavigationItems: NavigationBarProps['primaryNavigationItems'] = [
    {
        label: 'home',
        overrides: {
            component: Link,
            to: '/home',
        },
    },
    {
        label: 'applications',
        overrides: {
            component: Link,
            to: '/applications',
        },
    },
    {
        label: 'integrations',
        overrides: {
            component: Link,
            to: '/integrations',
        },
    },
];

export const secondaryNavigationItems: NavigationBarProps['secondaryNavigationItems'] = [
    {
        label: 'Documentation',
        icon: 'DescriptionRounded',
        overrides: {
            href: 'https://dolittle.io/docs/',
            target: '_blank',
        },
    },
    {
        label: 'Change Organization',
        icon: 'SupervisedUserCircleRounded',
        overrides: {
            href: '/.auth/cookies/initiate',
        },
    },
    {
        label: 'Log out',
        icon: 'LogoutRounded',
        overrides: {
            href: '/.auth/cookies/logout',
        },
    },
];

export const selectionMenuItems: NavigationBarProps['selectionMenuItems'] = [
    {
        label: 'Default space',
        icon: 'CheckRounded',
    },
    {
        label: 'Space 2',
    },
    {
        label: 'Create New Space',
        icon: 'AddBoxRounded',
        overrides: {
            component: Link,
            to: '/application/create',
        },
    },
];
