// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';

import { VersionInfo } from '@shared/web';

const version = require('../microservice.json') as VersionInfo;

import '@shared/styles/theme';
import './index.scss';
import { App } from './App';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
