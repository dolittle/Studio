// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { container } from 'tsyringe';

import { Bindings as PortalBindings, Navigation, ToolbarItems, ToolbarItem } from '@shared/portal';
import { Bindings as MVVMBindings } from '@shared/mvvm';
import { Applications, Bindings as PlatformBindings } from '@shared/platform';

import '@shared/styles/theme';
import './index.scss';
import { Overview } from './Overview';
import { CreateApplication } from './CreateApplication';

export default function App() {
    const [showCreateApplicationDialog, setShowCreateApplicationDialog] = useState(false);

    MVVMBindings.initialize();
    PortalBindings.initialize();
    PlatformBindings.initialize();

    const navigation = container.resolve(Navigation);
    const toolbar = container.resolve(ToolbarItems);

    navigation.set([
        {
            name: 'Studio',
            items: [
                {
                    name: 'Applications',
                },
                {
                    name: 'Events',
                },
            ],
        },
        {
            name: 'Lunch App',
            items: [
                {
                    name: 'Default',
                },
            ],
        },
    ]);

    toolbar.setItems([
        new ToolbarItem('Create application', 'Add', () => setShowCreateApplicationDialog(true)),
    ]);

    return (
        <>
            <CreateApplication
                visible={showCreateApplicationDialog}
                onCreated={() => setShowCreateApplicationDialog(false)}
                onCancelled={() => setShowCreateApplicationDialog(false)}
            ></CreateApplication>
            <Overview />
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
