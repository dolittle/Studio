// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useRef, useState } from 'react';

import { useSnackbar } from 'notistack';

import { GridSelectionModel } from '@mui/x-data-grid-pro';

import { Box, Paper } from '@mui/material';
import { AddCircle, DeleteRounded, DownloadRounded } from '@mui/icons-material';

import { AlertBox } from '@dolittle/design-system/atoms/AlertBox/AlertBox';
import { Accordion } from '@dolittle/design-system/atoms/Accordion/Accordion';
import { Button } from '@dolittle/design-system/atoms/Button';

import { FileUploadForm, FileUploadFormRef } from './fileUploadForm';

import { getConfigFilesNamesList, getServerUrlPrefix, updateConfigFile, deleteConfigFile } from '../../../../api/api';

import { RestartMicroserviceDialog } from '../../RestartMicroserviceDialog';
import { DataTable, ConfigFilesTableRow } from './dataTable';
import { NoConfigFiles } from './NoConfigFiles';
import { DeleteConfigFileDialog, ValidateFileDialog } from './ConfirmDialogs';


const MAX_CONFIGMAP_ENTRY_SIZE = 3145728;

type FilesSectionProps = {
    applicationId: string;
    environment: string;
    microserviceName: string;
    microserviceId: string;
};

export const FilesSection = ({ applicationId, environment, microserviceName, microserviceId }: FilesSectionProps) => {
    const fileUploadRef = useRef<FileUploadFormRef>(null);
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();

    const [filesPanelExpanded, setFilesPanelExpanded] = useState(true);
    const [dataTableRows, setDataTableRows] = useState<ConfigFilesTableRow[]>([]);
    const [dataRowSelected, setDataRowSelected] = useState<GridSelectionModel>([]);
    const [restartMicroserviceInfoBoxOpen, setRestartMicroserviceInfoBoxOpen] = useState(false);
    const [restartMicroserviceDialogIsOpen, setRestartMicroserviceDialogIsOpen] = useState(false);
    const [deleteConfigFileDialogIsOpen, setDeleteConfigFileDialogIsOpen] = useState(false);
    const [validateFileDialogIsOpen, setValidateFileDialogIsOpen] = useState({ isOpen: false, file: [] as File[] });

    useEffect(() => {
        fetchConfigFileNamesList()
            .catch(console.error);
    }, []);

    const fetchConfigFileNamesList = async (): Promise<void> => {
        const result = await getConfigFilesNamesList(applicationId, environment, microserviceId);

        if (result.data) {
            createDataTableObj(result.data);
        } else {
            enqueueSnackbar('Could not fetch config files.', { variant: 'error' });
        };
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

    async function handleFileSelect(selected: File | FileList): Promise<void> {
        const files = selected instanceof FileList ? Array.from(selected) : [selected];

        for (const file of files) {
            if (validateFileSize(file) && validateFileChars(file)) {
                await saveConfigFile(file);
            };
        };
    };

    const validateFileSize = (file: File): boolean => {
        if (file.size > MAX_CONFIGMAP_ENTRY_SIZE) {
            setValidateFileDialogIsOpen(prev => ({ isOpen: true, file: [...prev.file, file] }));

            return false;
        };

        return true;
    };

    const validateFileChars = (file: File): boolean => {
        if ((/[^-._a-zA-Z0-9]+/).test(file.name)) {
            setValidateFileDialogIsOpen(prev => ({ isOpen: true, file: [...prev.file, file] }));

            return false;
        };

        return true;
    };

    const saveConfigFile = async (file: File): Promise<void> => {
        const formData = new FormData();
        formData.set('file', file);

        const result = await updateConfigFile(applicationId, environment, microserviceId, formData);

        if (result.success) {
            enqueueSnackbar(`'${file.name}' successfully added.`,
                {
                    variant: 'success',
                    action: () =>
                        <Button variant='text' label='Undo' onClick={async () => {
                            await deleteConfigFile(applicationId, environment, microserviceId, file.name);

                            fetchConfigFileNamesList();
                            setRestartMicroserviceInfoBoxOpen(false);
                            closeSnackbar();
                        }} />
                });

            fetchConfigFileNamesList();
            setRestartMicroserviceInfoBoxOpen(true);
        } else {
            enqueueSnackbar('File not added. Please try again.', { variant: 'error' });
        };
    };

    const handleConfigFileDelete = async (): Promise<void> => {
        for (const filename of dataRowSelected) {
            const fileName = filename.toString();
            const response = await deleteConfigFile(applicationId, environment, microserviceId, fileName);

            if (response) {
                enqueueSnackbar(`${fileName} deleted from configuration files.`, { variant: 'info' });
            } else {
                enqueueSnackbar(`${fileName} deletion failed.`, { variant: 'error' });
                setDeleteConfigFileDialogIsOpen(false);
                return;
            };
        };

        setDeleteConfigFileDialogIsOpen(false);
        fetchConfigFileNamesList();
    };

    // This is reused. consider moving
    const configMapPrefix = `${environment.toLowerCase()}-${microserviceName.toLowerCase()}`;

    // TODO: Should be able to download multiple selected files
    const handleConfigFileDownload = (): void => {
        const configMapName = `${configMapPrefix}-config-files`;
        const href = `${getServerUrlPrefix()}/live/application/${applicationId}/configmap/${configMapName}?download=1&fileType=yaml`;
        window.open(href, '_blank');

        enqueueSnackbar(`${configMapName} downloaded.`, { variant: 'info' });
    };

    const handleValidateFileDialogClose = (): void => {
        setValidateFileDialogIsOpen({ isOpen: false, file: [] });
    };

    const hasNoSelectedRows = dataRowSelected.length === 0;

    return (
        <>
            <RestartMicroserviceDialog
                applicationId={applicationId}
                environment={environment}
                microserviceId={microserviceId}
                open={restartMicroserviceDialogIsOpen}
                setOpen={() => setRestartMicroserviceDialogIsOpen(true)}
                handleSuccess={() => {
                    setRestartMicroserviceInfoBoxOpen(false);
                    window.location.reload();
                }}
            />

            <DeleteConfigFileDialog
                selectedDataRows={dataRowSelected}
                open={deleteConfigFileDialogIsOpen}
                setOpen={() => setDeleteConfigFileDialogIsOpen(false)}
                handleDelete={handleConfigFileDelete}
            />

            <ValidateFileDialog
                invalid={validateFileDialogIsOpen}
                open={validateFileDialogIsOpen.isOpen}
                setOpen={handleValidateFileDialogClose}
                handleValidate={() => {
                    fileUploadRef.current?.showPrompt();
                    handleValidateFileDialogClose();
                }}
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
                        onClick={() => fileUploadRef.current?.showPrompt()}
                    />
                    <Button
                        variant='text'
                        label='Delete File(s)'
                        disabled={hasNoSelectedRows || dataTableRows.length === 0}
                        startWithIcon={<DeleteRounded />}
                        onClick={() => setDeleteConfigFileDialogIsOpen(true)}
                    />

                    <Button
                        variant='text'
                        label={`Download File(s)`}
                        disabled={dataTableRows.length === 0}
                        startWithIcon={<DownloadRounded />}
                        onClick={handleConfigFileDownload}
                    />
                </Box>

                <FileUploadForm ref={fileUploadRef} onSelected={handleFileSelect} allowMultipleFiles />

                <AlertBox
                    severity='info'
                    title='Restart Microservice'
                    message={`New uploads will be added as soon as ${microserviceName} restarts.
                              It will restart automatically in a few minutes or you can manually restart it now.`}
                    actionText='Restart Microservice'
                    isOpen={restartMicroserviceInfoBoxOpen}
                    closeAction={() => setRestartMicroserviceDialogIsOpen(true)}
                    sx={{ width: 1, mb: 2 }}
                />

                <Box component={Paper} sx={{ width: 1, height: 1 }}>
                    {dataTableRows.length > 0 ?
                        <DataTable rows={dataTableRows} handleSelectionModelChange={setDataRowSelected} selectionModel={dataRowSelected} /> :
                        <NoConfigFiles handleOnClick={() => fileUploadRef.current?.showPrompt()} />
                    }
                </Box>
            </Accordion>
        </>
    );
};
