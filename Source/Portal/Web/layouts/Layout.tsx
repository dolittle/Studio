// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { TopLevelMenu } from 'layouts/TopLevelMenu';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { ContentFrame } from './ContentFrame';

import './Layout.scss';
import { Navigation } from './Navigation';
import { Toolbar } from './Toolbar';
import { LayoutViewModel } from './LayoutViewModel';
import { withViewModel } from '@shared/mvvm';

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
                <Navigation />
            </div>

            <div className="toolbar" style={{ visibility: viewModel.hasToolbarItems ? 'visible' : 'hidden' }}>
                <Toolbar />
            </div>

            <div className={'main-content ' + (viewModel.hasToolbarItems ? 'with-toolbar' : '')}>
                <div className="content-scrollable">
                    <div className="content">
                        <div className="spinner">
                            <Spinner styles={{ root: { display: loadingSpinner ? undefined! : 'none' } }} size={SpinnerSize.large} label="Loading Content" />
                        </div>

                        <Switch>
                            <Route exact path="/">
                                <h2>Welcome to Dolittle Studio</h2>
                            </Route>
                            <Route path="/applications">
                                <ContentFrame src="/_/applications" load={contentLoading} loaded={contentLoaded} />
                            </Route>
                            <Route path="/events">
                                <ContentFrame src="/_/events" load={contentLoading} loaded={contentLoaded} />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </>
    );
});
