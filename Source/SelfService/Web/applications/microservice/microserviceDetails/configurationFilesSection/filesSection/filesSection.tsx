// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useRef, useState } from 'react';

import { useSnackbar } from 'notistack';

import { GridSelectionModel } from '@mui/x-data-grid-pro';

import { Accordion, FileUploadForm, FileUploadFormRef } from '@dolittle/design-system';

import { getConfigFilesNamesList, getServerUrlPrefix, updateConfigFile, deleteConfigFile } from '../../../../../apis/solutions/api';

import { isAlphaNumeric } from '../../../../../utils/helpers';

import { RestartMicroserviceDialog } from '../../../components/restartMicroserviceDialog';
import { EmptyDataTable } from '../../../components/emptyDataTable';
import { RestartInfoBox } from '../../../components/restartInfoBox';

import { ConfigFilesTable, ConfigFilesTableRow } from './configFilesTable';
import { ValidateFileDialog } from './validateFileDialog';
import { DeleteConfigFileDialog } from './deleteConfigFileDialog';
import { HeaderButtons } from './headerButtons';

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

    const [configFileTableRows, setConfigFileTableRows] = useState<ConfigFilesTableRow[]>([]);
    const [selectedRowIds, setSelectedRowIds] = useState<GridSelectionModel>([]);
    const [restartInfoBoxIsOpen, setRestartInfoBoxIsOpen] = useState(false);
    const [restartMicroserviceDialogIsOpen, setRestartMicroserviceDialogIsOpen] = useState(false);
    const [deleteConfigFileDialogIsOpen, setDeleteConfigFileDialogIsOpen] = useState(false);
    const [validateFileDialogIsOpen, setValidateFileDialogIsOpen] = useState({ isOpen: false, file: [] as File[] });

    useEffect(() => {
        fetchAndUpdateConfigFileNamesList();
    }, []);

    const fetchAndUpdateConfigFileNamesList = async (): Promise<void> => {
        const result = await getConfigFilesNamesList(applicationId, environment, microserviceId);
        createDataTableObj(result.data ?? []);
    };

    const createDataTableObj = (file: string[]): void => {
        const rows = file.map(name => {
            return {
                id: name,
                fileName: name,
                path: '/app/data/',
                dateAdded: 'N/A',
                addedBy: 'N/A',
            } as ConfigFilesTableRow;
        });

        setConfigFileTableRows(rows);
    };

    async function handleFileSelect(selected: File | FileList): Promise<void> {
        const files = selected instanceof FileList ? Array.from(selected) : [selected];

        for (const file of files) {
            if (validateFile(file.size > MAX_CONFIGMAP_ENTRY_SIZE) && validateFile(isAlphaNumeric.test(file.name))) {
                await saveConfigFile(file);
            } else {
                setValidateFileDialogIsOpen(prev => ({ isOpen: true, file: [...prev.file, file] }));
            }
        }
    };

    const validateFile = (pattern: boolean) => pattern ? false : true;

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
        }
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
            }
        }

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

    const noConfigTableRows = configFileTableRows.length === 0;

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

            <Accordion id='configuration-files' title='Configuration Files' defaultExpanded>
                <HeaderButtons
                    filePrompt={() => fileUploadRef.current?.showPrompt()}
                    deleteDisabled={selectedRowIds.length === 0 || noConfigTableRows}
                    downloadDisabled={noConfigTableRows}
                    handleDelete={() => setDeleteConfigFileDialogIsOpen(true)}
                    handleDownload={handleConfigFileDownload}
                />

                <FileUploadForm ref={fileUploadRef} onSelected={handleFileSelect} allowMultipleFiles hideForm />

                <RestartInfoBox microserviceName={microserviceName} isOpen={restartInfoBoxIsOpen} onDismissed={() => setRestartInfoBoxIsOpen(false)} />

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
