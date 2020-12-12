// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './layouts/Layout';
import { AppHeader } from './layouts/AppHeader';
import { BrowserRouter as Router } from 'react-router-dom';

import { Bootstraper, VersionInfo } from '@shared/web';

const version = require('../version.json') as VersionInfo;

import '@shared/styles/theme';
import './index.scss';

export default function App() {
    return (
        <Router>
            <AppHeader />
            <Layout />
        </Router>
    );
}

ReactDOM.render(
    <Bootstraper name="Portal" prefix="" version={version}>
        <App />
    </Bootstraper>,
    document.getElementById('root')
);