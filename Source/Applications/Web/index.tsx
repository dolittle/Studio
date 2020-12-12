// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { Bootstraper, VersionInfo } from '@shared/web';
import { App } from './App';

const version = require('../version.json') as VersionInfo;

ReactDOM.render(
    <Bootstraper name="Applications" prefix="/_/applications" version={version}>
        <App />
    </Bootstraper>,
    document.getElementById('root')
);

