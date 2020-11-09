// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';
import { container } from 'tsyringe';

import { Bindings as PortalBindings, Navigation, ToolbarItems, ToolbarItem } from '@shared/portal';
import { Bindings as MVVMBindings } from '@shared/mvvm';
import { Bindings as PlatformBindings } from '@shared/platform';

import '@shared/styles/theme';
import './index.scss';

import { Sample } from './Sample';

export default function App() {
    MVVMBindings.initialize();
    PortalBindings.initialize();
    PlatformBindings.initialize();

    const navigation = container.resolve(Navigation);

    navigation.set([
        {
            name: 'Studio',
            items: [{
                name: 'Applications'
            }, {
                name: 'Events'
            }]
        },
        {
            name: 'Lunch App',
            items: [{
                name: 'Default'
            }]
        }
    ]);

    return (
        <>
            <Sample />
        </>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);