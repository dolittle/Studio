// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import { App } from './App';
import { uriWithBasePathPrefix } from './store';

// Little hack to force redirect on localhost
// can be removed if we move away from basePath
if (['', '/'].includes(window.location.pathname)) {
    window.location.href = uriWithBasePathPrefix('/');
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <BrowserRouter basename={uriWithBasePathPrefix('')} >
        <QueryParamProvider adapter={ReactRouter6Adapter}>
            <App />
        </QueryParamProvider>
    </BrowserRouter>
);
