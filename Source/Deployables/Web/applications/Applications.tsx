// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { DialogResult, useDialog, withViewModel } from '@dolittle/vanir-react';
import { CreateApplication, CreateApplicationOutput } from './CreateApplication';
import { ActionBar } from '@shared/components';
import { ApplicationsViewModel } from './ApplicationsViewModel';
import { CreateMicroservice, CreateMicroserviceOutput } from './CreateMicroservice';

export const Applications = withViewModel(ApplicationsViewModel, ({ viewModel }) => {
    const [showCreateApplication, createApplicationProps] = useDialog<any, CreateApplicationOutput>(async (result, output?) => {
        if (result === DialogResult.Success && output) {
            viewModel.createApplication(output.name);
        }
    });

    const [showCreateMicroservice, createMicroserviceProps] = useDialog<any, CreateMicroserviceOutput>(async (result, output?) => {
        if (result === DialogResult.Success && output) {
            //viewModel.createApplication(output.name);
        }
    });
    viewModel.createMicroserviceCallback = showCreateMicroservice;

    return (
        <>
            <CreateApplication {...createApplicationProps} />
            <CreateMicroservice {...createMicroserviceProps} />

            <ActionBar
                title="Create application"
                icon="Add"
                onTriggered={showCreateApplication} />
        </>
    );
});
