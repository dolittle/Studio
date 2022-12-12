// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';

import { GridRowModel, GridColDef, GridRowModesModel, GridRowModes } from '@mui/x-data-grid-pro';

import { Box, Typography } from '@mui/material';
import { AddCircle, DeleteRounded, DownloadRounded, ArrowDropDown } from '@mui/icons-material';

import { Accordion } from '@dolittle/design-system/atoms/Accordion/Accordion';
import { Button } from '@dolittle/design-system/atoms/Button';
import { DataTablePro } from '@dolittle/design-system/atoms/DataTablePro/DataTablePro';

import { getEnvironmentVariables, InputEnvironmentVariable, updateEnvironmentVariables } from '../../../../api/api';

interface EnvironmentVariableTableRow extends InputEnvironmentVariable {
    id?: string;
};

type EnvironmentVariablesProps = {
    applicationId: string;
    environment: string;
    microserviceId: string;
};

export const EnvironmentVariablesSection = ({ applicationId, environment, microserviceId }: EnvironmentVariablesProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const [envVariableTableRows, setEnvVariableTableRows] = useState<EnvironmentVariableTableRow[]>([]);
    const [selectedRowIds, setSelectedRowIds] = useState<GridRowModel[]>([]);

    const [rowMode, setRowMode] = useState<GridRowModesModel>({});

    //  console.log(envVariableTableRows)

    const columns: GridColDef<EnvironmentVariableTableRow>[] = [
        {
            field: 'name',
            headerName: 'Name',
            width: 330,
            editable: true
        },
        {
            field: 'value',
            headerName: 'Value',
            width: 330,
            editable: true
        },
        {
            field: 'isSecret',
            headerName: 'Secret',
            type: 'singleSelect',
            valueOptions: [{ value: true, label: 'Yes' }, { value: false, label: 'No' }],
            editable: true,
            renderCell: ({ value }) => (
                <Box
                    sx={{
                        display: 'flex',
                        width: 1,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant='button'>{value ? 'Yes' : 'No'}</Typography>
                    <ArrowDropDown />
                </Box>
            ),
            width: 80
        }
    ];

    useEffect(() => {
        fetchAndUpdateEnvVariableList()
            .catch(console.error);
    }, []);

    const fetchAndUpdateEnvVariableList = async () => {
        const result = await getEnvironmentVariables(applicationId, environment, microserviceId);

        result.data ?
            createDataTableObj(result.data) :
            enqueueSnackbar('Could not fetch environment variables.', { variant: 'error' });
    };

    const createDataTableObj = (envVariables: InputEnvironmentVariable[]): void => {
        const rows = envVariables.map(envVariable => {
            return {
                id: envVariable.name,
                name: envVariable.name,
                value: envVariable.value,
                isSecret: envVariable.isSecret
            } as EnvironmentVariableTableRow;
        });

        setEnvVariableTableRows(rows);
    };

    const processRowUpdate = async (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };

        // TODO: Add row remove if some value is empty - change edit state?
        if (updatedRow.name === '' || updatedRow.value === '') {
            enqueueSnackbar('You cant have an empty name or value', { variant: 'error' });
            return;
        }

        if (envVariableTableRows.some(row => row.name === updatedRow.name && row.id !== updatedRow.id)) {
            enqueueSnackbar('You cant have duplicate names.', { variant: 'error' });
            return;
        }

        // TODO: Check if there are any changes before updating
        // if (JSON.stringify(envVariableTableRows) === JSON.stringify(updatedRow)) {
        //     enqueueSnackbar('No changes detected', { variant: 'info' });
        //     return;
        // }

        const updatedEnvVariable = envVariableTableRows.map(row => (row.id === newRow.id ? updatedRow : row));

        const result = await updateEnvironmentVariables(applicationId, environment, microserviceId, updatedEnvVariable);

        if (result) {
            setEnvVariableTableRows(updatedEnvVariable);
            enqueueSnackbar('Environment variable updated.');
        } else {
            enqueueSnackbar('Could not update environment variable.', { variant: 'error' });
        }

        return updatedRow;
    };

    const handleEnvVariableAdd = async () => {
        const randomId = crypto.randomUUID();

        const newEnvVariable = {
            id: randomId,
            name: '',
            value: '',
            isSecret: false,
            isNew: true
        };

        const updateChangedRows = [...envVariableTableRows, newEnvVariable];
        setEnvVariableTableRows(updateChangedRows);

        setRowMode(prevRowMode => ({
            ...prevRowMode,
            [randomId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    const handleEnvVariableDelete = async () => {
        const remainingEnvVariables = envVariableTableRows.filter(envVariable => {
            return !selectedRowIds.includes(envVariable.id);
        });

        const result = await updateEnvironmentVariables(applicationId, environment, microserviceId, remainingEnvVariables);

        if (result) {
            // Show snackbar for every deleted env variable if 'result' is true.
            envVariableTableRows.filter(envVariable => {
                if (selectedRowIds.includes(envVariable.id)) {
                    enqueueSnackbar(`'${envVariable.name}' variable has been deleted.`);
                }
            });

            setEnvVariableTableRows(remainingEnvVariables);
            // TODO: Open info box that the microservice needs to be restarted.
        } else {
            enqueueSnackbar('File not deleted. Please try again.', { variant: 'error' });
        }
    };

    return (
        <>
            <Accordion
                id='environment-variables'
                title='Environment variables'
                defaultExpanded
            >
                <Box sx={{ mb: 2.875, button: { 'mr': 6.25, '&:last-of-type': { mr: 0 } } }}>
                    <Button
                        variant='text'
                        label='Add Variable'
                        startWithIcon={<AddCircle />}
                        onClick={handleEnvVariableAdd}
                    />
                    <Button
                        variant='text'
                        label='Delete Variable(s)'
                        disabled={!selectedRowIds.length}
                        startWithIcon={<DeleteRounded />}
                        onClick={handleEnvVariableDelete}
                    />
                    <Button variant='text' label='Download secret env-variables yaml' startWithIcon={<DownloadRounded />} />
                    <Button variant='text' label='Download env-variables yaml' startWithIcon={<DownloadRounded />} />
                </Box>

                <DataTablePro
                    rows={envVariableTableRows}
                    columns={columns}
                    editMode='row'
                    isRowSelectCheckbox
                    selectedRows={selectedRowIds}
                    handleSelectedRows={setSelectedRowIds}
                    rowModeStatus={rowMode}
                    handleRowModeState={newModel => setRowMode(newModel)}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={error => console.log(error)}
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Accordion>
        </>
    );
};
