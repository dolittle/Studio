// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import {
    Dialog,
    PrimaryButton,
    DefaultButton,
    DialogFooter,
    TextField,
    DropdownMenuItemType,
    IDropdownOption,
    Dropdown,
} from 'office-ui-fabric-react';
import { withViewModel } from '@shared/mvvm';
import { AssignMicroserviceViewModel } from './AssignMicroserviceViewModel';

export type AssignMicroserviceProps = {
    visible: any;
    onAssigned: () => void;
    onCancelled: () => void;
};

export const AssignMicroservice = withViewModel<AssignMicroserviceViewModel, AssignMicroserviceProps>(
    AssignMicroserviceViewModel,
    ({ viewModel, props }) => {
        const options: IDropdownOption[] = viewModel.microservices;

        return (
            <Dialog
                hidden={!props.visible}
                title='Assign Microservice'
                modalProps={{
                    topOffsetFixed: true,
                }}
            >
                <Dropdown
                    label="Select microservice"
                    options={options}
                />
                <DialogFooter>
                    <PrimaryButton
                        onClick={async () => viewModel.assignMicroservice()}
                        text='Assign'
                    />
                    <DefaultButton onClick={props.onCancelled} text='Cancel' />
                </DialogFooter>
            </Dialog>
        );
    }
);
