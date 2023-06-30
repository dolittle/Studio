// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';

import { Link as RouterLink, LinkProps as RouterLinkProps, useNavigate } from 'react-router-dom';

import { useSnackbar } from 'notistack';
import { useGlobalContext } from '../../../context/globalContext';

import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { getPrimaryNavigationItems, getSelectionMenuItems, getSecondaryNavigationItems, Icon, MenuItemProps } from '@dolittle/design-system';

import { getApplications, HttpResponseApplications } from '../../../apis/solutions/application';
import { ShortInfoWithEnvironment } from '../../../apis/solutions/api';

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

export const SpaceSelectionMenu = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { currentApplicationId, setCurrentApplicationId } = useGlobalContext();

    const [applicationInfos, setApplicationInfos] = useState([] as ShortInfoWithEnvironment[]);
    const [canCreateApplication, setCanCreateApplication] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const currentApplication = applicationInfos.find(application => application.id === currentApplicationId) || applicationInfos[0];

    useEffect(() => {
        Promise.all([getApplications()])
            .then(values => {
                const response = values[0] as HttpResponseApplications;

                setCanCreateApplication(response.canCreateApplication);
                setApplicationInfos(response.applications);
                setIsLoading(false);
            }).catch(() => enqueueSnackbar('Failed getting data from the server.', { variant: 'error' }));
    }, []);

    if (isLoading) return null;

    const applicationMenuItems = () => {
        const menuItems: MenuItemProps[] = applicationInfos.map(application => {
            return {
                id: application.id,
                label: application.name,
                onMenuItemSelect: (menuItem: MenuItemProps) => handleApplicationChange(menuItem),
            };
        });

        menuItems.push({
            id: 'create-new-application',
            label: 'Create New Space',
            icon: 'AddBoxRounded',
            onMenuItemSelect: () => handleApplicationCreate(),
        });

        return menuItems;
    };

    const handleApplicationChange = (menuItem: MenuItemProps) => {
        if (menuItem.id === currentApplicationId) {
            return;
        }

        setCurrentApplicationId(menuItem.id);
    };

    const handleApplicationCreate = () => {
        if (!canCreateApplication) {
            enqueueSnackbar('Currently disabled, please reach out via freshdesk or teams.', { variant: 'error' });
            return;
        }

        const href = '/application/create';
        navigate(href);
    };

    return getSelectionMenuItems(applicationMenuItems(), currentApplication?.name);
};
