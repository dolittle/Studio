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
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { ContainerRegistryRounded } from '../assets/icons';
import { DolittleLogoMedium } from '../assets/logos';
import { margin } from '@mui/system';


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
    topItems: any[],
    bottomItems: any[]
): React.ReactNode => {
    return (
        <>
            <List>
                {topItems.map((link) => {
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
                                    minWidth: '0'
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
            <List className='sidebarBottomMenu'>
                {bottomItems.map((link) => {
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
                                    minWidth: '0'
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
    const topItems = [
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

    const bottomItems = [
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
        topItems.splice(topItems.length - 1, 0, {
            href: `/m3connector/application/${applicationId}/${environment}/details`,
            name: 'M3 Connector',
            icon: <PolylineRounded />
        });
    }

    return getDefaultMenuWithItems(history, topItems, bottomItems);
};
