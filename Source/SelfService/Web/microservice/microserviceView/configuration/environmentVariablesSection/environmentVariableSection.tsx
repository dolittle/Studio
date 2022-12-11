// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';

import { GridRowModel, GridColDef, GridRenderCellParams, GridApi, GridRenderEditCellParams, useGridApiContext, useGridApiRef } from '@mui/x-data-grid-pro';

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
    const apiRef = useGridApiRef();

    const [loaded, setLoaded] = useState(false);
    //const [originalData, setOriginalData] = useState([] as InputEnvironmentVariable[]);

    const [activeCellAfterNewRowAdded, setActiveCellAfterNewRowAdded] = useState('');
    const [envVariableTableRows, setEnvVariableTableRows] = useState<EnvironmentVariableTableRow[]>([]);
    const [selectedRowIds, setSelectedRowIds] = useState<GridRowModel[]>([]);

    console.log(envVariableTableRows)

    // 4. How to use the api context to get the gridApi?
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

    const columns: GridColDef<EnvironmentVariableTableRow>[] = [
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

    useEffect(() => {
        if (activeCellAfterNewRowAdded) {
            apiRef.current.startCellEditMode({ id: activeCellAfterNewRowAdded, field: 'name' });
        }
    }, [activeCellAfterNewRowAdded]);

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

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow };

        const updateChangedRows = envVariableTableRows.map(item => {
            const currentEnvVariables = { ...item };

            if (currentEnvVariables.id === updatedRow.id) {
                currentEnvVariables.id = `${updatedRow.name}`;
                currentEnvVariables.name = updatedRow.name;
                currentEnvVariables.value = updatedRow.value;

                // Can we do this in here?
                //currentEnvVariables.isSecret = updatedRow.isSecret;
            }

            return currentEnvVariables;
        });

        // Check that changed rows are not the same as original rows

        setEnvVariableTableRows(updateChangedRows);
        // 1. Do we really run this after every change? I thing that we need 'edit' and 'save' buttons.
        // Sample: https://codesandbox.io/s/0kvl7d?file=/demo.tsx
        updateEnvVariables(updateChangedRows);
        return updatedRow;
    };

    const updateEnvVariables = async (updateChangedRows) => {
        const result = await updateEnvironmentVariables(applicationId, environment, microserviceId, updateChangedRows);

        if (result) {
            enqueueSnackbar('Environment variables successfully added.');
            // Open info box that the microservice needs to be restarted.

            //fetchAndUpdateEnvVariableList();
            //setRestartInfoBoxIsOpen(true);
        } else {
            enqueueSnackbar('File not added. Please try again.', { variant: 'error' });
        }
    };

    const handleRowAdd = () => {
        const randomId = crypto.randomUUID();

        const newEnvVariable = {
            id: `HEADER_SECRET_${randomId}`,
            name: `HEADER_SECRET_${randomId}`,
            value: 'Variable_value',
            isSecret: false
        };

        setEnvVariableTableRows([...envVariableTableRows, newEnvVariable]);
        setActiveCellAfterNewRowAdded(newEnvVariable.id);
    };

    const handleEnvVariableDelete = async () => {
        const remainingEnvVariables = envVariableTableRows.filter(envVariable => {
            return !selectedRowIds.includes(envVariable.id);
        });

        const result = await updateEnvironmentVariables(applicationId, environment, microserviceId, remainingEnvVariables);

        if (result) {
            // Show snackbar for every deleted row if 'result' is true.
            envVariableTableRows.filter(envVariable => {
                if (selectedRowIds.includes(envVariable.id)) {
                    enqueueSnackbar(`'${envVariable.name}' variable has been deleted.`);
                }
            });

            setEnvVariableTableRows(remainingEnvVariables);
            // Open info box that the microservice needs to be restarted.
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
                        onClick={handleRowAdd}
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
                    isRowSelectable
                    selectionModel={selectedRowIds}
                    handleSelectionModelChange={setSelectedRowIds}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={error => enqueueSnackbar(error, { variant: 'error' })}
                    experimentalFeatures={{ newEditingApi: true }}
                    apiRef={apiRef}
                />
            </Accordion>
        </>
    );
};
