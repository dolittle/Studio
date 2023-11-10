// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';

import { Box } from '@mui/material';
import { GridRowModesModel, GridRowModes, GridRowModel } from '@mui/x-data-grid-pro';

import { Accordion, Button } from '@dolittle/design-system';

import {
    getEnvironmentVariables,
    getServerUrlPrefix,
    InputEnvironmentVariable,
    MicroserviceObject,
    updateEnvironmentVariables,
} from '../../../../../../apis/solutions/api';

import { EmptyDataTable } from '../../../../components/emptyDataTable';
import { DataGrid, EnvironmentVariableTableRowParams } from './DataGrid';

const styles = {
    buttonWrapper: {
        mb: 1.5,
        button: {
            'mr': 2.5,
            'mb': 1,
            '&:last-of-type': { mr: 0 },
        },
    },
};

export type EnvironmentVariableIndexProps = {
    applicationId: string;
    currentMicroservice: MicroserviceObject;
};

export const EnvironmentVariableIndex = ({ applicationId, currentMicroservice }: EnvironmentVariableIndexProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const [dataGridRows, setDataGridRows] = useState<EnvironmentVariableTableRowParams[]>([]);
    const [selectedRowIds, setSelectedRowIds] = useState<GridRowModel[]>([]);
    const [rowMode, setRowMode] = useState<GridRowModesModel>({});
    const [disableAddButton, setDisableAddButton] = useState(false);

    useEffect(() => {
        fetchAndUpdateEnvVariableList();
    }, []);

    const fetchAndUpdateEnvVariableList = async () => {
        try {
            const result = await getEnvironmentVariables(applicationId, currentMicroservice.environment, currentMicroservice.id);
            createDataTableObj(result.data);
        } catch (error) {
            enqueueSnackbar(`Could not fetch environment variables. ${error}`, { variant: 'error' });
        }
    };

    const createDataTableObj = (envVariables: InputEnvironmentVariable[]): void => {
        const rows = envVariables.map(envVariable => {
            return {
                id: envVariable.name,
                name: envVariable.name,
                value: envVariable.value,
                isSecret: envVariable.isSecret
            } as EnvironmentVariableTableRowParams;
        });

        setDataGridRows(rows);
    };

    const handleEnvVariableAdd = () => {
        setDisableAddButton(true);

        // Generate a random id just for the new row.
        const temporaryId = Math.random().toString(16).slice(2);

        const newEnvVariable = {
            id: temporaryId,
            name: '',
            value: '',
            isSecret: false,
            isNew: true,
        };

        const updateChangedRows = [...dataGridRows, newEnvVariable];
        setDataGridRows(updateChangedRows);

        setRowMode(prevRowMode => ({
            ...prevRowMode,
            [temporaryId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    const handleEnvVariableDelete = async () => {
        const remainingEnvVariables = dataGridRows.filter(envVariable => !selectedRowIds.includes(envVariable.id));

        const result = await updateEnvironmentVariables(applicationId, currentMicroservice.environment, currentMicroservice.id, remainingEnvVariables);

        if (result) {
            dataGridRows.filter(envVariable => {
                if (selectedRowIds.includes(envVariable.id)) {
                    enqueueSnackbar(`'${envVariable.name}' variable has been deleted.`);
                }
            });

            setDataGridRows(remainingEnvVariables);
        } else {
            enqueueSnackbar('File not deleted. Please try again.', { variant: 'error' });
        }
    };

    // TODO: This is reused. consider moving
    const configMapPrefix = `${currentMicroservice.environment.toLowerCase()}-${currentMicroservice.name.toLowerCase()}`;

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

    const noEnvVariables = dataGridRows.length === 0;
    const noSecretEnvVariables = dataGridRows.filter(envVariable => envVariable.isSecret).length === 0;
    const noPublicEnvVariables = dataGridRows.filter(envVariable => !envVariable.isSecret).length === 0;

    return (
        <>
            <Accordion id='environment-variables' title='Environment Variables' defaultExpanded>
                <Box sx={styles.buttonWrapper}>
                    <Button
                        label='Add new variable row'
                        disabled={disableAddButton}
                        startWithIcon='AddCircle'
                        onClick={handleEnvVariableAdd}
                    />
                    <Button
                        label='Delete Variable(s)'
                        disabled={!selectedRowIds.length || noEnvVariables}
                        startWithIcon='DeleteRounded'
                        onClick={handleEnvVariableDelete}
                    />
                    <Button
                        label='Download secret env-variables yaml'
                        disabled={noSecretEnvVariables}
                        startWithIcon='DownloadRounded'
                        onClick={handleSecretEnvVariableDownload}
                    />
                    <Button
                        label='Download env-variables yaml'
                        disabled={noPublicEnvVariables}
                        startWithIcon='DownloadRounded'
                        onClick={handleEnvVariableDownload}
                    />
                </Box>

                {noEnvVariables
                    ? <EmptyDataTable
                        title='No environment variables yet...'
                        description={`To add your first environment variable, select 'add variable'. Provide a name, value and set its secrecy.`}
                        label='Add Variable'
                        handleOnClick={handleEnvVariableAdd}
                    />
                    : <DataGrid
                        applicationId={applicationId}
                        microservice={currentMicroservice}
                        rows={dataGridRows}
                        setRows={setDataGridRows}
                        selectedRowIds={selectedRowIds}
                        onSelectRowIds={setSelectedRowIds}
                        rowMode={rowMode}
                        onRowChange={setRowMode}
                        onRowUpdate={() => setDisableAddButton(false)}
                    />
                }
            </Accordion>
        </>
    );
};
