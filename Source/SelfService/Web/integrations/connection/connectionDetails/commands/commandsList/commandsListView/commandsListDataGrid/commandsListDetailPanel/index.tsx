// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Paper, Typography } from '@mui/material';
import { DataGridPro, GRID_CHECKBOX_SELECTION_FIELD, GridFilterModel, GridSelectionModel } from '@mui/x-data-grid-pro';

import { Button, DataGridCustomToolbar, dataGridDefaultProps, DataGridWrapper, Form, InlineWrapper, Input, NewSwitch } from '@dolittle/design-system';

import { commandsListDetailPanelColumns } from './DetailPanelColumns';

const styles = {
    // Hack for secret cell active state. Otherwise size is going to be different.
    '& .MuiOutlinedInput-root': {
        '& .MuiSelect-select': { p: '5px 15px' },
        '& fieldset': { border: 'none' },
    },
    // Hide the filter icon in the column header.
    '& .MuiDataGrid-columnHeader--filtered .MuiDataGrid-iconButtonContainer': {
        display: 'none',
    },
};

const commandsListDetailPanelRows = [
    {
        m3Argument: 'CFAB',
        description: 'Description',
        parameterName: 'Parameter Name',
        mode: 'Optional',
        defaultValue: 'Default Value',
    },
    {
        m3Argument: 'FACI',
        description: 'Description',
        parameterName: 'Parameter Name',
        mode: 'Required',
        defaultValue: 'Default Value',
    },
    {
        m3Argument: 'CHID',
        description: 'Description',
        parameterName: 'Parameter Name',
        mode: 'Hardcoded value',
        defaultValue: 'Default Value',
    },
];

const commandsListDetailPanelRows2 = [
    {
        name: 'ABSK',
        description: 'ABCclass-supplier',
        type: 'StringType',
        length: 1,
        required: false
    },
    {
        name: 'ABSM',
        description: 'ABCmethod-supplier',
        type: 'StringType',
        length: 1,
        required: false
    },
    {
        name: 'ACRF',
        description: 'User-definedaccountingcontrolobject',
        type: 'StringType',
        length: 8,
        required: false
    },
    {
        name: 'AGNT',
        description: 'Agent',
        type: 'StringType',
        length: 10,
        required: false
    },
    {
        name: 'ALSU',
        description: 'Searchkey',
        type: 'StringType',
        length: 10,
        required: false
    },
    {
        name: 'ATPR',
        description: 'Attributepricingrule',
        type: 'StringType',
        length: 1,
        required: false
    },
    {
        name: 'AVCD',
        description: 'Activitycode',
        type: 'StringType',
        length: 3,
        required: false
    },
    {
        name: 'BUYE',
        description: 'Buyer',
        type: 'StringType',
        length: 10,
        required: false
    },
    {
        name: 'CF10',
        description: 'User-definedfield5-purchase/financial',
        type: 'StringType',
        length: 1,
        required: false
    },
    // {
    //     "name": "CFI1",
    //     "description": "User-definedfield1-supplier",
    //     "type": "StringType",
    //     "length": 10,
    //     "required": false
    // },
    // {
    //     "name": "CFI2",
    //     "description": "User-definedfield2-supplier",
    //     "type": "StringType",
    //     "length": 17,
    //     "required": false
    // },
    // {
    //     "name": "CFI3",
    //     "description": "User-definedfield3-supplier",
    //     "type": "StringType",
    //     "length": 3,
    //     "required": false
    // },
    // {
    //     "name": "CFI4",
    //     "description": "User-definedfield4-supplier",
    //     "type": "StringType",
    //     "length": 5,
    //     "required": false
    // },
    // {
    //     "name": "CFI5",
    //     "description": "User-definedfield5-supplier",
    //     "type": "StringType",
    //     "length": 1,
    //     "required": false
    // },
    // {
    //     "name": "CFI6",
    //     "description": "User-definedfield1-purchase/financial",
    //     "type": "StringType",
    //     "length": 10,
    //     "required": false
    // },
    // {
    //     "name": "CFI7",
    //     "description": "User-definedfield2-purchase/financial",
    //     "type": "StringType",
    //     "length": 17,
    //     "required": false
    // },
    // {
    //     "name": "CFI8",
    //     "description": "User-definedfield3-purchase/financial",
    //     "type": "StringType",
    //     "length": 3,
    //     "required": false
    // },
    // {
    //     "name": "CFI9",
    //     "description": "User-definedfield4-purchase/financial",
    //     "type": "StringType",
    //     "length": 5,
    //     "required": false
    // },
    // {
    //     "name": "CGRP",
    //     "description": "Consolidation group",
    //     "type": "StringType",
    //     "length": 10,
    //     "required": false
    // },
    // {
    //     "name": "COBI",
    //     "description": "Groupofcompanies",
    //     "type": "StringType",
    //     "length": 10,
    //     "required": false
    // },
    // {
    //     "name": "COR2",
    //     "description": "Organizationnumber2",
    //     "type": "StringType",
    //     "length": 11,
    //     "required": false
    // },
];

type CommandEditParametersProps = {
    namespace: string;
    description: string;
};

export const CommandsListDetailPanel = ({ row }: any) => {
    const [selectedRowIds, setSelectedRowIds] = useState<GridSelectionModel>([]);
    const [hideUnselectedRows, setHideUnselectedRows] = useState(false);

    const gridFilters: GridFilterModel = {
        // Hide unselected rows.
        items: hideUnselectedRows ? [
            {
                columnField: GRID_CHECKBOX_SELECTION_FIELD,
                operatorValue: 'is',
                value: 'true',
            },
        ] : [],
    };

    return (
        <Paper sx={{ p: 2, pl: 7.5 }}>
            <Typography variant='h4' gutterBottom>{row.name}</Typography>
            <Typography variant='body1' color='text.secondary'>{`Transaction: ${'CRS620MI > UpdSupplier'}`}</Typography>

            <Form<CommandEditParametersProps>
                initialValues={{
                    namespace: row.nameSpace,
                    description: row.description,
                }}
                onSubmit={() => { }}
            >
                <InlineWrapper sx={{ my: 4 }}>
                    <Typography>Namespace:</Typography>
                    <Input id='namespace' label='Namespace' sx={{ '& .MuiOutlinedInput-root': { width: 220 } }} />
                </InlineWrapper>

                <DataGridWrapper background='dark' sx={{ height: 300 }}>
                    <DataGridPro
                        {...dataGridDefaultProps}
                        rows={commandsListDetailPanelRows}
                        columns={commandsListDetailPanelColumns}
                        getRowId={row => row.m3Argument}
                        autoHeight={false}
                        checkboxSelection
                        keepNonExistentRowsSelected
                        selectionModel={selectedRowIds}
                        onSelectionModelChange={newSelectionModel => setSelectedRowIds(newSelectionModel)}
                        filterModel={gridFilters}
                        components={{
                            Toolbar: () => (
                                <DataGridCustomToolbar title='Parameters'>
                                    <NewSwitch
                                        id='hideUnselectedRows'
                                        label='Hide Unselected Rows'
                                        checked={hideUnselectedRows}
                                        onChange={() => setHideUnselectedRows(!hideUnselectedRows)}
                                    />

                                    <Button label='Save Changes' startWithIcon='AddCircle' disabled onClick={() => { }} />
                                </DataGridCustomToolbar>
                            )
                        }}
                        experimentalFeatures={{ newEditingApi: true }}
                        sx={styles}
                    />
                </DataGridWrapper>
            </Form>
        </Paper>
    );
};
