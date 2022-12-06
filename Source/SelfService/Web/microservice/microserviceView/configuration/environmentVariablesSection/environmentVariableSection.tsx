// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { GridRowModel } from '@mui/x-data-grid-pro';

import { Box } from '@mui/material';
import { AddCircle, DeleteRounded, DownloadRounded } from '@mui/icons-material';

import { Accordion } from '@dolittle/design-system/atoms/Accordion/Accordion';
import { Button } from '@dolittle/design-system/atoms/Button';
import { DataTablePro } from '@dolittle/design-system/atoms/DataTablePro/DataTablePro';

import { getEnvironmentVariables, InputEnvironmentVariable, updateEnvironmentVariables } from '../../../../api/api';

const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'value', headerName: 'Value', width: 200 },
    { field: 'isSecret', headerName: 'Secret', width: 200, renderCell: (params: any) => params.value ? 'Yes' : 'No' }
];

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

    return (
        <>
            <Accordion
                id='environment-variables'
                title='Environment variables'
                defaultExpanded
            >
                <Box sx={{ mb: 2.875, button: { 'mr': 6.25, '&:last-of-type': { mr: 0 } } }}>
                    <Button variant='text' label='Add Variable' startWithIcon={<AddCircle />} />
                    <Button variant='text' label='Delete Variable' startWithIcon={<DeleteRounded />} />
                    <Button variant='text' label='Download secret env-variables yaml' startWithIcon={<DownloadRounded />} />
                    <Button variant='text' label='Download env-variables yaml' startWithIcon={<DownloadRounded />} />
                </Box>

                <DataTablePro
                    rows={envVariableTableRows}
                    columns={columns}
                    isRowSelectable
                    getRowId={(row: GridRowModel) => row.name}
                />
            </Accordion>
        </>
    );
};
