// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import { App } from './App';
import { uriWithAppPrefix } from './store';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <BrowserRouter basename={uriWithAppPrefix('')} >
        <QueryParamProvider adapter={ReactRouter6Adapter}>
            <App />
        </QueryParamProvider>
    </BrowserRouter>
);
