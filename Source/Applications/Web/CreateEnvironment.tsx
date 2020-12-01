// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import {
    Dialog,
    PrimaryButton,
    DefaultButton,
    DialogFooter,
    TextField,
    Dropdown,
    IDropdownOption
} from 'office-ui-fabric-react';
import { withViewModel } from '@shared/mvvm';
import { CreateEnvironmentViewModel } from './CreateEnvironmentViewModel';
import { ApplicationModel } from './ApplicationModel';
import { SelectedOption } from './SelectedOption';

export type CreateEnvironmentProps = {
    visible: any;
    allApplications?: ApplicationModel[];
    onCreated: () => void;
    onCancelled: () => void;
};

export const CreateEnvironment = withViewModel<CreateEnvironmentViewModel, CreateEnvironmentProps>(
    CreateEnvironmentViewModel,
    ({ viewModel, props }) => {

        const applicationsOptions: IDropdownOption[] = getApplications(props.allApplications);

        return (
            <Dialog
                hidden={!props.visible}
                title='Create Environment'
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
                <TextField
                    label='Name'
                    placeholder='Enter environment name'
                    value={viewModel.environmentName}
                    onChange={(e, v) => (viewModel.environmentName = v)}
                ></TextField>
                <DialogFooter>
                    <PrimaryButton
                        onClick={async () => handleCreateClicked(viewModel, props)}
                        text='Create'
                    />
                    <DefaultButton onClick={props.onCancelled} text='Cancel' />
                </DialogFooter>
            </Dialog>
        );
    }
);

function handleCreateClicked(viewModel: CreateEnvironmentViewModel, props: CreateEnvironmentProps) {
    viewModel.createEnvironment();
    props.onCreated();
}

function getApplications(applications?: ApplicationModel[]): IDropdownOption[] {
    return (
        applications?.map((a) => ({
            key: a.applicationId.toString(),
            text: a.name,
        })) ?? []
    );
}