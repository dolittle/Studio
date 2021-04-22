// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect } from 'react';
import { Breadcrumb, IBreadcrumbItem, IDividerAsProps } from '@fluentui/react/lib/Breadcrumb';


import { Route, useHistory, BrowserRouter } from 'react-router-dom';
import { WebhooksConfig } from './configuration/WebhooksConfiguration';
import { Editor as BusinessMomentEditor } from './moments/BusinessMomentEditor';
import { Editor as EntityEditor } from './moments/EntityEditor';

export const App = () => {
    let itemsWithHref: IBreadcrumbItem[] = [
        // Normally each breadcrumb would have a unique href, but to make the navigation less disruptive
        // in the example, it uses the breadcrumb page as the href for all the items
        { text: 'Webhooks', key: 'webhooks', href: '/webhooks' },
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
                    <h1>Would you like to play a game</h1>
                    <ul>
                        <li>
                            <a href="/webhooks">Webhooks</a>
                        </li>
                        <li>
                            <a href="/business-moments/editor">/business-moments/editor</a>
                        </li>
                        <li>
                            <a href="/entity/editor">/entity/editor</a>
                        </li>
                    </ul>
                </Route>

                <Route exact path="/webhooks">
                    <WebhooksConfig />
                </Route>
                <Route path="/business-moments/editor">
                    <BusinessMomentEditor />
                </Route>
                <Route path="/entity/editor">
                    <EntityEditor />
                </Route>
            </BrowserRouter>
        </>
    );
};
// 3:20
