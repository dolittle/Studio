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
    IComboBoxOption,
    ComboBox,
} from 'office-ui-fabric-react';
import { withViewModel } from '@shared/mvvm';
import { AssignMicroserviceViewModel, SelectedOption } from './AssignMicroserviceViewModel';
import { ApplicationModel } from './ApplicationModel';

export type AssignMicroserviceProps = {
    visible: any;
    forApplications?: ApplicationModel[];
    onAssigned: () => void;
    onCancelled: () => void;
};

export const AssignMicroservice = withViewModel<AssignMicroserviceViewModel, AssignMicroserviceProps>(
    AssignMicroserviceViewModel,
    ({ viewModel, props }) => {
        const applicationsOptions: IDropdownOption[] = getApplications(props);
        const environmentOptions: IDropdownOption[] = getEnvironmentsForApplications(props, viewModel);
        const microserviceOptions: IDropdownOption[] = getMicroservicesForEnvironment(viewModel);

        const canAssign: boolean = evaluateIfCanAssign(viewModel);
        const disableAssignButton = !canAssign || viewModel.isAssigning;
        const disableCancelButton = viewModel.isAssigning;

        function handleAssigning(viewModel: AssignMicroserviceViewModel, props: AssignMicroserviceProps) {
            viewModel.assignMicroservice();
            props.onAssigned();
        }
        console.log(viewModel);

        return (
            <Dialog
                hidden={!props.visible}
                title={`Assign Microservice to an Application`}
                modalProps={{
                    topOffsetFixed: true,
                }}
            >
                <Dropdown
                    label='Select Application'
                    placeholder='Select Application'
                    options={applicationsOptions}
                    onChange={(e, o) => viewModel.selectApplication(o as SelectedOption)}
                />
                <br/>
                <Dropdown
                    label="Select Environment"
                    options={environmentOptions}
                    // disabled={!viewModel.selectedApplicationId}
                    placeholder="Select Environment"
                    onChange={(e,o) => viewModel.selectEnvironment(o as SelectedOption)}
                />
                <br/>
                <Dropdown
                    label='Select Microservice'
                    placeholder='Select Microservice'
                    // disabled={!viewModel.selectedEnvironmentId}
                    options={microserviceOptions}
                    onChange={(e, o) => viewModel.selectMicroservice(o as SelectedOption)}
                />
                <br/>
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

function evaluateIfCanAssign(viewModel: AssignMicroserviceViewModel): boolean {
    return (!!viewModel.selectedApplicationId ?? false) &&
        (!!viewModel.selectedEnvironmentId ?? false) &&
        (!!viewModel.selectedMicroserviceId ?? false);
}

function getMicroservicesForEnvironment(viewModel: AssignMicroserviceViewModel): IDropdownOption[] {
    return viewModel.microservices.map(
        (ms) => ({ key: ms.microserviceId, text: ms.name })
    );
}

function getApplications(props: AssignMicroserviceProps): IDropdownOption[] {
    return (
        props.forApplications?.map((a) => ({
            key: a.applicationId.toString(),
            text: a.name,
        })) ?? []
    );
}


function getEnvironmentsForApplications(
    props: AssignMicroserviceProps,
    viewModel: AssignMicroserviceViewModel
): IDropdownOption[] {
    return viewModel.selectedApplicationId
        ? props
              .forApplications!.find(
                  (_) => _.applicationId.toString() === viewModel.selectedApplicationId!
              )!
              .environments?.map((e) => ({ key: e.id.toString(), text: e.name }))
        : [];
}

