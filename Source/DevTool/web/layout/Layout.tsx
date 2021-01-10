// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Stack, StackItem } from '@fluentui/react';

import { default as styles } from './Layout.module.scss';
import { Home } from '../Home';
import { Workspace } from '../workspaces/Workspace';
import { FeatureNavigation, Toolbar } from '../components';
import { Route } from 'react-router-dom';
import { LayoutViewModel } from './LayoutViewModel';
import { withViewModel } from '@dolittle/vanir-react';
import { DolittleLogo } from '../components/DolittleLogo';

export const Layout = withViewModel(LayoutViewModel, ({ viewModel }) => {
    return (
        <Stack>
            <StackItem>
                <div className={styles.header}>

                    <div className="ms-fontSize-24">
                        <Stack horizontal>
                            <DolittleLogo size="1.5rem" />
                            <div>{viewModel.title}</div>
                        </Stack>
                    </div>
                </div>
                <FeatureNavigation />
                <Toolbar />
            </StackItem>
            <StackItem grow={1}>
                <div className={styles.content}>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/workspace/:workspaceId">
                        <Workspace />
                    </Route>
                </div>
            </StackItem>
        </Stack>
    );
});
