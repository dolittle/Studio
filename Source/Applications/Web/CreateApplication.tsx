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
import { withViewModel } from '@shared/mvvm';
import { CreateApplicationViewModel } from './CreateApplicationViewModel';

export type CreateApplicationProps = {
    visible: any;
    onCreated: () => void;
    onCancelled: () => void;
};

export const CreateApplication = withViewModel<CreateApplicationViewModel, CreateApplicationProps>(
    CreateApplicationViewModel,
    ({ viewModel, props }) => {
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
                    value={viewModel.applicationName}
                    onChange={(e, v) => (viewModel.applicationName = v)} //Do we actually need this?
                ></TextField>
                <DialogFooter>
                    <PrimaryButton
                        onClick={async () => viewModel.createApplication()}
                        text='Create'
                    />
                    <DefaultButton onClick={props.onCancelled} text='Cancel' />
                </DialogFooter>
            </Dialog>
        );
    }
);
