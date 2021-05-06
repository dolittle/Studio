// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect } from 'react';
import { Breadcrumb, IBreadcrumbItem, IDividerAsProps } from '@fluentui/react/lib/Breadcrumb';


import { Route, useHistory, BrowserRouter } from 'react-router-dom';
import { WebhooksConfig } from './configuration/WebhooksConfiguration';
import { Editor as BusinessMomentEditor } from './moments/BusinessMomentEditor';
import { Editor as EntityEditor } from './moments/EntityEditor';
import { Create as Microservice } from './micoservice/Microservice';
import { ApplicationScreen } from './applicationScreen';
import { ApplicationsScreen } from './applicationsScreen';
import { MicroserviceNewScreen } from './microserviceNewScreen';

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

    return (
        <>
            <BrowserRouter>
                <Breadcrumb
                    items={itemsWithHref}
                />
                <Route exact path="/">
                    <div style={{ backgroundColor: '#c3c3c3' }}>
                        <h1>Would you like to play a game</h1>
                        <ul>
                            <li>
                                <a href="/applications">/applications</a>
                            </li>
                            <li>
                                <a href="/connectors">Connectors</a>
                            </li>
                            <li>
                                <a href="/microservice/create">Create Microservice</a>
                            </li>

                            <li>
                                <a href="/connector/edit/m3-webhook-1-basic">Edit Webhook connector (m3-webhook-1-basic)</a>
                            </li>
                            <li>
                                <a href="/connector/edit/m3-webhook-1-bearer">Edit Webhook connector (m3-webhook-1-bearer)</a>
                            </li>

                            <li>
                                <a href="/business-moments/editor">/business-moments/editor</a>
                            </li>
                            <li>
                                <a href="/entity/editor">/entity/editor</a>
                            </li>

                        </ul>
                    </div>
                </Route>

                <Route exact path="/connectors">
                    <h1>TODO: List connectors</h1>
                </Route>

                <Route exact path="/microservice/create">
                    <Microservice />
                </Route>

                <Route exact path="/connector/edit/:id">
                    <WebhooksConfig />
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
                <Route exact path="/application/:id">
                    <ApplicationScreen />
                </Route>
                <Route exact path="/application/:id/microservice/create">
                    <MicroserviceNewScreen />
                </Route>
            </BrowserRouter>
        </>
    );
};
// 3:20
