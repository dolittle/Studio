// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect } from 'react';
import { Breadcrumb, IBreadcrumbItem, IDividerAsProps } from '@fluentui/react/lib/Breadcrumb';

import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { Route, BrowserRouter } from 'react-router-dom';
import { WebhooksConfig } from './configuration/WebhooksConfiguration';
import { Editor as BusinessMomentEditor } from './moments/BusinessMomentEditor';
import { Editor as EntityEditor } from './moments/EntityEditor';
import { Create as Microservice } from './micoservice/Microservice';
import { ApplicationScreen } from './screens/applicationScreen';
import { ApplicationsScreen } from './screens/applicationsScreen';
import { QuickScreen } from './screens/quickScreen';
import { getFakeMicroserviceBusinessMomentsAdaptor } from './store';
import { LoginScreen } from './screens/loginScreen';


export const App = () => {
    let itemsWithHref: IBreadcrumbItem[] = [
        // Normally each breadcrumb would have a unique href, but to make the navigation less disruptive
        // in the example, it uses the breadcrumb page as the href for all the items
        { text: 'Start', key: 'Start', href: '/' },
        { text: 'Business Moments Editor', key: '/business-moments/editor', href: '/business-moments/editor' },
        { text: 'Entity Editor', key: '/entity/editor', href: '/entity/editor' },

    ];
    const location = window.location;
    itemsWithHref = itemsWithHref.map(item => {
        if (item.href !== location.pathname) {
            return item;
        }
        item.isCurrentItem = true;
        return item;
    });

    // Little hack to force redirect
    if (['', '/'].includes(window.location.pathname)) {
        window.location.href = '/applications';
        return (<></>);
    }

    const _items: ICommandBarItemProps[] = [
        {
            key: 'showRoot',
            text: 'Root',
            iconProps: { iconName: 'Thunderstorms' },
            onClick: () => {
                window.location.href = '/';
            },
        },
        {
            key: 'showBusinessMomentsEditor',
            text: 'Business Moments Editor',
            iconProps: { iconName: 'Thunderstorms' },
            onClick: () => {
                window.location.href = '/business-moments/editor';
            },
        },
        {
            key: 'showEntityEditor',
            text: 'Entity Editor',
            iconProps: { iconName: 'Thunderstorms' },
            onClick: () => {
                window.location.href = '/entity/editor';
            },
        },
        {
            key: 'showQuick',
            text: 'Quick Links',
            iconProps: { iconName: 'Thunderstorms' },
            onClick: () => {
                window.location.href = '/quick';
            },
        },
    ];

    return (
        <>
            <BrowserRouter>
                <CommandBar items={_items} />

                <Route exact path="/login">
                    <LoginScreen />
                </Route>

                <Route exact path="/quick">
                    <QuickScreen />
                </Route>

                <Route exact path="/connectors">
                    <h1>TODO: List connectors</h1>
                </Route>

                <Route exact path="/microservice/create">
                    <Microservice />
                </Route>

                <Route exact path="/connector/edit/:connectorId">
                    <WebhooksConfig domain="freshteapot-taco.dolittle.cloud" action='upsert' ms={getFakeMicroserviceBusinessMomentsAdaptor()} />
                </Route>
                <Route path="/business-moments/editor">
                    <BusinessMomentEditor />
                </Route>
                <Route path="/entity/editor">
                    <EntityEditor />
                </Route>

                <Route exact path="/applications">
                    <ApplicationsScreen />
                </Route>

                <Route path="/application/:applicationId">
                    <ApplicationScreen />
                </Route>

            </BrowserRouter>
        </>
    );
};
// 3:20
