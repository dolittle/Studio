// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { deleteConfigFile, getConfigFilesNamesList, updateConfigFiles } from '../../api/api';
import { List } from '@fluentui/react/lib/List';
import { Divider, Grid, Link, Typography } from '@mui/material';



type Props = {
    applicationId: string
    environment: string
    microserviceId: string
};

const styles = {
    base: {
        '& .MuiTypography-body1': {
            color: 'black',
            align: 'center'
        }
    },
};

const MAX_CONFIGMAP_ENTRY_SIZE = 3145728;


export const ConfigFiles: React.FunctionComponent<Props> = (props: Props) => {

    const [filesNamesList, setFilesNamesList] = useState<string[]>([]);

    async function onFileSelectorSubmit(event) {
        event.preventDefault();

        const fData = new FormData(event.target);

        await updateConfigFiles(props.applicationId, props.environment, props.microserviceId, fData);
        fetchConfigFilesNamesList();
    }

    const fileSelector = document?.getElementById('config-file-selector-form');

    const attachFormSubmitEvent = () => {
        fileSelector?.addEventListener('submit', onFileSelectorSubmit);
    }
    attachFormSubmitEvent();


    fileSelector?.addEventListener('change', (event: any) => {
        const fileList = event.target.files;
        if (fileList[0].size > MAX_CONFIGMAP_ENTRY_SIZE) {
            alert('file cannot be larger than 3145728 bytes. Please select another file');
        }
    });


    const fetchConfigFilesNamesList = async () => {
        const result = await getConfigFilesNamesList(props.applicationId, props.environment, props.microserviceId);

        if (!result.data) {
            window.alert(`Could not fetch config files`);
        }

        setFilesNamesList(result.data);
    };


    useEffect(() => {
        fetchConfigFilesNamesList()
            .catch(console.error);;

    }, []);

    const onRenderCell = (fileName: string | undefined, index: number | undefined): JSX.Element => {
        return (
            <Grid container spacing={2}>
                <Grid
                    item
                    sx={styles.base}
                >
                    <Typography variant="body1" >{fileName}</Typography>
                </Grid>
                <Grid item style={{
                    textAlign: 'center',
                    paddingBottom: '10px'
                }}>
                    <Link onClick={async () => {
                        if (!fileName) return;

                        await deleteConfigFile(props.applicationId, props.environment, props.microserviceId, fileName);

                        fetchConfigFilesNamesList()
                            .catch(console.error);
                    }}>
                        Remove
                    </Link>
                </Grid>
            </Grid>
        );
    };



    return (
        <>
            <Typography
                variant="h4"
                component="h4"
                style={{
                    paddingBottom: '5px',
                }}>Microservice configuration files</Typography>
            <Typography
                variant="body2"
                component="p"
                style={{
                    paddingBottom: '50px',
                }}>/app/data</Typography>
            <List items={filesNamesList} onRenderCell={onRenderCell} style={{ backgroundColor: 'white', width: '30%' }} />
            <Divider style={{ backgroundColor: '#3B3D48', marginTop: '40px', marginBottom: '20px' }} />
            <Typography
                variant="h4"
                component="h4"
                style={{
                    paddingBottom: '5px',
                }}>Add new configuration file</Typography>
            <Typography
                variant="body2"
                component="p"
                style={{
                    paddingBottom: '5px',
                }}>max file size: {MAX_CONFIGMAP_ENTRY_SIZE} bytes / 3.15mb</Typography>
            <Typography
                variant="body2"
                component="p"
                style={{
                    paddingBottom: '50px',
                }}>submitting files with the same name will cause the original file to be replaced</Typography>
            <form method="put" id="config-file-selector-form">
                <input type="file" id="file-selector" name='file' />
                <input type="submit" value="Submit" />
            </form>
        </>);
};
