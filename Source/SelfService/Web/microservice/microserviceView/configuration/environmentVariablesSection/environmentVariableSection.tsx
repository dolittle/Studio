// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { GridRowModel, GridColDef, GridRenderCellParams, GridRenderEditCellParams, useGridApiContext } from '@mui/x-data-grid-pro';

import { Box } from '@mui/material';
import { AddCircle, DeleteRounded, DownloadRounded } from '@mui/icons-material';

import { Accordion } from '@dolittle/design-system/atoms/Accordion/Accordion';
import { Button } from '@dolittle/design-system/atoms/Button';
import { DataTablePro } from '@dolittle/design-system/atoms/DataTablePro/DataTablePro';
import { Select } from '@dolittle/design-system/atoms/Forms/Select';

import { getEnvironmentVariables, InputEnvironmentVariable, updateEnvironmentVariables } from '../../../../api/api';

type EnvironmentVariablesProps = {
    applicationId: string;
    environment: string;
    microserviceId: string;
};

export const EnvironmentVariablesSection = ({ applicationId, environment, microserviceId }: EnvironmentVariablesProps) => {
    const [loaded, setLoaded] = useState(false);
    const [currentData, setCurrentData] = useState([] as InputEnvironmentVariable[]);
    const [originalData, setOriginalData] = useState([] as InputEnvironmentVariable[]);
    const [envVariableTableRows, setEnvVariableTableRows] = useState<InputEnvironmentVariable[]>([]);

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
            editable: true,
            renderCell: (params: GridRenderCellParams) =>
                <Select
                    options={[{ value: 'Yes' }, { value: 'No' }]}
                    value={params.value ? 'Yes' : 'No'}
                    onChange={event => {
                        params.row.isSecret = event.target.value === 'Yes';
                        setEnvVariableTableRows([...envVariableTableRows]);
                    }}
                />
        }
    ];

    console.log(envVariableTableRows)

    useEffect(() => {
        Promise.all([
            getEnvironmentVariables(applicationId, environment, microserviceId)
        ]).then(values => {
            // Order by name to avoid random sort order
            //const data = values[0].data.sort((env1, env2) => env1.name > env2.name ? 1 : -1);
            // Spreading does not work
            // setCurrentData(JSON.parse(JSON.stringify(data)));
            // setOriginalData(JSON.parse(JSON.stringify(data)));

            setEnvVariableTableRows(values[0].data);
            setLoaded(true);
        });
    }, []);

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };

        //console.log(updatedRow)
        return updatedRow;
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
                        onClick={() => {
                            const newEnvVariable = {
                                name: '',
                                value: '',
                                isSecret: false
                            };
                            setEnvVariableTableRows([newEnvVariable, ...envVariableTableRows]);
                        }}
                    />
                    <Button variant='text' label='Delete Variable' startWithIcon={<DeleteRounded />} />
                    <Button variant='text' label='Download secret env-variables yaml' startWithIcon={<DownloadRounded />} />
                    <Button variant='text' label='Download env-variables yaml' startWithIcon={<DownloadRounded />} />
                </Box>

                <DataTablePro
                    rows={envVariableTableRows}
                    columns={columns}
                    isRowSelectable
                    getRowId={(row: GridRowModel) => row.name}
                    processRowUpdate={processRowUpdate}
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Accordion>
        </>
    );
};
