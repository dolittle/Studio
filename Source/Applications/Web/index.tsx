// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { container } from 'tsyringe';

import { Bindings as PortalBindings, Navigation, ToolbarItems, ToolbarItem } from '@shared/portal';
import { Bindings as MVVMBindings } from '@shared/mvvm';
import { Bindings as PlatformBindings } from '@shared/platform';

import '@shared/styles/theme';
import './index.scss';
import { Overview } from './Overview';
import { CreateApplication } from './CreateApplication';
import { Bindings } from './Bindings';
import { AssignMicroservice } from './AssignMicroservice';
import { ApplicationToolbarItems } from './ApplicationToolbarItems';
import { ApplicationModel } from './ApplicationModel';

export default function App(this: any) {
    const [showCreateApplicationDialog, setShowCreateApplicationDialog] = useState(false);
    const [showAssignMicroserviceDialog, setShowAssignMicroserviceDialog] = useState(false);
    const [selectedApplications, setSelectedApplications]
        = useState<ApplicationModel[]>([]);

    console.log('current application is ', selectedApplications);

    Bindings.initialize();
    MVVMBindings.initialize();
    PortalBindings.initialize();
    PlatformBindings.initialize();

    const navigation = container.resolve(Navigation);

    navigation.set([
        {
            name: 'Face-b',
            items: [
                {
                    name: 'Dev',
                },
                {
                    name: 'Test',
                },
                {
                    name: 'Prod',
                },
            ],
        },
        {
            name: 'Insta-g',
            items: [
                {
                    name: 'Default',
                },
            ],
        },
        {
            name: 'Wahats-up',
            items: [
                {
                    name: 'Dev',
                },
                {
                    name: 'Test',
                },
                {
                    name: 'Staging',
                },
                {
                    name: 'China',
                },
                {
                    name: 'Europe',
                },
            ],
        },
    ]);

    return (
        <>
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
                forApplication={selectedApplications[0]}
                visible={showAssignMicroserviceDialog}
                onAssigned={() => setShowAssignMicroserviceDialog(false)}
                onCancelled={() => setShowAssignMicroserviceDialog(false)}
            />
            <Overview onSelected={((i) => setSelectedApplications(i)).bind(this)} />
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
