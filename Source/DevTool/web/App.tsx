// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { withViewModel } from '@dolittle/vanir-react';
import { AppViewModel } from './AppViewModel';
import { Services } from './Services';

import { List as WorkspaceList, Workspace } from './workspaces/index';
import { default as styles } from './App.module.scss';

import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { IconButton, FontIcon, Stack, StackItem } from '@fluentui/react';


export const App = withViewModel(AppViewModel, ({ viewModel }) => {
    Services.initialize();

    function openDocumentation(event: any) {
        const shell = window.require('electron').shell;
        event.preventDefault();
        shell.openExternal('https://dolittle.io');
    }

    return (
        <>
            <header className={styles.titlebar}>
                <div className={styles.dragRegion}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.5 38.5">
                            <path d="M13.71,13.16H8.08a1,1,0,0,0-.84.49L4.43,18.52a1,1,0,0,0,0,1l2.81,4.87a1,1,0,0,0,.84.49h5.63a1,1,0,0,0,.84-.49l2.81-4.87a1,1,0,0,0,0-1l-2.81-4.87A1,1,0,0,0,13.71,13.16Z" fill="#fff" />
                            <path d="M22.56.24a.46.46,0,0,0-.65-.17.58.58,0,0,0-.18.17L17.18,8.12a.83.83,0,0,0,0,.81l5.65,9.78a.59.59,0,0,1,0,.6l-5.71,9.88a.59.59,0,0,1-.52.31H5.31a.82.82,0,0,0-.7.4L.06,37.78a.48.48,0,0,0,.18.65.42.42,0,0,0,.24.07H20.9a2.17,2.17,0,0,0,1.87-1.09l10-17.32a2.14,2.14,0,0,0,0-2.16Z" fill="#fff" />
                        </svg>
                        <span className={styles.title}>
                            Dolittle Developer Central
                        </span>
                        <span className={styles.linkButtons}>
                            <a href="#" onClick={openDocumentation} title="Dolittle Documentation">
                                <FontIcon iconName="ReadingMode" />
                            </a>
                        </span>
                    </div>
                </div>
            </header>

            <Router>
                <div className={styles.navigation}>
                    <WorkspaceList />
                </div>
                <div className={styles.mainContent}>
                    <Layout />
                </div>
            </Router>
        </>
    );
});
