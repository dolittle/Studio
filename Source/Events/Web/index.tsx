// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';
import { Bindings as MVVMBindings } from '@shared/mvvm';
import { Bindings as PortalBindings } from '@shared/portal';
import { Bindings as PlatformBindings } from '@shared/platform';

import '@shared/styles/theme';
import './index.scss';

export default function App() {
    MVVMBindings.initialize();
    PortalBindings.initialize();
    PlatformBindings.initialize();

    return (
        <>
        </>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);