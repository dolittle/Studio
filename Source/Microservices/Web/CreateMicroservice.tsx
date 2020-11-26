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
import { CreateMicroserviceViewModel } from './CreateMicroserviceViewModel';

export type CreateMicroserviceProps = {
    visible: any;
    onCreated: () => void;
    onCancelled: () => void;
};

export const CreateMicroservice = withViewModel<
    CreateMicroserviceViewModel,
    CreateMicroserviceProps
>(CreateMicroserviceViewModel, ({ viewModel, props }) => {
    return (
        <Dialog
            hidden={!props.visible}
            title='Create Microservice'
            modalProps={{
                topOffsetFixed: true,
            }}
        >
            <TextField
                label='Name'
                placeholder='Enter microservice name'
                value={viewModel.microserviceName}
                onChange={(e, v) => (viewModel.microserviceName = v)} //Do we actually need this?
            ></TextField>
            <DialogFooter>
                <PrimaryButton onClick={async () => viewModel.createMicroservice()} text='Create' />
                <DefaultButton onClick={props.onCancelled} text='Cancel' />
            </DialogFooter>
        </Dialog>
    );
});
