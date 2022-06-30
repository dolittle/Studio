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
import { Box } from '@mui/material';
import { ContainerRegistryRounded } from '../assets/icons';
import { DolittleLogoMedium } from '../assets/logos';


type Props = {
    navigation: React.ReactNode;
    children: React.ReactNode;
};

export const LayoutWithSidebar: React.FunctionComponent<Props> = (props) => {
    const navigationPanel = props!.navigation;
    const children = props!.children;

    return (
        <>
            <div className='with-sidebar'>
                <div>
                    <div className='sidebar'>
                        <div className="logo">
                            <DolittleLogoMedium />
                        </div>
                        {navigationPanel}
                    </div>
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
            <ul>
                {topItems.map((link) => {
                    return (
                        <Box key={link.name}
                            onClick={(event) => {
                                event.preventDefault();
                                const href = link.href;
                                history.push(href);
                            }}
                            sx={{
                                display: 'flex',
                                whiteSpace: 'nowrap',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer'
                            }}
                        >
                            <Box
                                sx={{
                                    marginRight: '1rem'
                                }}
                            >
                                {link.icon}
                            </Box>
                            <Box>
                                {link.name}
                            </Box>
                        </Box>
                    );
                })}
            </ul>
            <ul className='sidebarBottomMenu'>
                {bottomItems.map((link) => {
                    return (
                        <Box key={link.name}
                            onClick={(event) => {
                                event.preventDefault();
                                const href = link.href;
                                history.push(href);
                            }}
                            sx={{
                                display: 'flex',
                                whiteSpace: 'nowrap',
                                padding: '0.5rem 1rem',
                                bottom:'0',
                                cursor: 'pointer'
                            }}
                        >
                            <Box
                                sx={{
                                    marginRight: '1rem'
                                }}
                            >
                                {link.icon}
                            </Box>
                            <Box>
                                {link.name}
                            </Box>
                        </Box>
                    );
                })}
            </ul>
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
