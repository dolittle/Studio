// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import '@shared/styles/theme';
import './index.scss';
import { CreateApplication } from './CreateApplication';
import { AssignMicroservice } from './AssignMicroservice';
import { withViewModel } from '@shared/mvvm';
import { AppViewModel } from './AppViewModel';

import { ActionBar, Toolbar, ToolbarItem } from '@shared/components';

export const App = withViewModel(AppViewModel, ({ viewModel }) => {
    const [showCreateApplicationDialog, setShowCreateApplicationDialog] = useState(false);
    const [showAssignMicroserviceDialog, setShowAssignMicroserviceDialog] = useState(false);

    return (
        <>
            <Toolbar>
                <ToolbarItem
                    title="Assign microservice"
                    icon="AppIconDefaultAdd"
                    onClick={() => setShowAssignMicroserviceDialog(true)} />
            </Toolbar>

            <ActionBar
                title="New Application"
                icon="Add"
                onTriggered={() => setShowCreateApplicationDialog(true)}/>

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
