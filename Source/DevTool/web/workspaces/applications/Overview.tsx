// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
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


function copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
    const key = columnKey as keyof T;
    return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}

export const Overview = withViewModel<OverviewViewModel, OverviewProps>(OverviewViewModel, ({ viewModel, props }) => {
    const items = viewModel.instances;

    const [columns, setColumns] = useState([{
        key: 'Id',
        fieldName: 'id',
        name: 'Id',
        minWidth: 100,
    }, {
        key: 'Name',
        fieldName: 'name',
        name: 'Name',
        minWidth: 400,
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
    }] as IColumn[]);


    const onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
        const newColumns: IColumn[] = columns.slice();
        const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
        newColumns.forEach((newCol: IColumn) => {
            if (newCol === currColumn) {
                currColumn.isSortedDescending = !currColumn.isSortedDescending;
                currColumn.isSorted = true;
            } else {
                newCol.isSorted = false;
                newCol.isSortedDescending = true;
            }
        });
        setColumns(newColumns);
    };

    for (const column of columns) {
        column.onColumnClick = onColumnClick;
    }

    let sortedItems = items;
    const sortedColumn = columns.find(_ => _.isSorted === true);
    if (sortedColumn) {
        sortedItems = copyAndSort(items, sortedColumn.fieldName!, sortedColumn.isSortedDescending);
    }

    return (
        <>
            <Stack tokens={{ childrenGap: 5 }}>
                <TextField label="Running state" readOnly value={GetRunStateAsString(viewModel.state?.state || RunState.stopped)} />


                <div data-is-scrollable="true" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                    <DetailsList
                        columns={columns}
                        items={sortedItems}
                        selectionMode={SelectionMode.none}
                        layoutMode={DetailsListLayoutMode.justified}></DetailsList>
                </div>
            </Stack>
        </>
    );
});
