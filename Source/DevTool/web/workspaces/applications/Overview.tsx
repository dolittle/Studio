// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { DetailsList, DetailsListLayoutMode, SelectionMode, IColumn, TextField, Stack } from '@fluentui/react';
import { withViewModel } from '@dolittle/vanir-react';
import { OverviewViewModel } from './OverviewViewModel';
import { OverviewProps } from './OverviewProps';
import { RunState } from '../../../common/applications';

const columns = [{
    key: 'Id',
    fieldName: 'id',
    name: 'Id',
    minWidth: 100
}, {
    key: 'Name',
    fieldName: 'name',
    name: 'Name',
    minWidth: 200
}, {
    key: 'State',
    fieldName: 'state',
    name: 'State'
}, {
    key: 'Type',
    fieldName: 'type',
    name: 'Type'
}] as IColumn[];


const runStateStrings: any = {};
runStateStrings[RunState.stopped] = 'Stopped';
runStateStrings[RunState.starting] = 'Starting';
runStateStrings[RunState.running] = 'Running';
runStateStrings[RunState.partial] = 'Partially running';
runStateStrings[RunState.stopping] = 'Stopping';
runStateStrings[RunState.unknown] = 'Unknown';

export const Overview = withViewModel<OverviewViewModel, OverviewProps>(OverviewViewModel, ({ viewModel, props }) => {
    const items = viewModel.instances;

    return (
        <>
            <Stack tokens={{ childrenGap: 5 }}>
                <TextField label="Running state" readOnly value={runStateStrings[viewModel.state?.state || RunState.stopped]} />
                <DetailsList
                    columns={columns}
                    items={items}
                    selectionMode={SelectionMode.none}
                    layoutMode={DetailsListLayoutMode.justified}></DetailsList>
            </Stack>
        </>
    );
});
