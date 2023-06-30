// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

import { useGlobalContext } from '../../../context/globalContext';

import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { getPrimaryNavigationItems, getSecondaryNavigationItems, Icon, MenuItemProps } from '@dolittle/design-system';

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

// TODO: Temporary.
export const RouterLinkListItem = ({ to, icon, text, inset, variantButton }: RouterLinkListItemProps) =>
    <ListItem disablePadding>
        <ListItemButton component={Link} to={to} selected={window.location.href.includes(to)} dense sx={{ whiteSpace: 'nowrap' }}>
            {icon ? <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon> : null}

            <ListItemText inset={inset} primary={text} primaryTypographyProps={{ variant: variantButton ? 'button' : 'body2' }} />
        </ListItemButton>
    </ListItem>;

// TODO: Temporary.
export const SideBarPrimaryLinks = () =>
    <>
        <RouterLinkListItem to='connections' text='ERP Connections' icon={<Icon icon='PolylineRounded' />} />
        <RouterLinkListItem to='#' text='Bridge Designer' icon={<Icon icon='Bridge' />} />
    </>;

// TODO: Temporary.
export const SideBarSecondaryLinks = () =>
    <>
        <RouterLinkListItem to='#' text='Microservices' icon={<Icon icon='HexagonRounded' />} />
        <RouterLinkListItem to='#' text='Backups' icon={<Icon icon='BackupRounded' />} />
        <RouterLinkListItem to='#' text='Container Registry' icon={<Icon icon='ContainerRegistry' />} />
        <RouterLinkListItem to='#' text='Logs' icon={<Icon icon='TextSnippetRounded' />} />
    </>;

export const PrimaryNavigation = () => {
    const { currentApplicationId } = useGlobalContext();

    const primaryNavigationItems = [
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
                to: `/microservices/application/${currentApplicationId}/Dev/overview`,
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

    return getPrimaryNavigationItems(primaryNavigationItems);
};

export const SecondaryNavigation = () => {
    const { hasOneCustomer, currentApplicationId } = useGlobalContext();

    const secondaryNavigationItems: MenuItemProps[] = [
        {
            id: 'documentation',
            label: 'Documentation',
            icon: 'DescriptionRounded',
            overrides: {
                component: Link,
                to: `/documentation/application/${currentApplicationId}/Dev/overview`,
            },
        },
        {
            id: 'log-out',
            label: 'Log out',
            icon: 'LogoutRounded',
            overrides: {
                component: 'a',
                href: '/.auth/cookies/logout',
            },
        },
    ];

    if (!hasOneCustomer) {
        // Put after documentation link if there is more than one customer.
        secondaryNavigationItems.splice(secondaryNavigationItems.length - 1, 0, {
            id: 'change-organization',
            label: 'Change Organization',
            icon: 'SupervisedUserCircleRounded',
            overrides: {
                component: 'a',
                href: '/.auth/cookies/initiate',
            },
        });
    }

    return getSecondaryNavigationItems(secondaryNavigationItems);
};
