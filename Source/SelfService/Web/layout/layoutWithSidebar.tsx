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
import { List, ListItemButton, ListItemIcon, ListItemText, Paper, Theme } from '@mui/material';
import { ContainerRegistryRounded } from '../assets/icons';
import { DolittleLogoMedium } from '../assets/logos';


type Props = {
    navigation: React.ReactNode;
    children: React.ReactNode;
};

const handleMenuItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    link: string,
    history: History<LocationState>
) => {
    event.preventDefault();
    history.push(link);
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
                {mainNavigationItems.map((link) => {
                    return (
                        <ListItemButton
                            disableGutters
                            key={link.name}
                            selected={window.location.href.includes(link.href)}
                            onClick={(event) => {
                                handleMenuItemClick(event, link.href, history);
                            }}
                            sx={{
                                display: 'flex',
                                whiteSpace: 'nowrap',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                // negative margins here to let the list item
                                // highlight overflow the padding of the sidebar
                                margin: '0 -1rem'
                            }}
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
                        </ListItemButton>
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
                        <ListItemButton
                            disableGutters
                            key={link.name}
                            selected={window.location.href.includes(link.href)}
                            onClick={(event) => {
                                event.preventDefault();
                                const href = link.href;
                                history.push(href);
                            }}
                            sx={{
                                display: 'flex',
                                whiteSpace: 'nowrap',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                margin: '0 -1rem'
                            }}
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
                        </ListItemButton>
                    );
                })}
            </List>
        </>
    );
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
    const mainNavigationItems = [
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
            href: `/insights/application/${applicationId}/${environment}/overview`,
            name: 'Insights',
            icon: <InsightsRounded />
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

    const secondaryNavigationItems = [
        {
            href: `/documentation/application/${applicationId}/${environment}/overview`,
            name: 'Documentation',
            icon: <FindInPageRounded />
        },
        {
            href: '/.auth/cookies/initiate',
            name: 'Change Customer',
            icon: <SettingsRounded />
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
