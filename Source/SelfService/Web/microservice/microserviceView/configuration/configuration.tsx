// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState, useRef } from 'react';

import { useSnackbar } from 'notistack';

import {
    deleteConfigFile,
    getConfigFilesNamesList,
    getServerUrlPrefix,
    IngressURLWithCustomerTenantID,
    SimpleIngressPath,
    updateConfigFiles
} from '../../../api/api';
import { MicroserviceSimple } from '../../../api/index';

import { Box, Divider, Grid, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { ButtonText } from '../../../theme/buttonText';
import { DownloadButton } from '../../../theme/downloadButton';
import { SelectFileConfirmationModal } from '../../../theme/selectFileConfirmationModal';
import { DownloadButtons } from '../../components/downloadButtons';

import ConfigFilesTable from '../../base/components/configFilesTable';
import { ConfigView } from '../../base/configView';
import { LiveIngressView } from '../../base/liveIngressView';
import { FileUploadForm, FileUploadFormRef } from '../../base/components/fileUploadForm';

import { SetupSection } from './setupSection';

export type ConfigurationProps = {
    application: any;
    applicationId: string;
    environment: string;
    microserviceId: string;
    msName: string;
    ingressUrls: IngressURLWithCustomerTenantID[];
    ingressPaths: SimpleIngressPath[];
    currentMicroservice: any;
    microservice: MicroserviceSimple;
    onClick: () => void;
};

const styles = {
    divider: {
        backgroundColor: '#3B3D48'
    }
};

const MAX_CONFIGMAP_ENTRY_SIZE = 3145728;

export const Configuration = ({
    application, applicationId, environment, microservice, microserviceId, msName, ingressUrls, ingressPaths, currentMicroservice, onClick }: ConfigurationProps) => {

    const [filesNamesList, setFilesNamesList] = useState<string[]>([]);
    const [configFileModalVisibility, setConfigFileModalVisibility] = useState<boolean>(false);

    const [file, setFile] = useState<File>(new File([], ''));
    const [validFile, setValidFile] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();

    // This is reused. consider moving
    const configMapPrefix = `${environment.toLowerCase()}-${msName.toLowerCase()}`;

    const fileUploadRef = useRef<FileUploadFormRef>(null);

    useEffect(() => {
        fetchConfigFilesNamesList()
            .catch(console.error);
    }, []);

    const fetchConfigFilesNamesList = async () => {
        const result = await getConfigFilesNamesList(applicationId, environment, microserviceId);

        if (!result.data) {
            enqueueSnackbar(`Could not fetch config files`, { variant: 'error', persist: false });
        }

        setFilesNamesList(result.data);
    };

    const deleteFileFromMicroservice = async (fileName: string) => {
        if (!fileName) {
            enqueueSnackbar('filename not valid', { variant: 'error', persist: false });
            return;
        }

        if (confirm(`Are you sure you want to delete ${fileName}?`)) {
            await deleteConfigFile(applicationId, environment, microserviceId, fileName);

            fetchConfigFilesNamesList()
                .catch(console.error);
        }
    };

    const sizeValidation = (file): boolean => {
        if (file.size > MAX_CONFIGMAP_ENTRY_SIZE) {
            setValidFile(false);
            enqueueSnackbar(`file cannot be larger than ${MAX_CONFIGMAP_ENTRY_SIZE} bytes. Please select another file`, { variant: 'error', persist: false });
            return false;
        }

        setValidFile(true);
        return true;
    };

    const validateAndShowConfirmationDialog = (file: File) => {
        sizeValidation(file);
        setFile(file);
        setConfigFileModalVisibility(true);
    };

    const saveConfigFile = async (formData: FormData) => {
        const upsert = await updateConfigFiles(applicationId, environment, microserviceId, formData);

        if (upsert.success === false) {
            enqueueSnackbar(upsert.error, { variant: 'error', persist: false });
            setValidFile(false);
        } else {
            fetchConfigFilesNamesList();
        }
        setConfigFileModalVisibility(false);
    };

    return (
        <>
            <SelectFileConfirmationModal
                open={configFileModalVisibility}
                disableAdd={!validFile}
                fileSize={file.size}
                fileName={file.name}
                onCancel={() => setConfigFileModalVisibility(false)}
                onAdd={() => fileUploadRef.current?.confirmSelectedFile()}
            />

            <Box>
                <SetupSection application={application} applicationId={applicationId} environment={environment} microservice={currentMicroservice} microserviceId={microserviceId} />

                <ConfigView microservice={microservice} />
            </Box>

            <Divider sx={styles.divider} />

            <Box ml={2}>
                <LiveIngressView urls={ingressUrls} paths={ingressPaths} />
            </Box>

            <Box ml={2}>
                <ButtonText
                    onClick={onClick}
                >Manage environment variables</ButtonText>

                <DownloadButtons
                    environment={environment}
                    microserviceName={msName}
                    applicationId={applicationId}
                />
            </Box>

            <Divider sx={styles.divider} />

            <Box ml={2}>
                <Typography variant='h2' my={2}>Configuration files</Typography>

                <Grid container spacing={3}>
                    <Grid item>
                        <ButtonText
                            startIcon={<AddCircleIcon />}
                            onClick={() => fileUploadRef.current?.promptForFile()}
                        >
                            Add files
                        </ButtonText>
                    </Grid>

                    <Grid item>
                        <DownloadButton
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                                const configMapName = `${configMapPrefix}-config-files`;
                                const href = `${getServerUrlPrefix()}/live/application/${applicationId}/configmap/${configMapName}?download=1&fileType=yaml`;
                                window.open(href, '_blank');
                            }}
                        >
                            Download config files yaml
                        </DownloadButton>
                    </Grid>

                    <FileUploadForm ref={fileUploadRef} onFileAdded={saveConfigFile} onFileSelected={validateAndShowConfirmationDialog} />
                </Grid>

                <ConfigFilesTable filesNames={filesNamesList} onDeleteFileClick={deleteFileFromMicroservice}></ConfigFilesTable>

                <Divider style={{ backgroundColor: '#3B3D48', marginTop: '40px', marginBottom: '20px' }} />
            </Box>
        </>
    );
};
