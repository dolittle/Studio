// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './layouts/Layout';
import { AppHeader } from './layouts/AppHeader';
import { BrowserRouter as Router } from 'react-router-dom';

import { initializeFrontend, VersionInfo } from '@shared/web';

const versionInfo = require('../version.json') as VersionInfo;

import '@shared/styles/theme';
import './index.scss';

export default function App() {
    initializeFrontend({
        name: 'Portal',
        prefix: '',
        versionInfo
    });

    return (
        <Router>
            <AppHeader />
            <Layout />
        </Router>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);