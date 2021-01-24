// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';

import '@shared/styles/theme';
import { App } from './App';
import { Bootstrapper } from '@dolittle/vanir-react';
import { VersionInfo } from '@dolittle/vanir-web';

const version = require('../microservice.json') as VersionInfo;

ReactDOM.render(
    <Bootstrapper name="Dolittle DevCentral" prefix="" version={version}>
        <App />
    </Bootstrapper>,
    document.getElementById('root')
);
