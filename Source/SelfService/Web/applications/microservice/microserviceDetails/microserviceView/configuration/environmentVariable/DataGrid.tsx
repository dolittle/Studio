// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useSnackbar } from 'notistack';

import { DataGridPro, GridRowId, GridRowModesModel, GridRowModes, GridRowModel } from '@mui/x-data-grid-pro';

import { dataGridDefaultProps, DataGridWrapper } from '@dolittle/design-system';

import { InputEnvironmentVariable, updateEnvironmentVariables } from '../../../../../../apis/solutions/api';

import { RestartInfoBox } from '../../../../components/restartInfoBox';
import { dataGridColumns } from './DataGridColumns';

const styles = {
    // Hack for secret cell active state. Otherwise size is going to be different.
    '& .MuiOutlinedInput-root': {
        '& .MuiSelect-select': { p: '5px 15px' },
        '& fieldset': { border: 'none' },
    },
};

export type EnvironmentVariableTableRowParams = InputEnvironmentVariable & {
    id: GridRowId;
    isNew: boolean;
};

export type DataGridProps = {
    applicationId: string;
    microservice: any;
    rows: EnvironmentVariableTableRowParams[];
    setRows: (rows: EnvironmentVariableTableRowParams[]) => void;
    selectedRowIds: GridRowModel[];
    onSelectRowIds: (ids: GridRowModel[]) => void;
    rowMode: GridRowModesModel;
    onRowChange: (row: GridRowModesModel) => void;
    onRowUpdate: (isUpdating: boolean) => void;
};

export const DataGrid = ({ applicationId, microservice, rows, setRows, selectedRowIds, onSelectRowIds, rowMode, onRowChange, onRowUpdate }: DataGridProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const [restartInfoBoxIsOpen, setRestartInfoBoxIsOpen] = useState(false);

    const validateEnvVariable = (envVariable: EnvironmentVariableTableRowParams): boolean => {
        if (envVariable.name.trim() === '' || envVariable.value.trim() === '') {
            enqueueSnackbar('You cant have an empty name or value.', { variant: 'error' });
            return false;
        }

        if (rows.some(row => row.name === envVariable.name && row.id !== envVariable.id)) {
            enqueueSnackbar('You cant have duplicate names.', { variant: 'error' });
            return false;
        }

        return true;
    };

    const ignoreRowModifications = (id: GridRowId) => {
        onRowChange({
            ...rowMode,
            [id]: { mode: GridRowModes.View, ignoreModifications: true }
        });

        const editedRow = rows.find(row => row.id === id);

        if (editedRow!.isNew) {
            setRows(rows.filter(row => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow: GridRowModel) => {
        onRowUpdate(false);

        const updatedRow = { ...newRow, isNew: false };
        const oldRow = rows.find(row => row.id === updatedRow.id);

        if (oldRow?.name === updatedRow.name && oldRow!.value === updatedRow.value && oldRow!.isSecret === updatedRow.isSecret) {
            ignoreRowModifications(updatedRow.id);
            return;
        }

        if (!validateEnvVariable(updatedRow)) {
            ignoreRowModifications(updatedRow.id);
            return;
        }

        const updatedEnvVariable = rows.map(row => (row.id === newRow.id ? updatedRow : row));

        const result = await updateEnvironmentVariables(applicationId, microservice.environment, microservice.id, updatedEnvVariable);

        if (result) {
            setRows(updatedEnvVariable);
            setRestartInfoBoxIsOpen(true);
            enqueueSnackbar(`Environment variable ${newRow.isNew ? 'added' : 'updated'}.`);
        } else {
            enqueueSnackbar('Could not update environment variable.', { variant: 'error' });
        }

        return updatedRow;
    };

    return (
        <>
            <RestartInfoBox microserviceName={microservice.name} isOpen={restartInfoBoxIsOpen} onDismissed={() => setRestartInfoBoxIsOpen(false)} />

            <DataGridWrapper>
                <DataGridPro
                    {...dataGridDefaultProps}
                    rows={rows}
                    columns={dataGridColumns}
                    checkboxSelection
                    selectionModel={selectedRowIds}
                    onSelectionModelChange={onSelectRowIds}
                    editMode='row'
                    rowModesModel={rowMode}
                    onRowModesModelChange={onRowChange}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={error => console.log(error)}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    sx={styles}
                />
            </DataGridWrapper>
        </>
    );
};
