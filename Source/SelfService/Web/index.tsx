// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';

import { Bootstrapper } from '@dolittle/vanir-react';
import { VersionInfo } from '@dolittle/vanir-web';

const version = require('../microservice.json') as VersionInfo;

import '@shared/styles/theme';
import './index.scss';
import { App } from './App';

ReactDOM.render(
    <Bootstrapper name="Businessmomentsadapters" prefix="/_/businessmomentsadapters" version={version}>
        <App />
    </Bootstrapper>,
    document.getElementById('root')
);


