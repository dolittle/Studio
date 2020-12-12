// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';

import { Bootstraper, VersionInfo } from '@shared/web';

const version = require('../version.json') as VersionInfo;

import '@shared/styles/theme';
import './index.scss';

export default function App() {
    return (
        <>
        </>
    );
}

ReactDOM.render(
    <Bootstraper name="Events" prefix="/_/events" version={version}>
        <App />
    </Bootstraper>,
    document.getElementById('root')
);