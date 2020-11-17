// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { container } from 'tsyringe';

import {
    Bindings as PortalBindings,
    Navigation,
    ToolbarItems,
    ToolbarItem,
} from '@shared/portal';
import { Bindings as MVVMBindings } from '@shared/mvvm';
import { Applications, Bindings as PlatformBindings } from '@shared/platform';
import {
    Dialog,
    PrimaryButton,
    DefaultButton,
    DialogFooter,
    TextField,
} from 'office-ui-fabric-react';

import '@shared/styles/theme';
import './index.scss';

import { Overview } from './Overview';

export default function App() {
    const [
        showCreateApplicationDialog,
        setShowCreateApplicationDialog,
    ] = useState(false);

    const [applicationName, setApplication] = useState('');

    MVVMBindings.initialize();
    PortalBindings.initialize();
    PlatformBindings.initialize();

    const navigation = container.resolve(Navigation);
    const toolbar = container.resolve(ToolbarItems);
    const applications = container.resolve(Applications);

    navigation.set([
        {
            name: 'Studio',
            items: [
                {
                    name: 'Applications',
                },
                {
                    name: 'Events',
                },
            ],
        },
        {
            name: 'Lunch App',
            items: [
                {
                    name: 'Default',
                },
            ],
        },
    ]);

    toolbar.setItems([
        new ToolbarItem('Create application', 'Add', () =>
            setShowCreateApplicationDialog(true)
        ),
    ]);

    return (
        <>
            <Dialog
                hidden={!showCreateApplicationDialog}
                title="Create Application"
                modalProps={{ topOffsetFixed: true }}
            >
                <TextField
                    label="Name"
                    placeholder="Enter application name"
                    value={applicationName}
                    onChange={(event, newValue) =>
                        setApplication(newValue || '')
                    }
                ></TextField>
                <DialogFooter>
                    <PrimaryButton
                        onClick={() => {
                            applications.create({ name: applicationName });
                            setShowCreateApplicationDialog(false);
                            setApplication('');
                        }}
                        text="Create"
                    />
                    <DefaultButton
                        onClick={() => setShowCreateApplicationDialog(false)}
                        text="Cancel"
                    />
                </DialogFooter>
            </Dialog>
            <Overview />
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
