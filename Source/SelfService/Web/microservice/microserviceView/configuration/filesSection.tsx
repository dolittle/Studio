// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useRef, useState } from 'react';

import { useSnackbar } from 'notistack';

import { DataGridPro, GridSelectionModel } from '@mui/x-data-grid-pro';

import { Box, Paper, Typography } from '@mui/material';
import { AddCircle, DeleteRounded, DownloadRounded } from '@mui/icons-material';

import { AlertBox } from '@dolittle/design-system/atoms/AlertBox/AlertBox';
import { Accordion } from '@dolittle/design-system/atoms/Accordion/Accordion';
import { Button } from '@dolittle/design-system/atoms/Button';
import { ConfirmDialog } from '@dolittle/design-system/atoms/ConfirmDialog/ConfirmDialog';

import { FileUploadForm, FileUploadFormRef } from '../../base/components/fileUploadForm';

import { getConfigFilesNamesList, getServerUrlPrefix, updateConfigFile, deleteConfigFile } from '../../../api/api';

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
    const [fileSizeDialog, setFileSizeDialog] = useState({ isOpen: false, fileName: '' });

    useEffect(() => {
        fetchConfigFileNamesList();
    }, []);

    const fetchConfigFileNamesList = async (): Promise<void> => {
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

    async function handleFileSelect(selected: File | FileList): Promise<void> {
        let files: File[] = [];

        if (selected instanceof FileList) {
            files = Array.from(selected as FileList);
        } else {
            files.push(selected as File);
        }

        for (const file of files) {
            if (validateFileSize(file) && validateFileChars(file)) {
                await saveConfigFile(file);
            }
        }
    };

    const validateFileSize = (file: File): boolean => {
        if (file.size > MAX_CONFIGMAP_ENTRY_SIZE) {
            // Replace with design system Dialog
            enqueueSnackbar(
                `file cannot be larger than ${MAX_CONFIGMAP_ENTRY_SIZE} bytes. Please select another file`,
                { variant: 'error', persist: false }
            );

            setFileSizeDialog({ isOpen: true, fileName: file.name });
            return false;
        }

        return true;
    };

    const validateFileChars = (file: File): boolean => {
        if ((/[^-._a-zA-Z0-9]+/).test(file.name)) {
            enqueueSnackbar(`A valid config file name must consist of alphanumeric characters or '_  . -  ' .
                Regex used for validation is (/[^-._a-zA-Z0-9]+/) .`, { variant: 'error', persist: false });
            return false;
        }

        return true;
    };

    const saveConfigFile = async (file: File): Promise<void> => {
        const formData = new FormData();
        formData.set('file', file);

        const result = await updateConfigFile(applicationId, environment, microserviceId, formData);

        if (result.success) {
            const fileName = formData.get('file')
                ? (formData.get('file') as File).name
                : (formData.get('fileName') as string);

            enqueueSnackbar(`'${fileName}' successfully added.`,
                {
                    variant: 'success',
                    action: () =>
                        <Button variant='text' label='Undo' onClick={async () => {
                            await deleteConfigFile(applicationId, environment, microserviceId, fileName);

                            fetchConfigFileNamesList();
                            setRestartMicroserviceInfoBoxOpen(false);
                            closeSnackbar();
                        }} />
                });

            fetchConfigFileNamesList();
            setRestartMicroserviceInfoBoxOpen(true);
        } else {
            enqueueSnackbar(`File not added. Please try again. ${result.error}`, { variant: 'error' });
        }
    };

    const handleConfigFileDelete = async (): Promise<void> => {
        for (const filename of dataRowSelected) {
            await deleteConfigFile(applicationId, environment, microserviceId, filename.toString())
                .then(() => {
                    enqueueSnackbar(`${filename} successfully deleted.`, { variant: 'info' });
                    fetchConfigFileNamesList();
                })
                .catch(error => {
                    enqueueSnackbar(`Could not delete config file. ${error.message}`, { variant: 'error' });
                });
        }

        setDeleteConfigFileDialogIsOpen(false);
    };

    // This is reused. consider moving
    const configMapPrefix = `${environment.toLowerCase()}-${microserviceName.toLowerCase()}`;

    // TODO: Should be able to download multiple selected files
    const handleConfigFileDownload = (): void => {
        const configMapName = `${configMapPrefix}-config-files`;
        const href = `${getServerUrlPrefix()}/live/application/${applicationId}/configmap/${configMapName}?download=1&fileType=yaml`;
        window.open(href, '_blank');
    };

    const hasManySelectedRows = dataRowSelected.length > 1;
    const hasNoSelectedRows = dataRowSelected.length === 0;
    const isPlural = hasManySelectedRows ? 'files' : 'file';

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

            <ConfirmDialog
                id='delete-config-file-dialog'
                title={`Delete configuration ${isPlural}`}
                description={`Are you sure you want to delete ${hasManySelectedRows ? 'these' : 'this'} ${isPlural}?`}
                cancelText='Cancel'
                confirmText='Delete'
                open={deleteConfigFileDialogIsOpen}
                handleCancel={() => setDeleteConfigFileDialogIsOpen(false)}
                handleConfirm={handleConfigFileDelete}
            >
                {dataRowSelected.map(file =>
                    <Typography key={file} variant='body2' sx={{ mt: 1.25 }}>{file}</Typography>
                )}
            </ConfirmDialog>

            <ConfirmDialog
                id='config-file-size-dialog'
                title={'File can’t be added'}
                description='Please cancel or select a new file.'
                cancelText='Cancel'
                confirmText='Delete'
                open={fileSizeDialog.isOpen}
                handleCancel={() => setFileSizeDialog({ isOpen: false, fileName: '' })}
                handleConfirm={() => fileUploadRef.current?.showPrompt()}
            >
                {dataRowSelected.map(file =>
                    <Typography key={file} variant='body2' sx={{ mt: 1.25 }}>{file}</Typography>
                )}
            </ConfirmDialog>

            <Accordion
                id='configuration-files'
                expanded={filesPanelExpanded}
                title='Configuration Files'
                onChange={() => setFilesPanelExpanded(!filesPanelExpanded)}
            >
                <Box sx={{ mb: 2.875, button: { 'mr': 6.25, '&:last-of-type': { mr: 0 } } }}>
                    <Button
                        variant='text'
                        label='Add File'
                        startWithIcon={<AddCircle />}
                        onClick={() => fileUploadRef.current?.showPrompt()}
                    />
                    <Button
                        variant='text'
                        label='Delete File(s)'
                        disabled={hasNoSelectedRows}
                        startWithIcon={<DeleteRounded />}
                        onClick={() => setDeleteConfigFileDialogIsOpen(true)}
                    />

                    <Button
                        variant='text'
                        label={`Download File(s)`}
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
                    <DataGridPro
                        rows={dataTableRows}
                        columns={columns}
                        checkboxSelection
                        onSelectionModelChange={newSelectionModal => {
                            setDataRowSelected(newSelectionModal);
                        }}
                        selectionModel={dataRowSelected}
                        getRowHeight={() => 'auto'}
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
