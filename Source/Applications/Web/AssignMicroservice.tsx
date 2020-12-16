// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import {
    Dialog,
    PrimaryButton,
    DefaultButton,
    DialogFooter,
    IDropdownOption,
    Dropdown,
    Spinner,
    SpinnerSize,
} from 'office-ui-fabric-react';
import { withViewModel } from '@shared/mvvm';
import { AssignMicroserviceViewModel, SelectedOption } from './AssignMicroserviceViewModel';
import { ApplicationForListing } from './ApplicationForListing';

export type AssignMicroserviceProps = {
    visible: any;
    forApplication?: ApplicationForListing;
    onAssigned: () => void;
    onCancelled: () => void;
};

export const AssignMicroservice = withViewModel<AssignMicroserviceViewModel, AssignMicroserviceProps>(
    AssignMicroserviceViewModel,
    ({ viewModel, props }) => {
        const options: IDropdownOption[] = viewModel.microservices;
        const canAssign: boolean = props.forApplication?.id !== undefined;
        const disableAssignButton = !canAssign || viewModel.isAssigning;
        const disableCancelButton = viewModel.isAssigning;

        function handleAssigning(viewModel: AssignMicroserviceViewModel, props: AssignMicroserviceProps) {
            viewModel.assignMicroservice(
                props.forApplication!.id,
                viewModel!.selectedMicroserviceId
            );
            props.onAssigned();
        }

        return (
            <Dialog
                hidden={!props.visible}
                title={`Assign Microservice to ${props.forApplication?.name}`}
                modalProps={{
                    topOffsetFixed: true,
                }}
            >
                <Dropdown
                    label='Select microservice'
                    options={options}
                    onChange={(e, o) => viewModel.selectMicroservice(o as SelectedOption)}
                />
                <DialogFooter>
                    <PrimaryButton
                        onClick={async () => handleAssigning(viewModel, props)}
                        text='Assign'
                        disabled={disableAssignButton}
                    />
                    <DefaultButton
                        onClick={props.onCancelled}
                        text='Cancel'
                        disabled={disableCancelButton}
                    />
                </DialogFooter>
            </Dialog>
        );
    }
);

