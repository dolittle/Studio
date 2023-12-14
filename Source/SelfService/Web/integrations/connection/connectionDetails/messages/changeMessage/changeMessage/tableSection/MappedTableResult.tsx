// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Grid, Typography } from '@mui/material';

import { TextField } from '@dolittle/design-system/';

import { MappedField } from '../../../../../../../apis/integrations/generated';

import { ViewMode } from '../../ViewMode';
import { MessageMappingDataGrid } from './messageMappingDataGrid';

export type MappedTableResultProps = {
    selectedTableName: string;
    mode: ViewMode;
    initialSelectedFields: MappedField[];
    mappableTableResult: any;
    isLoading: boolean;
};

export const MappedTableResult = ({ selectedTableName, mode, initialSelectedFields, mappableTableResult, isLoading }: MappedTableResultProps) => {
    const [fieldSearchTerm, setFieldSearchTerm] = useState('');

    return (
        <>
            <Typography gutterBottom>Primary fields are necessary for the message type and have already been selected.</Typography>
            <Typography>{`You can remap the M3 Description by adding a remapped name that makes sense for your organization’s business logic. `}</Typography>

            <Grid container gap={4} sx={{ py: 3, justifyContent: 'space-between', justifyItems: 'center', }}>
                <TextField
                    startIcon='Search'
                    variant='outlined'
                    placeholder='Search fields'
                    onValueChange={event => setFieldSearchTerm(event.target.value)}
                    sx={{ flexGrow: 1 }}
                />
            </Grid>

            <MessageMappingDataGrid
                tableName={selectedTableName}
                mode={mode}
                quickFilterValue={fieldSearchTerm}
                initialSelectedFields={initialSelectedFields}
                mappableTableResult={mappableTableResult}
                isLoading={isLoading}
            />
        </>
    );
};
