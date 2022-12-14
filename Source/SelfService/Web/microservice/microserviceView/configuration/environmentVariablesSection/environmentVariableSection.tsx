// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';

import { GridRowModel, GridColDef, GridRowId, GridRowModesModel, GridRowModes } from '@mui/x-data-grid-pro';

import { Box } from '@mui/material';
import { AddCircle, DeleteRounded, DownloadRounded, ArrowDropDown } from '@mui/icons-material';

import { Accordion } from '@dolittle/design-system/atoms/Accordion/Accordion';
import { Button } from '@dolittle/design-system/atoms/Button';
import { DataTablePro } from '@dolittle/design-system/atoms/DataTablePro/DataTablePro';

import { getEnvironmentVariables, getServerUrlPrefix, InputEnvironmentVariable, updateEnvironmentVariables } from '../../../../api/api';

import { EmptyDataTable } from '../emptyDataTable';

interface EnvironmentVariableTableRow extends InputEnvironmentVariable {
    id: GridRowId;
    isNew: boolean;
};

type EnvironmentVariablesProps = {
    applicationId: string;
    environment: string;
    microserviceName: string;
    microserviceId: string;
};

export const EnvironmentVariablesSection = ({ applicationId, environment, microserviceName, microserviceId }: EnvironmentVariablesProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const [envVariableTableRows, setEnvVariableTableRows] = useState<EnvironmentVariableTableRow[]>([]);
    const [selectedRowIds, setSelectedRowIds] = useState<GridRowModel[]>([]);
    const [rowMode, setRowMode] = useState<GridRowModesModel>({});
    const [disableAddButton, setDisableAddButton] = useState(false);

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
                <Button
                    variant='text'
                    label={value ? 'Yes' : 'No'}
                    sx={{ width: 1, color: 'text.primary' }}
                    endWithIcon={<ArrowDropDown />}
                />
            ),
            width: 90
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

    const validateEnvVariable = (envVariable: EnvironmentVariableTableRow): boolean => {
        if (envVariable.name === '' || envVariable.value === '') {
            enqueueSnackbar('You cant have an empty name or value.', { variant: 'error' });
            return false;
        }

        if (envVariableTableRows.some(row => row.name === envVariable.name && row.id !== envVariable.id)) {
            enqueueSnackbar('You cant have duplicate names.', { variant: 'error' });
            return false;
        }

        return true;
    };

    const handleInvalidValues = (id: GridRowId) => {
        setRowMode({
            ...rowMode,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = envVariableTableRows.find(row => row.id === id);

        if (editedRow!.isNew) {
            setEnvVariableTableRows(envVariableTableRows.filter(row => row.id !== id));
        }

        // TODO: Check if there are any changes before updating
        // if (JSON.stringify(envVariableTableRows) === JSON.stringify(updatedRow)) {
        //     enqueueSnackbar('No changes detected', { variant: 'info' });
        //     return;
        // }
    };

    const processRowUpdate = async (newRow: GridRowModel) => {
        setDisableAddButton(false);

        const updatedRow = { ...newRow, isNew: false };

        if (!validateEnvVariable(updatedRow)) {
            handleInvalidValues(updatedRow.id);
            return;
        }

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

    const handleEnvVariableAdd = () => {
        setDisableAddButton(true);

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

    // TODO: This is reused. consider moving
    const configMapPrefix = `${environment.toLowerCase()}-${microserviceName.toLowerCase()}`;

    const handleSecretEnvVariableDownload = () => {
        const secretName = `${configMapPrefix}-secret-env-variables`;
        const href = `${getServerUrlPrefix()}/live/application/${applicationId}/secret/${secretName}?download=1&fileType=yaml`;
        enqueueSnackbar(`'${secretName}.yaml' has been downloaded.`);
        window.open(href, '_blank');
    };

    const handleEnvVariableDownload = () => {
        const configMapName = `${configMapPrefix}-env-variables`;
        const href = `${getServerUrlPrefix()}/live/application/${applicationId}/configmap/${configMapName}?download=1&fileType=yaml`;
        enqueueSnackbar(`'${configMapName}.yaml' has been downloaded.`);
        window.open(href, '_blank');
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
                        disabled={disableAddButton}
                        onClick={handleEnvVariableAdd}
                    />
                    <Button
                        variant='text'
                        label='Delete Variable(s)'
                        disabled={!selectedRowIds.length}
                        startWithIcon={<DeleteRounded />}
                        onClick={handleEnvVariableDelete}
                    />
                    <Button
                        variant='text'
                        label='Download secret env-variables yaml'
                        startWithIcon={<DownloadRounded />}
                        onClick={handleSecretEnvVariableDownload}
                    />
                    <Button
                        variant='text'
                        label='Download env-variables yaml'
                        startWithIcon={<DownloadRounded />}
                        onClick={handleEnvVariableDownload}
                    />
                </Box>

                {envVariableTableRows.length > 0 ?
                    <DataTablePro
                        rows={envVariableTableRows}
                        columns={columns}
                        editMode='row'
                        isRowCheckbox
                        selectedRows={selectedRowIds}
                        onSelectedRowsChange={setSelectedRowIds}
                        rowModeStatus={rowMode}
                        handleRowModeState={newModel => setRowMode(newModel)}
                        processRowUpdate={processRowUpdate}
                        onProcessRowUpdateError={error => console.log(error)}
                        experimentalFeatures={{ newEditingApi: true }}
                        sx={{ mb: 6 }}
                    /> :
                    <EmptyDataTable
                        title='No environment variables yet...'
                        description={`To add your first environment variable, select 'add variable'. Provide a name, value and set its secrecy.`}
                        buttonText='Add Variable'
                        handleOnClick={handleEnvVariableAdd} // TODO: Throws error when clicked
                        sx={{ mb: 6 }}
                    />
                }
            </Accordion>
        </>
    );
};
