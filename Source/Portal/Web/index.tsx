// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';

import { Bootstrapper } from '@dolittle/vanir-react';
import { VersionInfo } from '@dolittle/vanir-web';
import { App } from './App';

const version = require('../version.json') as VersionInfo;

import '@shared/styles/theme';
import './index.scss';

ReactDOM.render(
    <Bootstrapper name="Portal" prefix="" version={version}>
        <App />
    </Bootstrapper>,
    document.getElementById('root')
);
