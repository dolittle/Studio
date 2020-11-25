// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import {
    Dialog,
    PrimaryButton,
    DefaultButton,
    DialogFooter,
    DropdownMenuItemType,
    IDropdownOption,
    Dropdown,
} from 'office-ui-fabric-react';
import { withViewModel } from '@shared/mvvm';
import { AssignMicroserviceViewModel, SelectedOption } from './AssignMicroserviceViewModel';
import { ApplicationModel } from './ApplicationModel';

export type AssignMicroserviceProps = {
    visible: any;
    forApplication?: ApplicationModel;
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
                title={`Assign Microservice to ${props.forApplication?.name}`}
                modalProps={{
                    topOffsetFixed: true,
                }}
            >
                <Dropdown
                    label="Select microservice"
                    options={options}
                    onChange={
                        (e, o) => viewModel.selectMicroservice(o as SelectedOption)
                    }
                />
                <DialogFooter>
                    <PrimaryButton
                        onClick={
                            async () => viewModel.assignMicroservice(
                                props.forApplication!.applicationId,
                                viewModel!.selectedMicroserviceId
                            )
                        }
                        text='Assign'
                    />
                    <DefaultButton onClick={props.onCancelled} text='Cancel' />
                </DialogFooter>
            </Dialog>
        );
    }
);
