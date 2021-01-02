// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { withViewModel } from '@dolittle/vanir-react';
import { AppViewModel } from './AppViewModel';
import { Services } from './Services';

import { List as WorkspaceList, Workspace } from './workspaces/index';
import { default as styles } from './App.module.scss';

import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';
import { Home } from './Home';
import { Layout } from './layout/Layout';

export const App = withViewModel(AppViewModel, ({ viewModel }) => {
    Services.initialize();

    return (
        <Router>
            <div className={styles.navigation}>
                <WorkspaceList />
            </div>
            <div className={styles.mainContent}>
                <Layout/>
            </div>
        </Router>
    );
});
