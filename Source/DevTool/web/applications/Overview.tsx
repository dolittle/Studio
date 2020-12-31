// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { DetailsList, DetailsListLayoutMode, SelectionMode, IColumn, TextField, Stack } from '@fluentui/react';
import { withViewModel } from '@dolittle/vanir-react';
import { OverviewViewModel } from './OverviewViewModel';
import { ApplicationRunState } from '../../common/applications/ApplicationRunState';

const columns = [{
    key: 'Id',
    fieldName: 'Id',
    name: 'Id',
    minWidth: 100
}, {
    key: 'Image',
    fieldName: 'Image',
    name: 'Image',
    minWidth: 200
}, {
    key: 'State',
    fieldName: 'State',
    name: 'State'
}, {
    key: 'Status',
    fieldName: 'Status',
    name: 'Status'
}] as IColumn[];


const applicationRunStateStrings: any = {};
applicationRunStateStrings[ApplicationRunState.stopped] = 'Stopped';
applicationRunStateStrings[ApplicationRunState.running] = 'Running';
applicationRunStateStrings[ApplicationRunState.partial] = 'Partially running';

export const Overview = withViewModel(OverviewViewModel, ({ viewModel }) => {
    const items = viewModel.containers;

    return (
        <>
            <Stack tokens={{ childrenGap: 5 }}>
                <TextField label="Running state" readOnly value={applicationRunStateStrings[viewModel.applicationStatus?.runState || ApplicationRunState.stopped]} />
                <DetailsList
                    columns={columns}
                    items={items}
                    selectionMode={SelectionMode.none}
                    layoutMode={DetailsListLayoutMode.justified}></DetailsList>
            </Stack>
        </>
    );
});
