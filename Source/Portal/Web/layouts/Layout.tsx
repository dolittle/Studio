// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { TopLevelMenu } from './TopLevelMenu';
import { Spinner, SpinnerSize, StackItem, Stack } from '@fluentui/react';
import { Route, Switch, useLocation } from 'react-router-dom';

import './Layout.scss';
import { Navigation } from './Navigation';
import { Toolbar } from './Toolbar';
import { LayoutViewModel } from './LayoutViewModel';
import { CompositionRoute, withViewModel } from '@dolittle/vanir-react';
import { ActionBar } from './ActionBar';

export const Layout = withViewModel(LayoutViewModel, ({ viewModel }) => {
    const location = useLocation();
    const root = location.pathname === '/' || location.pathname === '';
    const [loadingSpinner, setLoadingSpinner] = useState(!root);

    const contentLoading = () => {
        setLoadingSpinner(true);
    };

    const contentLoaded = () => {
        setLoadingSpinner(false);
    };

    return (
        <>
            <TopLevelMenu />
            <div className="navigation">
                <Stack verticalAlign='space-between' style={{ minHeight: '100%' }}>
                    <StackItem styles={{ root: { overflow: 'auto' } }}>
                        <Navigation />
                    </StackItem>
                    <StackItem>
                        <ActionBar />
                    </StackItem>
                </Stack>
            </div>

            <div className="toolbar" style={{ visibility: viewModel.hasToolbarItems ? 'visible' : 'hidden' }}>
                <Toolbar />
            </div>

            <div className={'application ' + (viewModel.hasToolbarItems ? 'with-toolbar' : '')}>
                <div className="main">
                    <div className="content-scrollable">
                        <div className="content">
                            <div className="spinner">
                                <Spinner styles={{ root: { display: loadingSpinner ? undefined! : 'none' } }} size={SpinnerSize.large} label="Loading Content" />
                            </div>

                            <Switch>
                                <Route exact path="/">
                                    <h2>Welcome to Dolittle Studio</h2>
                                </Route>
                                <CompositionRoute path="/applications" load={contentLoading} loaded={contentLoaded}/>
                                <CompositionRoute path="/microservices" load={contentLoading} loaded={contentLoaded}/>
                                <CompositionRoute path="/events" load={contentLoading} loaded={contentLoaded}/>
                                <CompositionRoute path="/data" load={contentLoading} loaded={contentLoaded}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});
