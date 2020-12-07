// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React from 'react';
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
    return (
        <>
            <NavigationStructure
                applications={viewModel.allApplications}
                handleNavbarActionButtonClick={() =>
                    viewModel.setCreateApplicationDialogVisible(true)
                }
            />
            <ApplicationToolbarItems
                onCreateApplicationClicked={() =>
                    viewModel.setCreateApplicationDialogVisible(true)
                }
                onAssignMicroserviceClicked={() =>
                    viewModel.setAssignMicroserviceDialogVisible(true)
                }
            />
            <CreateApplication
                visible={viewModel.createApplicationDialogVisible}
                onCreated={() => viewModel.setCreateApplicationDialogVisible(false)}
                onCancelled={() => viewModel.setCreateApplicationDialogVisible(false)}
            />
            <AssignMicroservice
                forApplication={viewModel.selectedApplication}
                visible={viewModel.assignMicroserviceDialogVisible}
                onAssigned={() => viewModel.setAssignMicroserviceDialogVisible(false)}
                onCancelled={() => viewModel.setAssignMicroserviceDialogVisible(false)}
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
