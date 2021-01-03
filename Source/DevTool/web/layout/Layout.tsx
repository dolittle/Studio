// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Stack, FontIcon } from '@fluentui/react';

import { default as styles } from './Layout.module.scss';
import { Home } from '../Home';
import { Workspace } from '../workspaces/Workspace';
import { FeatureNavigation, Toolbar } from '../components';
import { Route } from 'react-router-dom';
import { LayoutViewModel } from './LayoutViewModel';
import { withViewModel } from '@dolittle/vanir-react';

export const Layout = withViewModel(LayoutViewModel, ({ viewModel }) => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Stack>
                <div className={styles.header}>
                    <h2><FontIcon iconName="WebAppBuilderSlot" />&nbsp;{viewModel.title}</h2>
                </div>
                <FeatureNavigation />
                <Toolbar />
            </Stack>
            <div className={styles.content}>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/workspace/:workspaceId">
                    <Workspace />
                </Route>
            </div>
        </div>
    );
});
