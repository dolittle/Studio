// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { GridColDef, GridRowId, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid-pro';

import { EditCell, EditTextFieldCell, Tooltip } from '@dolittle/design-system';

import { MappableTableColumn } from '../../../../../../../apis/integrations/generated';

export type DataGridTableListingEntry = MappableTableColumn & {
    id: string;
    fieldName: string;
};

export const getMessageMappingDataGridColumns = (disabledRows: GridRowId[]) => {
    const CheckboxCell = (params) => {
        return (
            disabledRows?.includes(params.row.id)
                ? <Tooltip title='This is a primary key for this table and is required as part of the message type'>
                    <div>{GRID_CHECKBOX_SELECTION_COL_DEF.renderCell?.(params)}</div>
                </Tooltip>
                : GRID_CHECKBOX_SELECTION_COL_DEF.renderCell?.(params)
        );
    };

    return [
        {
            ...GRID_CHECKBOX_SELECTION_COL_DEF,
            renderCell: CheckboxCell,
        },
        {
            field: 'm3ColumnName',
            headerName: 'M3 Field Name',
            minWidth: 270,
        },
        {
            field: 'm3Description',
            headerName: 'M3 Description',
            minWidth: 270,
        },
        {
            field: 'fieldName',
            headerName: 'Remapped Name',
            editable: true,
            minWidth: 270,
            renderCell: EditCell,
            renderEditCell: EditTextFieldCell,
        },
    ] as GridColDef<DataGridTableListingEntry>[];
};
