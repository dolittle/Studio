// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/material';

import { DataTablePro } from './DataTablePro';

import { Button } from '@dolittle/design-system/atoms/Button';

export default {
    title: 'DataTablePro',
    component: DataTablePro,
    argTypes: {
        handleSelectionModelChange: {
            table: {
                disable: true
            }
        },
        selectionModel: {
            table: {
                disable: true
            }
        },
        disableSelectionOnClick: {
            table: {
                disable: true
            }
        },
        sx: {
            table: {
                disable: true
            }
        }
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
    { field: 'col3', headerName: 'Column 3', flex: 1, width: 150 },
];

const Template: ComponentStory<typeof DataTablePro> = (args) => {
    const [selectionModel, setSelectionModel] = useState<any>([]);
    const [rows, setRows] = useState(initialRows);

    const handleSelectionModelChange = (newSelectionModel) => {
        setSelectionModel(newSelectionModel);
    };

    const handleDelete = () => {
        setRows(rows.filter(row => !selectionModel.includes(row.id)));
        setSelectionModel([]);
    };

    return (
        <Box sx={{ width: 'auto' }}>
            <Button variant='text' label='Reset' onClick={() => setRows(initialRows)} />
            <Button variant='text' label='Delete selected' disabled={selectionModel.length === 0} onClick={handleDelete} />

            <DataTablePro
                rows={rows}
                columns={columns}
                isRowSelectable={args.isRowSelectable}
                handleSelectionModelChange={handleSelectionModelChange}
                selectionModel={selectionModel}
                sx={{ mt: 4 }}
            />
        </Box>
    );
};

export const Default = Template.bind({});

Default.args = {
    rows: [
        { id: 1, col1: 'Row 1', col2: 'Row 1', col3: 'Row 1' },
        { id: 2, col1: 'Row 2', col2: 'Row 2', col3: 'Row 2' },
        { id: 3, col1: 'Row 3', col2: 'Row 3', col3: 'Row 3' }
    ],
    columns,
    isRowSelectable: true
};
