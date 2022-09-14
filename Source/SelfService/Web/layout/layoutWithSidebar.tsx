// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { History, LocationState } from 'history';

import './layout.scss';
import { AlertBox } from '../components/alertBox';
import { HttpResponseApplication } from '../api/application';
import {
    BackupRounded,
    HexagonRounded,
    InsightsRounded,
    FindInPageRounded,
    TextSnippetRounded,
    PolylineRounded,
    SettingsRounded
} from '@mui/icons-material';
import { List, ListItemButton, ListItemButtonBaseProps, ListItemButtonProps, ListItemIcon, ListItemText, Paper, Theme } from '@mui/material';
import { ContainerRegistryRounded } from '../assets/icons';
import { DolittleLogoMedium } from '../assets/logos';


type Props = {
    navigation: React.ReactNode;
    children: React.ReactNode;
};

export type NavigationMenuItem = {
    href: string;
    name: string
    icon: JSX.Element;
    forceReload?: boolean;
};

export type NavigationListItemButtonProps = ListItemButtonBaseProps & {
    navigationMenuItem: NavigationMenuItem, history: History<LocationState>
};

export const LayoutWithSidebar: React.FunctionComponent<Props> = (props) => {
    const navigationPanel = props!.navigation;
    const children = props!.children;

    return (
        <>
            <div className='with-sidebar'>
                <div>
                    <Paper elevation={4} className='sidebar'>
                        <div className="logo">
                            <DolittleLogoMedium />
                        </div>
                        {navigationPanel}
                    </Paper>
                    <div className='not-sidebar'>
                        <AlertBox />
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export const getDefaultMenuWithItems = (
    history: History<LocationState>,
    mainNavigationItems: any[],
    secondaryNavigationItems: any[]
): React.ReactNode => {
    return (
        <>
            <List
                sx={{
                    padding: '0',
                    margin: '0'
                }}
            >
                {mainNavigationItems.map((navigationItem) => {
                    return (
                        <NavigationListItemButton
                            key={navigationItem.name}
                            navigationMenuItem={navigationItem}
                            history={history}
                        >
                            <ListItemIcon
                                sx={{
                                    marginRight: '1rem',
                                    minWidth: '0',
                                    color: (theme: Theme) => theme.palette.text.secondary
                                }}
                            >
                                {navigationItem.icon}
                            </ListItemIcon>
                            <ListItemText>
                                {navigationItem.name}
                            </ListItemText>
                        </NavigationListItemButton>
                    );
                })}
            </List>
            <List
                sx={{
                    padding: '0',
                    margin: '0',
                    position: 'fixed',
                    bottom: '0'
                }}
            >
                {secondaryNavigationItems.map((link) => {
                    return (
                        <NavigationListItemButton
                            key={link.name}
                            navigationMenuItem={link}
                            history={history}
                        >
                            <ListItemIcon
                                sx={{
                                    marginRight: '1rem',
                                    minWidth: '0',
                                    color: (theme: Theme) => theme.palette.text.secondary
                                }}
                            >
                                {link.icon}
                            </ListItemIcon>
                            <ListItemText>
                                {link.name}
                            </ListItemText>
                        </NavigationListItemButton>
                    );
                })}
            </List>
        </>
    );
};

export const NavigationListItemButton = ({ navigationMenuItem, history, ...props }: NavigationListItemButtonProps) => {
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
            onClick={(event) => {
                event.preventDefault();
                const href = navigationMenuItem.href;
                navigationMenuItem.forceReload ?
                    window.location.href = href
                    :
                    history.push(href);
            }}
            {...props}
        />);

};

export const getMenuWithApplication = (
    history: History<LocationState>,
    application: HttpResponseApplication,
    environment: string
): React.ReactNode => {
    const applicationId = application.id;

    const hasConnector = application.environments.find(
        (_environment) => _environment.connections.m3Connector
    );

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
        // {
        //     href: `/insights/application/${applicationId}/${environment}/overview`,
        //     name: 'Insights',
        //     icon: <InsightsRounded />
        // },
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
