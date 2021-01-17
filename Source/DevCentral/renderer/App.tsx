// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { withViewModel } from '@dolittle/vanir-react';
import { AppViewModel } from './AppViewModel';
import { Services } from './Services';

import { List as WorkspaceList, Workspace } from './workspaces/index';
import { default as styles } from './App.module.scss';

import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Stack, StackItem } from '@fluentui/react';

export const App = withViewModel(AppViewModel, ({ viewModel }) => {
    Services.initialize();


    return (
        <>
            <Router>
                <Stack horizontal style={{height: '100%'}}>
                    <StackItem>
                        <div className={styles.navigation}>
                            <WorkspaceList />
                        </div>
                    </StackItem>
                    <StackItem grow={1}>
                        <div className={styles.mainContent}>
                            <Layout />
                        </div>
                    </StackItem>
                </Stack>
            </Router>
        </>
    );
});
