// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';

import { GridRowModel, GridColDef, GridRenderCellParams, GridRenderEditCellParams, useGridApiContext } from '@mui/x-data-grid-pro';

import { Box } from '@mui/material';
import { AddCircle, DeleteRounded, DownloadRounded } from '@mui/icons-material';

import { Accordion } from '@dolittle/design-system/atoms/Accordion/Accordion';
import { Button } from '@dolittle/design-system/atoms/Button';
import { DataTablePro } from '@dolittle/design-system/atoms/DataTablePro/DataTablePro';
import { Select } from '@dolittle/design-system/atoms/Forms/Select';

import { getEnvironmentVariables, InputEnvironmentVariable, updateEnvironmentVariables } from '../../../../api/api';

interface EnvironmentVariableTableRow extends InputEnvironmentVariable {
    id: string;
};

type EnvironmentVariablesProps = {
    applicationId: string;
    environment: string;
    microserviceId: string;
};

export const EnvironmentVariablesSection = ({ applicationId, environment, microserviceId }: EnvironmentVariablesProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const [loaded, setLoaded] = useState(false);
    const [currentData, setCurrentData] = useState([] as InputEnvironmentVariable[]);
    const [originalData, setOriginalData] = useState([] as InputEnvironmentVariable[]);
    const [envVariableTableRows, setEnvVariableTableRows] = useState<EnvironmentVariableTableRow[]>([]);

    console.log(envVariableTableRows)

    const SelectCell = (params: GridRenderCellParams) => {
        //: React.ChangeEvent<HTMLSelectElement>
        const handleChange = (event) => {
            const updateRowIsSecret = envVariableTableRows.map(item => {
                const currentEnvVariables = { ...item };

                currentEnvVariables.id === params.id ?
                    currentEnvVariables.isSecret = event.target.value === 'Yes' :
                    currentEnvVariables.isSecret = currentEnvVariables.isSecret;

                return currentEnvVariables;
            });

            setEnvVariableTableRows(updateRowIsSecret);
        };

        return (
            <Select
                options={[{ value: 'Yes' }, { value: 'No' }]}
                value={params.value ? 'Yes' : 'No'}
                onChange={handleChange}
            />
        );
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            width: 330,
            flex: 1,
            editable: true
        },
        {
            field: 'value',
            headerName: 'Value',
            width: 330,
            flex: 1,
            editable: true
        },
        {
            field: 'isSecret',
            headerName: 'Secret',
            width: 330,
            flex: 1,
            renderCell: (params) => SelectCell(params)
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
                id: `${envVariable.name}-${envVariable.value}`,
                name: envVariable.name,
                value: envVariable.value,
                isSecret: envVariable.isSecret
            } as EnvironmentVariableTableRow;
        });

        setEnvVariableTableRows(rows);
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow };

        const updateChangedRows = envVariableTableRows.map(item => {
            const currentEnvVariables = { ...item };

            if (currentEnvVariables.id === updatedRow.id) {
                currentEnvVariables.id = `${updatedRow.name}-${updatedRow.value}`;
                currentEnvVariables.name = updatedRow.name;
                currentEnvVariables.value = updatedRow.value;

                // Can we do this in here?
                //currentEnvVariables.isSecret = updatedRow.isSecret;
            }

            return currentEnvVariables;
        });

        setEnvVariableTableRows(updateChangedRows);
        // Do we really run this after every change? I thing that we need 'edit' and 'save' buttons.
        saveEnvVariables(updateChangedRows);
        return updatedRow;
    };

    const handleRowAdd = async () => {
        const tableRowNumber = envVariableTableRows.length + 1;

        const newEnvVariable = {
            id: `HEADER_SECRET-${tableRowNumber}-Variable_value-${tableRowNumber}`,
            name: `HEADER_SECRET-${tableRowNumber}`,
            value: `Variable_value-${tableRowNumber}`,
            isSecret: false
        };

        setEnvVariableTableRows([...envVariableTableRows, newEnvVariable]);

        // Add active 'edit' cell
        // After edit is done (editMode = false), we need to save the changes.
    };

    const saveEnvVariables = async (updateChangedRows) => {
        const result = await updateEnvironmentVariables(applicationId, environment, microserviceId, updateChangedRows);

        if (result) {
            // Naming - update or save?
            enqueueSnackbar('Environment variables successfully added.');

            // We need to save the changes to the backend.
            // Open info box that the microservice needs to be restarted.
            // When to refetch the data?

            //fetchAndUpdateEnvVariableList();
            //setRestartInfoBoxIsOpen(true);
        } else {
            enqueueSnackbar('File not added. Please try again.', { variant: 'error' });
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
                        onClick={handleRowAdd}
                    />
                    <Button variant='text' label='Delete Variable' startWithIcon={<DeleteRounded />} />
                    <Button variant='text' label='Download secret env-variables yaml' startWithIcon={<DownloadRounded />} />
                    <Button variant='text' label='Download env-variables yaml' startWithIcon={<DownloadRounded />} />
                </Box>

                <DataTablePro
                    rows={envVariableTableRows}
                    columns={columns}
                    isRowSelectable
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={error => enqueueSnackbar(error, { variant: 'error' })}
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Accordion>
        </>
    );
};
