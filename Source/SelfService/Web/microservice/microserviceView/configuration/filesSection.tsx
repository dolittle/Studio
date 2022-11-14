// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useRef, useState } from 'react';

import { useSnackbar } from 'notistack';

import { DataGridPro } from '@mui/x-data-grid-pro';

import { Box, Paper } from '@mui/material';
import { AddCircle, DeleteRounded, DownloadRounded } from '@mui/icons-material';

import { AlertBox } from '@dolittle/design-system/atoms/AlertBox/AlertBox';
import { Accordion } from '@dolittle/design-system/atoms/Accordion/Accordion';
import { Button } from '@dolittle/design-system/atoms/Button';

import { FileUploadForm, FileUploadFormRef } from '../../base/components/fileUploadForm';

import { getConfigFilesNamesList, updateConfigFiles } from '../../../api/api';

import { RestartMicroserviceDialog } from '../RestartMicroserviceDialog';

const MAX_CONFIGMAP_ENTRY_SIZE = 3145728;

const columns = [
    { field: 'path', headerName: 'Path', width: 200 },
    { field: 'fileName', headerName: 'Name', width: 130 },
    { field: 'dateAdded', headerName: 'Date Added', width: 200 },
    { field: 'addedBy', headerName: 'Added By', width: 200 },
];

type ConfigFilesTableRow = {
    id: string;
    fileName: string;
    path: string;
    dateAdded: string;
    addedBy: string;
};

type FilesSectionProps = {
    applicationId: string;
    environment: string;
    microserviceId: string;
};

export const FilesSection = ({ applicationId, environment, microserviceId }: FilesSectionProps) => {
    const fileUploadRef = useRef<FileUploadFormRef>(null);
    const { enqueueSnackbar } = useSnackbar();

    const [filesPanelExpanded, setFilesPanelExpanded] = useState(true);
    const [dataTableRows, setDataTableRows] = useState<ConfigFilesTableRow[]>([]);
    const [dataRowSelected, setDataRowSelected] = useState(true);
    const [restartMicroserviceInfoBoxOpen, setRestartMicroserviceInfoBoxOpen] = useState(false);
    const [restartDialogIsOpen, setRestartDialogIsOpen] = useState(false);

    useEffect(() => {
        fetchConfigFilesNamesList();
    }, []);

    const fetchConfigFilesNamesList = async (): Promise<void> => {
        const result = await getConfigFilesNamesList(applicationId, environment, microserviceId)
            .then(res => res.data)
            .catch(error => {
                enqueueSnackbar(`Could not fetch config files ${error.message}`, { variant: 'error' });
            });

        createDataTableObj(result ?? []);
    };

    const createDataTableObj = (file: string[]): void => {
        const rows = file.map(name => {
            return {
                id: name,
                fileName: name,
                path: '/app/data/',
                dateAdded: 'N/A',
                addedBy: 'N/A'
            } as ConfigFilesTableRow;
        });

        setDataTableRows(rows);
    };

    const handleFileSelect = (file: File): void => {
        if (validateFileSize(file)) {
            fileUploadRef.current?.confirmSelectedFile();
        }
    };

    const validateFileSize = (file: File): boolean => {
        if (file.size > MAX_CONFIGMAP_ENTRY_SIZE) {
            // Replace with design system Dialog
            enqueueSnackbar(
                `file cannot be larger than ${MAX_CONFIGMAP_ENTRY_SIZE} bytes. Please select another file`,
                { variant: 'error', persist: false }
            );
            return false;
        }

        return true;
    };

    const saveConfigFile = async (formData: FormData) => {
        await updateConfigFiles(applicationId, environment, microserviceId, formData)
            .then(res => {
                enqueueSnackbar(`${'filename'} successfully added.`, { variant: 'info' });
                fetchConfigFilesNamesList();
                setRestartMicroserviceInfoBoxOpen(true);
            })
            .catch(error => {
                enqueueSnackbar(`Could not save config file. ${error.message}`, { variant: 'error' });
            });
    };

    const handleMicroserviceInfoBoxClose = () => {
        setRestartDialogIsOpen(true);
        setRestartMicroserviceInfoBoxOpen(false);
    };

    return (
        <>
            <RestartMicroserviceDialog
                applicationId={applicationId}
                environment={environment}
                microserviceId={microserviceId}
                open={restartDialogIsOpen}
                setOpen={setRestartDialogIsOpen}
                handleSuccess={() => window.location.reload()}
            />

            <Accordion
                id='configuration-files'
                expanded={filesPanelExpanded}
                title='Configuration Files'
                onChange={() => setFilesPanelExpanded(!filesPanelExpanded)}
            >
                <Box sx={{ mb: 2.875, button: { 'mr': 6.25, '&:last-of-type': { mr: 0 } } }}>
                    <Button
                        variant='text'
                        label='Add File(s)'
                        startWithIcon={<AddCircle />}
                        onClick={() => fileUploadRef.current?.promptForFile()}
                    />
                    <Button
                        variant='text'
                        label='Delete File(s)'
                        startWithIcon={<DeleteRounded />}
                    //onClick={() => fileUploadRef.current?.promptForFile()}
                    />
                    <Button
                        variant='text'
                        label='Download File(s)'
                        startWithIcon={<DownloadRounded />}
                    //onClick={() => fileUploadRef.current?.promptForFile()}
                    />
                </Box>

                <FileUploadForm ref={fileUploadRef} onFileAdded={saveConfigFile} onFileSelected={handleFileSelect} />

                <AlertBox
                    severity='info'
                    title='Restart Microservice'
                    message='New uploads will be added as soon as ExampleMicroservice restarts.
                              It will restart automatically in a few minutes or you can manually restart it now.'
                    actionText='Restart Microservice'
                    isOpen={restartMicroserviceInfoBoxOpen}
                    closeAction={handleMicroserviceInfoBoxClose}
                    sx={{ width: 1, mb: 2 }}
                />

                <Box component={Paper} sx={{ width: 1, height: 1 }}>
                    <DataGridPro
                        rows={dataTableRows}
                        columns={columns}
                        checkboxSelection={dataRowSelected}
                        autoHeight={true}
                        headerHeight={46}
                        disableColumnMenu
                        hideFooter
                    />
                </Box>
            </Accordion>
        </>
    );
};
