// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { DetailsList, DetailsListLayoutMode, SelectionMode, IColumn, TextField, Stack } from '@fluentui/react';
import { withViewModel } from '@dolittle/vanir-react';
import { OverviewViewModel } from './OverviewViewModel';
import { OverviewProps } from './OverviewProps';
import { RunState, InstanceState, InstanceType } from '../../../common/applications';
import { GetInstanceTypeAsString } from './InstanceTypeHelpers';
import { GetRunStateAsString } from './RunStateHelpers';

const RenderRunState = (item: InstanceState, index: number, column: IColumn) => {
    const runState = item[column.fieldName as keyof RunState] as RunState;
    return (
        <span>
            {GetRunStateAsString(runState)}
        </span>
    );
};


const RenderInstanceType = (item: InstanceState, index: number, column: IColumn) => {
    const instanceType = item[column.fieldName as keyof InstanceState] as InstanceType;
    return (
        <span>
            {GetInstanceTypeAsString(instanceType)}
        </span>
    );
};

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
    name: 'State',
    onRender: RenderRunState
}, {
    key: 'Type',
    fieldName: 'type',
    name: 'Type',
    onRender: RenderInstanceType
}] as IColumn[];


export const Overview = withViewModel<OverviewViewModel, OverviewProps>(OverviewViewModel, ({ viewModel, props }) => {
    const items = viewModel.instances;

    return (
        <>
            <Stack tokens={{ childrenGap: 5 }}>
                <TextField label="Running state" readOnly value={GetRunStateAsString(viewModel.state?.state || RunState.stopped)} />
                <DetailsList
                    columns={columns}
                    items={items}
                    selectionMode={SelectionMode.none}
                    layoutMode={DetailsListLayoutMode.justified}></DetailsList>
            </Stack>
        </>
    );
});
