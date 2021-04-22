// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Route } from 'react-router-dom';
import { WebhooksConfig } from './configuration/WebhooksConfiguration';
import { Editor as BusinessMomentEditor } from './moments/BusinessMomentEditor';
import { Editor as EntityEditor } from './moments/EntityEditor';

export const App = () => {
    return (
        <div
            style={{
                backgroundColor: '#000'
            }}
        >
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
        </div>
    );
};
// 3:20
