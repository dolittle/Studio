// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { DataGridPro, GRID_CHECKBOX_SELECTION_FIELD, GridFilterModel, GridSelectionModel } from '@mui/x-data-grid-pro';

import { Button, ContentDivider, ContentWithSubtitle, DataGridCustomToolbar, dataGridDefaultProps, DataGridWrapper, Form, NewSwitch } from '@dolittle/design-system';

import { commandsListDetailPanelColumns } from './DetailPanelColumns';

const styles = {
    // Hack for select cell active state. Otherwise size is going to be different.
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
];

type CommandEditParametersProps = {
    namespace: string;
    description: string;
};

export const EditCommandSection = ({ row }: any) => {
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
        <ContentWithSubtitle title={`Transaction: ${'CRS620MI > UpdSupplier'}`}>
            <Form<CommandEditParametersProps>
                initialValues={{
                    namespace: '',
                    description: '',
                }}
                onSubmit={() => { }}
            >
                <DataGridWrapper background='dark' sx={{ height: 300 }}>
                    <DataGridPro
                        {...dataGridDefaultProps}
                        rows={commandsListDetailPanelRows}
                        columns={commandsListDetailPanelColumns}
                        getRowId={row => row.name}
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
                                </DataGridCustomToolbar>
                            )
                        }}
                        experimentalFeatures={{ newEditingApi: true }}
                        sx={styles}
                    />
                </DataGridWrapper>

                <ContentDivider sx={{ mt: 3, mb: 2 }} />

                <Button label='Save Changes' startWithIcon='AddCircle' variant='fullwidth' disabled onClick={() => { }} />
            </Form>
        </ContentWithSubtitle>
    );
};
