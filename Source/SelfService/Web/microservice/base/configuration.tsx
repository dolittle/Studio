// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Box, Divider, Grid, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';
import { deleteConfigFile, getConfigFilesNamesList, getServerUrlPrefix, IngressURLWithCustomerTenantID, SimpleIngressPath, updateConfigFiles } from '../../api/api';
import { MicroserviceSimple } from '../../api/index';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { ButtonText } from '../../theme/buttonText';
import { TextIconButton } from '../../theme/textIconButton';
import { DownloadButtons } from '../components/downloadButtons';
import ConfigFilesTable from './components/configFilesTable';
import { ConfigView } from './configView';
import { LiveIngressView } from './liveIngressView';
import FileUploadModal from '../../theme/modal';


export type ConfigurationProps = {
    applicationId: string
    environment: string
    microserviceId: string
    msName: string
    ingressUrls: IngressURLWithCustomerTenantID[]
    ingressPaths: SimpleIngressPath[]
    ms: MicroserviceSimple
    onClick: () => void
};


const styles = {
    base: {
        '& .MuiTypography-body1': {
            color: 'black',
            align: 'center'
        }
    },
    divider: {
        backgroundColor: '#3B3D48'
    }
};

const MAX_CONFIGMAP_ENTRY_SIZE = 3145728;


export const Configuration: React.FunctionComponent<ConfigurationProps> = (props) => {
    const [filesNamesList, setFilesNamesList] = useState<string[]>([]);
    

    // This is reused. consider moving
    const configMapPrefix = `${props.environment.toLowerCase()}-${props.msName.toLowerCase()}`;




    useEffect(() => {
        fetchConfigFilesNamesList()
            .catch(console.error);;

    }, []);

    const fetchConfigFilesNamesList = async () => {
        const result = await getConfigFilesNamesList(props.applicationId, props.environment, props.microserviceId);

        if (!result.data) {
            window.alert(`Could not fetch config files`);
        }

        setFilesNamesList(result.data);
    };

    const deleteFileFromMicroservice = (event: React.MouseEvent<HTMLElement>) => {
        // TODO make this work again
        // if (!fileName) {
        //     alert("filename not valid")
        //     return;
        // }

        // if(confirm(`Are you sure you want to delete ${fileName}?`)){
        //     deleteConfigFile(props.applicationId, props.environment, props.microserviceId, fileName);

        //     fetchConfigFilesNamesList()
        //         .catch(console.error);
        // }
    }


    return(
        <>
            <FileUploadModal
                open={true}
                maxUploadSize={MAX_CONFIGMAP_ENTRY_SIZE}
                onFileSelectorSubmit={async (event)=>{
                    event.preventDefault();

                    const fData = new FormData(event.target);

                    await updateConfigFiles(props.applicationId, props.environment, props.microserviceId, fData);
                    fetchConfigFilesNamesList();
                }}>
            </FileUploadModal>
            <Box ml={2}>
                <ConfigView microservice={props.ms} />
            </Box>
            <Divider sx={styles.divider} />
            <Box ml={2}>
                <LiveIngressView urls={props.ingressUrls} paths={props.ingressPaths} />
            </Box>
            <Box ml={2}>
                <ButtonText
                    onClick={props.onClick}
                >Manage environment variables</ButtonText>

                    <DownloadButtons
                        environment={props.environment}
                        microserviceName={props.msName}
                        applicationId={props.applicationId}
                    />
            </Box>
            <Divider sx={styles.divider} />
            <Box ml={2}>
                <h2>Configuration files</h2>
                <Typography
                    variant="body2"
                    component="p"
                    style={{
                        paddingBottom: '5px',
                    }}>max file size: {MAX_CONFIGMAP_ENTRY_SIZE} bytes / 3.15mb</Typography>
                <Grid container spacing={3}>
                    <Grid item>
                        <TextIconButton
                            icon={<AddCircleIcon/>}
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                                document?.getElementById('file-selector')?.click()
                            }}
                        >
                            Add files
                        </TextIconButton>
                    </Grid>
                    <Grid item>
                        <TextIconButton
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                                const configMapName = `${configMapPrefix}-config-files`;
                                const href = `${getServerUrlPrefix()}/live/application/${props.applicationId}/configmap/${configMapName}?download=1&fileType=yaml`;
                                window.open(href, '_blank');
                            }}
                        >
                            Download config files yaml
                        </TextIconButton>
                    </Grid>
                </Grid>
                <ConfigFilesTable filesNames={filesNamesList} onDeleteFileClick={deleteFileFromMicroservice}></ConfigFilesTable>
                <Divider style={{ backgroundColor: '#3B3D48', marginTop: '40px', marginBottom: '20px' }} />
            </Box>
        </>
    )
}
