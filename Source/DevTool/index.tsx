// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';

import { List } from './microservices/List';

import '@shared/styles/theme';

import './index.scss';

export default function App() {
    return (
        <>
            <div className="main-content">
                <List></List>
            </div>
        </>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);