// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper, Typography } from '@mui/material';
import { DataGridPro, DataGridProProps, GridRowId } from '@mui/x-data-grid-pro';

import { Button, CreateButton, DataGridCustomToolbar, dataGridDefaultProps, DataGridWrapper, Form, InlineWrapper, Input, Select } from '@dolittle/design-system';

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

const commandsListDetailPanelColumns = [
    {
        field: 'm3Argument',
        headerName: 'M3 Argument',
        flex: 1,
    },
    {
        field: 'description',
        headerName: 'Description',
        flex: 1,
    },
    {
        field: 'parameterName',
        headerName: 'Parameter Name',
        flex: 1,
    },
    {
        field: 'mode',
        headerName: 'Mode',
        //<Select
        //id='mode'
        //             label='Mode'
        //             options={
        //     [
        //     { value: 'Create', displayValue: 'Create' },
        //     { value: 'Update', displayValue: 'Update' },
        //     { value: 'Delete', displayValue: 'Delete' },
        //             ]}
        // />
        flex: 1,
    },
    {
        field: 'defaultValue',
        headerName: 'Default Value',
        flex: 1,
    },
];

type CommandEditParametersProps = {
    namespace: string;
    description: string;
};

export const CommandsListDetailPanel = ({ row }: any) => {
    return (
        <Paper sx={{ p: 2, pl: 7.5 }}>
            <Typography variant='h4' gutterBottom>{row.name}</Typography>
            <Typography variant='body1' color='text.secondary'>{`Transaction: ${'MSN051MI > GetPaymentReq'}`}</Typography>

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
                        components={{
                            Toolbar: () => <DataGridCustomToolbar title='Parameters'>
                                <Button label='Add Parameters' startWithIcon='AddCircle' />
                                <Button label='Save Changes' startWithIcon='AddCircle' />
                            </DataGridCustomToolbar>
                        }}
                    />
                </DataGridWrapper>

                {/* <CreateButton label='Save changes and close' onCreate={() => { }} /> */}
            </Form>
        </Paper>
    );
};
