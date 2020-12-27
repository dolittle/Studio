// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';

import { List } from './microservices/List';
import { List as WorkspaceList } from './workspaces/List';

import { default as styles } from './index.module.scss';
import '@shared/styles/theme';

import { Services } from './Services';

export default function App() {
    Services.initialize();

    return (
        <>
            <div className={styles.navigation}>
                <WorkspaceList />
            </div>
            <div className={styles.mainContent}>
                <List />
            </div>
        </>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);