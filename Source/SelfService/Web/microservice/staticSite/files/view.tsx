// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Box, TextField } from '@material-ui/core';

import { getFiles, addFile, StaticFiles } from '../../../api/staticFiles';
import { Button as DolittleButton } from '../../../theme/button';
import { ListView } from './listView';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        input: {
            display: 'none',
        },
    }),
);

// https://stackoverflow.com/questions/40589302/how-to-enable-file-upload-on-reacts-material-ui-simple-input

interface FormProps {
    onClick: React.MouseEventHandler<HTMLSpanElement>; //(fileName:Blob) => Promise<void>, // callback taking a string and then dispatching a store actions
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onNameChange: (string) => void;
    cdnInfo: CdnInfo;
}

const UploadButton: React.FunctionComponent<FormProps> = (props) => {
    const classes = useStyles();

    const [fileName, setFileName] = useState('');
    return (
        <div className={classes.root}>

            <TextField
                required
                id='outlined-required'
                label='file name'
                variant='outlined'

                value={fileName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFileName(event.target.value!);
                    props!.onNameChange(event.target.value!);
                }}
            />

            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={(event) => {
                    const target = event.target as any;
                    // TODO possible bugs with missing end /
                    const url = `${props!.cdnInfo.path}${target.files[0].name}`;
                    setFileName(url);
                    props!.onChange(event);
                    props!.onNameChange(url);
                }}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span"
                >
                    Select File
                </Button>
                <DolittleButton
                >
                    Select File
                </DolittleButton>

            </label>
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>

            <DolittleButton
                onClick={props!.onClick}
            >
                Upload
            </DolittleButton>
        </div>
    );
};

type Props = {
    applicationId: string
    environment: string
    microserviceId: string
};

export type CdnInfo = {
    domain: string
    prefix: string
    path: string
};

export const View: React.FunctionComponent<Props> = (props) => {
    // TODO this should not be hardcoded
    // TODO Make sure we remove trailing slash
    const cdnInfo = {
        domain: 'https://freshteapot-taco.dolittle.cloud',
        prefix: '/doc/',
        path: '',
    } as CdnInfo;
    cdnInfo.path = `${cdnInfo.domain}${cdnInfo.prefix}`;

    const _props = props!;
    const applicationId = _props.applicationId;
    const microserviceId = _props.microserviceId;
    const environment = _props.environment;

    const [selectedFile, setSelectedFile] = React.useState(null);
    const [fileName, setFileName] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [runtimeError, setRuntimeError] = React.useState(null as any);
    const [currentFiles, setCurrentFiles] = useState({ files: [] } as StaticFiles);


    const loadData = async () => {
        try {
            const data = await getFiles(applicationId, environment, microserviceId);
            setCurrentFiles(data);
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
            setRuntimeError(e);
        }
    };

    useEffect(() => {
        (async () => {
            loadData();
        })();
    }, []);

    if (runtimeError) {
        return <h1>Error</h1>;
    }

    const handleAfterFileDelete = async () => {
        console.log('here');
        setLoading(true);
        await loadData();
    };

    const handleCapture = ({ target }: any) => {
        setSelectedFile(target.files[0]);
    };

    const handleFileNameChange = (newValue: string) => {
        setFileName(newValue);
    };

    const handleSubmit = async () => {
        let suffix = fileName.replace(cdnInfo.path, '');
        suffix = suffix.startsWith('/') ? suffix.substring(1) : suffix;

        await addFile(applicationId, environment, microserviceId, suffix, selectedFile! as File);
        setLoading(true);
        await loadData();
    };


    let message: React.ReactNode = null;

    if (loading) {
        message = <h1>Loading files</h1>;
    }

    if (runtimeError) {
        message = <h1>Error loading files</h1>;
    }

    return (
        <>
            {message}
            <Box m={2}>
                <p>{cdnInfo.path}</p>
            </Box>

            <h1>Upload file</h1>
            <UploadButton cdnInfo={cdnInfo} onClick={handleSubmit} onChange={handleCapture} onNameChange={handleFileNameChange} />

            {!loading && (
                <>
                    <h1>List files</h1>
                    <ListView
                        environment={environment}
                        microserviceId={microserviceId}
                        applicationId={applicationId}
                        cdnInfo={cdnInfo}
                        data={currentFiles}
                        afterDelete={handleAfterFileDelete}
                    />
                </>
            )}
        </>

    );
};
