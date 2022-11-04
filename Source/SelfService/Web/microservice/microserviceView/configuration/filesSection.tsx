// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useRef, useState } from 'react';

import { useSnackbar } from 'notistack';

import { Box, Typography } from '@mui/material';
import { AddCircle, DeleteRounded, DownloadRounded } from '@mui/icons-material';

import { Accordion } from '@dolittle/design-system/atoms/Accordion/Accordion';
import { Button } from '@dolittle/design-system/atoms/Button';

import { FileUploadForm, FileUploadFormRef } from '../../base/components/fileUploadForm';

import { getConfigFilesNamesList, updateConfigFiles } from '../../../api/api';

const MAX_CONFIGMAP_ENTRY_SIZE = 3145728;

type FilesSectionProps = {
    applicationId: string;
    environment: string;
    microserviceId: string;
};

export const FilesSection = ({ applicationId, environment, microserviceId }: FilesSectionProps) => {
    const [filesPanelExpanded, setFilesPanelExpanded] = useState(true);
    const [validFile, setValidFile] = useState(false);
    const [filesNamesList, setFilesNamesList] = useState<string[]>([]);
    const [file, setFile] = useState<File>(new File([], ''));

    const fileUploadRef = useRef<FileUploadFormRef>(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchConfigFilesNamesList()
            .catch(console.error);
    }, []);

    const saveConfigFile = async (formData: FormData) => {
        const upsert = await updateConfigFiles(applicationId, environment, microserviceId, formData);
        const addedFile = formData.get('file');

        console.log();

        if (upsert.success === false) {
            enqueueSnackbar(upsert.error, { variant: 'error', persist: false });
            setValidFile(false);
        } else {
            fetchConfigFilesNamesList();
            // eslint-disable-next-line dot-notation
            enqueueSnackbar(`${addedFile!['name'] || ''} successfully added.`, { variant: 'info' });
        }
    };

    const fetchConfigFilesNamesList = async () => {
        const result = await getConfigFilesNamesList(applicationId, environment, microserviceId);

        if (!result.data) {
            enqueueSnackbar(`Could not fetch config files`, { variant: 'error', persist: false });
        }

        setFilesNamesList(result.data);
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
        </Accordion>
    );
};
