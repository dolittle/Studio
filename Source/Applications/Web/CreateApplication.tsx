// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import {
    Dialog,
    PrimaryButton,
    DefaultButton,
    DialogFooter,
    TextField,
} from 'office-ui-fabric-react';
import { container } from 'tsyringe';
import { Applications } from '@shared/platform';

export type CreateApplicationProps = {
    visible: any;
    applicationName?: string;
    onCreated: () => void;
    onCancelled: () => void;
};

export const CreateApplication = (props: CreateApplicationProps) => {
    const [applicationName, setApplication] = React.useState('');
    const applications = container.resolve(Applications);

    return (
        <Dialog
            hidden={!props.visible}
            title='Create Application'
            modalProps={{
                topOffsetFixed: true,
            }}
        >
            <TextField
                label='Name'
                placeholder='Enter application name'
                value={props.applicationName}
                onChange={(_event, newValue) => setApplication(newValue || '')}
            ></TextField>
            <DialogFooter>
                <PrimaryButton
                    onClick={async () => {
                        await applications.create({ name: applicationName });
                        props.onCreated();
                    }}
                    text='Create'
                />
                <DefaultButton onClick={() => props.onCancelled()} text='Cancel' />
            </DialogFooter>
        </Dialog>
    );
};
