// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { TopLevelMenu } from 'layouts/TopLevelMenu';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';
import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router, Route, Switch, useLocation,
} from 'react-router-dom';

import { ContentFrame } from './ContentFrame';

import './Layout.scss';

export const Layout = () => {
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
            </div>
            <div className="main-content">
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
        </>
    );
};
