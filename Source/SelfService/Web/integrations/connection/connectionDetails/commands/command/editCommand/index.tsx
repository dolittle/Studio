// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { DataGridPro, GRID_CHECKBOX_SELECTION_FIELD, GridFilterModel, GridSelectionModel } from '@mui/x-data-grid-pro';

import { Button, ContentDivider, ContentWithSubtitle, DataGridCustomToolbar, dataGridDefaultProps, DataGridWrapper, NewSwitch } from '@dolittle/design-system';

import { CommandMappingModel } from '../../../../../../apis/integrations/generated';

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

export type EditCommandSectionProps = {
    commandData: CommandMappingModel | undefined;
};

export const EditCommandSection = ({ commandData }: EditCommandSectionProps) => {
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
            <DataGridWrapper background='dark' sx={{ height: 300 }}>
                <DataGridPro
                    {...dataGridDefaultProps}
                    rows={commandData?.parameters || []}
                    columns={commandsListDetailPanelColumns}
                    getRowId={row => row.mappedName}
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

        </ContentWithSubtitle>
    );
};
