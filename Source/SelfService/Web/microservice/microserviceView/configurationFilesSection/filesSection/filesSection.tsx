// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useRef, useState } from 'react';

import { useSnackbar } from 'notistack';

import { GridSelectionModel } from '@mui/x-data-grid-pro';

import { Accordion } from '@dolittle/design-system';

import { getConfigFilesNamesList, getServerUrlPrefix, updateConfigFile, deleteConfigFile } from '../../../../api/api';

import { FileUploadForm, FileUploadFormRef } from './fileUploadForm';
import { RestartMicroserviceDialog } from '../../restartMicroserviceDialog';
import { ConfigFilesTable, ConfigFilesTableRow } from './configFilesTable';
import { EmptyDataTable } from '../emptyDataTable';
import { ValidateFileDialog } from './validateFileDialog';
import { DeleteConfigFileDialog } from './deleteConfigFileDialog';
import { ButtonGroup } from './buttonGroup';
import { RestartInfoBox } from '../restartInfoBox';

const MAX_CONFIGMAP_ENTRY_SIZE = 3145728;

type FilesSectionProps = {
    applicationId: string;
    environment: string;
    microserviceName: string;
    microserviceId: string;
};

export const FilesSection = ({ applicationId, environment, microserviceName, microserviceId }: FilesSectionProps) => {
    const fileUploadRef = useRef<FileUploadFormRef>(null);
    const { enqueueSnackbar } = useSnackbar();

    const [filesPanelIsExpanded, setFilesPanelIsExpanded] = useState(true);
    const [configFileTableRows, setConfigFileTableRows] = useState<ConfigFilesTableRow[]>([]);
    const [selectedRowIds, setSelectedRowIds] = useState<GridSelectionModel>([]);
    const [restartInfoBoxIsOpen, setRestartInfoBoxIsOpen] = useState(false);
    const [restartMicroserviceDialogIsOpen, setRestartMicroserviceDialogIsOpen] = useState(false);
    const [deleteConfigFileDialogIsOpen, setDeleteConfigFileDialogIsOpen] = useState(false);
    const [validateFileDialogIsOpen, setValidateFileDialogIsOpen] = useState({ isOpen: false, file: [] as File[] });

    useEffect(() => {
        fetchAndUpdateConfigFileNamesList()
            .catch(console.error);
    }, []);

    const fetchAndUpdateConfigFileNamesList = async (): Promise<void> => {
        const result = await getConfigFilesNamesList(applicationId, environment, microserviceId);

        result.data ?
            createDataTableObj(result.data) :
            enqueueSnackbar('Could not fetch config files.', { variant: 'error' });
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

        setConfigFileTableRows(rows);
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
            enqueueSnackbar(`'${file.name}' successfully added.`);

            fetchAndUpdateConfigFileNamesList();
            setRestartInfoBoxIsOpen(true);
        } else {
            enqueueSnackbar('File not added. Please try again.', { variant: 'error' });
        };
    };

    const handleConfigFileDelete = async (): Promise<void> => {
        for (const filename of selectedRowIds) {
            const fileName = filename.toString();
            const response = await deleteConfigFile(applicationId, environment, microserviceId, fileName);

            if (response) {
                enqueueSnackbar(`'${fileName}' deleted from configuration files.`);
            } else {
                enqueueSnackbar(`'${fileName}' deletion failed.`, { variant: 'error' });
                setDeleteConfigFileDialogIsOpen(false);

                return;
            };
        };

        setDeleteConfigFileDialogIsOpen(false);
        fetchAndUpdateConfigFileNamesList();
    };

    // This is reused. consider moving
    const configMapPrefix = `${environment.toLowerCase()}-${microserviceName.toLowerCase()}`;

    // TODO: Should be able to download multiple selected files
    const handleConfigFileDownload = (): void => {
        const configMapName = `${configMapPrefix}-config-files`;
        const href = `${getServerUrlPrefix()}/live/application/${applicationId}/configmap/${configMapName}?download=1&fileType=yaml`;
        window.open(href, '_blank');

        enqueueSnackbar(`'${configMapName}' downloaded.`);
    };

    const handleValidateFileDialogClose = (): void => {
        setValidateFileDialogIsOpen({ isOpen: false, file: [] });
    };

    return (
        <>
            <RestartMicroserviceDialog
                applicationId={applicationId}
                environment={environment}
                microserviceId={microserviceId}
                msName={microserviceName}
                open={restartMicroserviceDialogIsOpen}
                setOpen={() => setRestartMicroserviceDialogIsOpen(true)}
                handleSuccess={() => {
                    setRestartInfoBoxIsOpen(false);
                    window.location.reload();
                }}
            />

            <DeleteConfigFileDialog
                selectedDataRows={selectedRowIds}
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
                isExpanded={filesPanelIsExpanded}
                title='Configuration Files'
                onChange={() => setFilesPanelIsExpanded(!filesPanelIsExpanded)}
            >
                <ButtonGroup
                    filePrompt={() => fileUploadRef.current?.showPrompt()}
                    deleteDisabled={selectedRowIds.length === 0 || configFileTableRows.length === 0}
                    downloadDisabled={configFileTableRows.length === 0}
                    handleDelete={() => setDeleteConfigFileDialogIsOpen(true)}
                    handleDownload={handleConfigFileDownload}
                />

                <FileUploadForm ref={fileUploadRef} onSelected={handleFileSelect} allowMultipleFiles />

                <RestartInfoBox name={microserviceName} isAlertBoxOpen={restartInfoBoxIsOpen} handleDismiss={() => setRestartInfoBoxIsOpen(false)} />

                {configFileTableRows.length > 0 ?
                    <ConfigFilesTable rows={configFileTableRows} selectionModel={selectedRowIds} handleSelectionModelChange={setSelectedRowIds} /> :
                    <EmptyDataTable
                        title='No configuration files yet...'
                        description={`To add your first configuration file, select 'add file'. You may select more than one at a time. Each file must be less than 3.145MB.`}
                        label='Add file(s)'
                        handleOnClick={() => fileUploadRef.current?.showPrompt()}
                    />
                }
            </Accordion>
        </>
    );
};
