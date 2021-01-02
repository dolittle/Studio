// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';

import { List as WorkspaceList } from './workspaces/List';

import { default as styles } from './index.module.scss';
import '@shared/styles/theme';

import { Services } from './Services';
import { Application } from './applications/Application';
import { Microservice } from './microservices/Microservice';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './Home';


export default function App() {
    Services.initialize();

    return (
        <>
            <Router>
                <div className={styles.navigation}>
                    <WorkspaceList />
                </div>
                <div className={styles.mainContent}>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/application/:applicationId">
                        <Application />
                    </Route>
                    <Route path="/microservice/:microserviceId">
                        <Microservice />
                    </Route>
                </div>
            </Router>
        </>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
