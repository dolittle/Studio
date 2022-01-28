// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Button as DolittleButton } from '../../../theme/button';
import { CdnInfo } from './view';


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

export interface FormProps {
    onClick: React.MouseEventHandler<HTMLSpanElement>; //(fileName:Blob) => Promise<void>, // callback taking a string and then dispatching a store actions
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onNameChange: (string) => void;
    cdnInfo: CdnInfo;
    reset: boolean;
}

export const UploadButton: React.FunctionComponent<FormProps> = (props) => {
    const classes = useStyles();

    const [fileName, setFileName] = useState('');

    useEffect(() => {
        if (props!.reset) {
            setFileName('');
        }

    }, [props!.reset]);


    const inputFileRef = useRef<HTMLInputElement>(null);

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
                ref={inputFileRef}
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

            <DolittleButton
                onClick={() => inputFileRef?.current?.click()}
            >
                Select File
            </DolittleButton>

            <DolittleButton
                onClick={props!.onClick}
            >
                Upload
            </DolittleButton>
        </div >
    );
};
