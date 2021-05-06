// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

export const QuickScreen: React.FunctionComponent = () => {
    return (
        <>
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
        </>
    );
};
