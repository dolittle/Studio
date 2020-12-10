// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';

import { initializeFrontend, VersionInfo } from '@shared/web';

const versionInfo = require('../version.json') as VersionInfo;

import '@shared/styles/theme';
import './index.scss';

export default function App() {
    initializeFrontend({
        name: 'Events',
        prefix: '/_/events',
        versionInfo
    });

    return (
        <>
        </>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);