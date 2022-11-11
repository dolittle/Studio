// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useRef, useState } from 'react';

import { useSnackbar } from 'notistack';

import { DataGridPro } from '@mui/x-data-grid-pro';

import { Box, Paper, Typography } from '@mui/material';
import { AddCircle, DeleteRounded, DownloadRounded } from '@mui/icons-material';

import { Accordion } from '@dolittle/design-system/atoms/Accordion/Accordion';
import { Button } from '@dolittle/design-system/atoms/Button';

import { FileUploadForm, FileUploadFormRef } from '../../base/components/fileUploadForm';

import { getConfigFilesNamesList, updateConfigFiles } from '../../../api/api';

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
    const [validFile, setValidFile] = useState(false);
    const [dataTableRows, setDataTableRows] = useState<ConfigFilesTableRow[]>([]);
    const [file, setFile] = useState<File>(new File([], ''));
    const [dataRowSelected, setDataRowSelected] = useState(true);

    useEffect(() => {
        fetchConfigFilesNamesList();
    }, []);

    const fetchConfigFilesNamesList = async (): Promise<void> => {
        const result = await getConfigFilesNamesList(applicationId, environment, microserviceId)
            .then(res => res.data)
            .catch((error) => {
                enqueueSnackbar(`Could not fetch config files ${error.message}`, { variant: 'error' });
            });

        assignDataTableRows(result ?? []);
    };

    const assignDataTableRows = (file: string[]): void => {
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

    const validateFile = (file: File) => {
        sizeValidation(file);
        setFile(file);
        fileUploadRef.current?.confirmSelectedFile();
    };

    const sizeValidation = (file: File): boolean => {
        if (file.size > MAX_CONFIGMAP_ENTRY_SIZE) {
            setValidFile(false);
            enqueueSnackbar(`file cannot be larger than ${MAX_CONFIGMAP_ENTRY_SIZE} bytes. Please select another file`, { variant: 'error', persist: false });
            return false;
        }

        setValidFile(true);
        return true;
    };

    const saveConfigFile = async (formData: FormData) => {
        const upsert = await updateConfigFiles(applicationId, environment, microserviceId, formData);

        if (upsert.success === false) {
            enqueueSnackbar(upsert.error, { variant: 'error', persist: false });
            setValidFile(false);
        } else {
            // @ts-ignore
            enqueueSnackbar(`'${formData.get('file')?.name || ''}' successfully added.`, { variant: 'info' });
            fetchConfigFilesNamesList();
        }
    };

    return (
        <Accordion
            id='configuration-files'
            expanded={filesPanelExpanded}
            title='Configuration Files'
            onChange={() => setFilesPanelExpanded(!filesPanelExpanded)}
        >
            <Box sx={{ button: { 'mr': 6.25, '&:last-of-type': { mr: 0 } } }}>
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

            <FileUploadForm ref={fileUploadRef} onFileAdded={saveConfigFile} onFileSelected={validateFile} />

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
    );
};
