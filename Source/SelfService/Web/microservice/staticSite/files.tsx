// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { addFile } from '../../api/staticFiles';

import { Button as DolittleButton } from '../../theme/button';
import { TextField } from '@material-ui/core';

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
    onNameChange: React.ChangeEventHandler<HTMLInputElement>;
}

const UploadButton: React.FunctionComponent<FormProps> = (props) => {
    const classes = useStyles();

    const [fileName, setFileName] = React.useState('');
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
                    props!.onNameChange(event);
                }}
            />

            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={props!.onChange}
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
    files: string[]
};

export const Files: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const applicationId = _props.applicationId;
    const microserviceId = _props.microserviceId;
    const environment = _props.environment;

    const [selectedFile, setSelectedFile] = React.useState(null);
    const [fileName, setFileName] = React.useState('');

    const handleCapture = ({ target }: any) => {
        setSelectedFile(target.files[0]);
    };

    const handleFileNameChange = ({ target }: any) => {
        setFileName(target.value!);
    };

    const handleSubmit = () => {
        addFile(applicationId, environment, microserviceId, fileName, selectedFile! as File);
    };

    const listView = _props.files.map((fileName: string) => {
        return (<p key={fileName}> {fileName}</p >);
    });

    return (
        <>
            <h1>TODO: Poormans fileview</h1>
            <h1>TODO: Upload file</h1>
            <UploadButton onClick={handleSubmit} onChange={handleCapture} onNameChange={handleFileNameChange} />

            <h1>TODO: list files</h1>
            {listView}
            <h1>TODO: Remove file</h1>


        </>

    );
};
