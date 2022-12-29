// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/material';
import { DeleteRounded, RefreshRounded } from '@mui/icons-material';

import { DataTablePro, DataTableProProps } from './DataTablePro';

import { Button } from '@dolittle/design-system';

export default {
    parameters: {
        controls: {
            include: [
                'isRowCheckbox',
                'disableRowSelectionOnClick',
                'editMode'
            ]
        },
    }
} as ComponentMeta<typeof DataTablePro>;

const initialRows = [
    { id: 1, col1: 'Row 1', col2: 'Row 1', col3: 'Row 1' },
    { id: 2, col1: 'Row 2', col2: 'Row 2', col3: 'Row 2' },
    { id: 3, col1: 'Row 3', col2: 'Row 3', col3: 'Row 3' }
];

const columns = [
    { field: 'col1', headerName: 'Column 1', flex: 1, width: 150 },
    { field: 'col2', headerName: 'Column 2', flex: 1, width: 150 },
    { field: 'col3', headerName: 'Column 3', flex: 1, width: 150 }
];

const Template: ComponentStory<typeof DataTablePro> = ({ isRowCheckbox, disableRowSelectionOnClick }: DataTableProProps) => {
    const [selectedRowIds, setSelectedRowIds] = useState<any[]>([]);
    const [rows, setRows] = useState(initialRows);

    return (
        <Box>
            <Button
                label='Reset'
                startWithIcon={<RefreshRounded />}
                disabled={rows.length === 3}
                onClick={() => setRows(initialRows)} />
            <Button
                label='Delete selected'
                startWithIcon={<DeleteRounded />}
                disabled={selectedRowIds.length === 0}
                onClick={() => setRows(rows.filter(row => !selectedRowIds.includes(row.id)))}
            />

            <DataTablePro
                rows={rows}
                columns={columns}
                isRowCheckbox={isRowCheckbox}
                selectedRows={selectedRowIds}
                onSelectedRowsChange={setSelectedRowIds}
                disableRowSelectionOnClick={isRowCheckbox ? disableRowSelectionOnClick : true}
                experimentalFeatures={{ newEditingApi: true }}
                sx={{ mt: 4 }}
            />
        </Box>
    );
};

export const Default = Template.bind({});

Default.args = {
    isRowCheckbox: true,
    disableRowSelectionOnClick: true
};
