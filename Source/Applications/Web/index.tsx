// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import '@shared/styles/theme';
import './index.scss';
import { CreateApplication } from './CreateApplication';
import { AssignMicroservice } from './AssignMicroservice';
import { ApplicationToolbarItems } from './ApplicationToolbarItems';
import { NavigationStructure } from './NavigationStructure';
import { Bootstrapped } from './BootStrapped';
import { withViewModel } from '@shared/mvvm';
import { AppViewModel } from './AppViewModel';

const App = withViewModel(AppViewModel, ({ viewModel }) => {
    const [showCreateApplicationDialog, setShowCreateApplicationDialog] = useState(false);
    const [showAssignMicroserviceDialog, setShowAssignMicroserviceDialog] = useState(false);

    return (
        <>
            <NavigationStructure
                applications={viewModel.allApplications}
                handleNavbarActionButtonClick={() => setShowCreateApplicationDialog(true)}
            />
            <ApplicationToolbarItems
                onCreateApplicationClicked={() => setShowCreateApplicationDialog(true)}
                onAssignMicroserviceClicked={() => setShowAssignMicroserviceDialog(true)}
            />
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
    <Bootstrapped>
        <App />
    </Bootstrapped>,
    document.getElementById('root')
);
export default Bootstrapped;
