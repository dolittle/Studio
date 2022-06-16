// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import { VersionInfo } from '@shared/web';

const version = require('../microservice.json') as VersionInfo;

import './index.scss';
import { App } from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
            <App />
        </QueryParamProvider>
    </BrowserRouter>
);
