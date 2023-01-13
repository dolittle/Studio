// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactNode } from 'react';
import './layout.scss';
import { NavigateFunction } from 'react-router-dom';

import { HttpResponseApplication } from '../api/application';

import { BackupRounded, HexagonRounded, FindInPageRounded, TextSnippetRounded, PolylineRounded, SettingsRounded } from '@mui/icons-material';
import { List, ListItemButton, ListItemButtonBaseProps, ListItemIcon, ListItemText, Paper } from '@mui/material';

import { ContainerRegistryRounded } from '../assets/icons';
import { DolittleLogoMedium } from '../assets/logos';

import { AlertBox } from '../components/alertBox';

type LayoutWithSidebarProps = {
    navigation: ReactNode;
    children: ReactNode;
};

export type NavigationMenuItem = {
    href: string;
    name: string
    icon: JSX.Element;
    forceReload?: boolean;
};

export type NavigationListItemButtonProps = ListItemButtonBaseProps & {
    navigationMenuItem: NavigationMenuItem,
    navigate: NavigateFunction //TODO PAV: Does this still need to be passed in, or can it use a hook to resolve?
};

export const LayoutWithSidebar = ({ navigation, children }: LayoutWithSidebarProps) =>
    <div className='with-sidebar'>
        <div>
            <Paper elevation={4} className='sidebar'>
                <div className="logo"><DolittleLogoMedium /></div>
                {navigation}
            </Paper>
            <div className='not-sidebar'>
                <AlertBox />
                {children}
            </div>
        </div>
    </div>;

export const getDefaultMenuWithItems = (navigate: NavigateFunction, mainNavigationItems: any[], secondaryNavigationItems: any[]): ReactNode =>
    <>
        <List sx={{ p: 0, m: 0 }}>
            {mainNavigationItems.map(navigationItem => (
                <NavigationListItemButton
                    key={navigationItem.name}
                    navigationMenuItem={navigationItem}
                    navigate={navigate}
                >
                    <ListItemIcon sx={{ mr: '1rem', minWidth: 0, color: 'text.secondary' }}>
                        {navigationItem.icon}
                    </ListItemIcon>
                    <ListItemText>
                        {navigationItem.name}
                    </ListItemText>
                </NavigationListItemButton>
            ))}
        </List>
        <List sx={{ p: 0, m: 0, position: 'fixed', bottom: 0 }}>
            {secondaryNavigationItems.map(link => (
                <NavigationListItemButton key={link.name} navigationMenuItem={link} navigate={navigate}>
                    <ListItemIcon sx={{ mr: '1rem', minWidth: 0, color: 'text.secondary' }}>
                        {link.icon}
                    </ListItemIcon>
                    <ListItemText>
                        {link.name}
                    </ListItemText>
                </NavigationListItemButton>
            ))}
        </List>
    </>;

export const NavigationListItemButton = ({ navigationMenuItem, navigate, ...props }: NavigationListItemButtonProps) => {
    const defaultProps: ListItemButtonBaseProps = {
        disableGutters: true,
        selected: window.location.href.includes(navigationMenuItem.href),
        sx: {
            display: 'flex',
            whiteSpace: 'nowrap',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            margin: '0 -1rem'
        }
    };

    return (
        <ListItemButton
            {...defaultProps}
            onClick={event => {
                event.preventDefault();
                const href = navigationMenuItem.href;
                navigationMenuItem.forceReload ? window.location.href = href : navigate(href);
            }}
            {...props}
        />);
};

export const getMenuWithApplication = (history: NavigateFunction, application: HttpResponseApplication, environment: string): ReactNode => {
    const applicationId = application.id;

    const hasConnector = application.environments.find(_environment => _environment.connections.m3Connector);

    const mainNavigationItems: NavigationMenuItem[] = [
        {
            href: `/backups/application/${applicationId}/overview`,
            name: 'Backups',
            icon: <BackupRounded />
        },
        {
            href: `/microservices/application/${applicationId}/${environment}/overview`,
            name: 'Microservices',
            icon: <HexagonRounded />
        },
        {
            href: `/containerregistry/application/${applicationId}/${environment}/overview`,
            name: 'Container Registry',
            icon: <ContainerRegistryRounded />
        },
        {
            href: `/logs/application/${applicationId}/${environment}`,
            name: 'Logs',
            icon: <TextSnippetRounded />
        },
    ];

    const secondaryNavigationItems: NavigationMenuItem[] = [
        {
            href: `/documentation/application/${applicationId}/${environment}/overview`,
            name: 'Documentation',
            icon: <FindInPageRounded />
        },
        {
            href: '/.auth/cookies/initiate',
            name: 'Change Customer',
            icon: <SettingsRounded />,
            forceReload: true
        }
    ];

    if (hasConnector) {
        // Put before documentation link
        mainNavigationItems.splice(mainNavigationItems.length - 1, 0, {
            href: `/m3connector/application/${applicationId}/${environment}/details`,
            name: 'M3 Connector',
            icon: <PolylineRounded />
        });
    }

    return getDefaultMenuWithItems(history, mainNavigationItems, secondaryNavigationItems);
};
