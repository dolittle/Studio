// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import '@shared/styles/theme';
import './index.scss';
import { CreateApplication } from './CreateApplication';
import { AssignMicroservice } from './AssignMicroservice';
import { NavBar } from './NavBar';
import { withViewModel } from '@shared/mvvm';
import { AppViewModel } from './AppViewModel';
import { Bootstraper, VersionInfo } from '@shared/web';

import { Toolbar, ToolbarItem } from '@shared/components';

const version = require('../version.json') as VersionInfo;

const App = withViewModel(AppViewModel, ({ viewModel }) => {
    const [showCreateApplicationDialog, setShowCreateApplicationDialog] = useState(false);
    const [showAssignMicroserviceDialog, setShowAssignMicroserviceDialog] = useState(false);

    return (
        <>
            <NavBar
                handleNavbarActionButtonTriggered={() => setShowCreateApplicationDialog(true)}
            />
            <Toolbar>
                <ToolbarItem
                    title="Assign microservice"
                    icon="AppIconDefaultAdd"
                    onClick={() => setShowAssignMicroserviceDialog(true)} />
            </Toolbar>

            <CreateApplication
                visible={showCreateApplicationDialog}
                onCreated={() => setShowCreateApplicationDialog(false)}
                onCancelled={() => setShowCreateApplicationDialog(false)}
            />
            <AssignMicroservice
                forApplication={viewModel.selectedApplication}
                visible={showAssignMicroserviceDialog}
                onAssigned={() => setShowAssignMicroserviceDialog(false)}
                onCancelled={() => setShowAssignMicroserviceDialog(false)}
            />
        </>
    );
});

ReactDOM.render(
    <Bootstraper name="Applications" prefix="/_/applications" version={version}>
        <App />
    </Bootstraper>,
    document.getElementById('root')
);

