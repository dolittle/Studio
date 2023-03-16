// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useRef, useState } from 'react';

import { Box, Typography } from '@mui/material';
import { UploadRounded } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

import { Button } from '@dolittle/design-system';

const styles = {
    form: {
        width: 1,
        height: 132,
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        border: '1px dashed',
        borderColor: 'outlineborder',
    },
    formLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
    },
    dropArea: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: 1,
        height: 1,
        backgroundColor: theme => `${alpha(theme.palette.primary.main, 0.16)}`,
    },
};

export type FileUploadFormRef = {
    showPrompt: () => void;
    confirmSelected: () => void;
};

export type FileUploadBoxProps = {
    allowMultipleFiles: boolean;
};

export const FileUploadBox = ({ allowMultipleFiles }: FileUploadBoxProps) => {
    const [dragActive, setDragActive] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    //React.DragEvent<HTMLLabelElement>
    const handleDrag = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        if (event.type === 'dragenter' || event.type === 'dragover') {
            setDragActive(true);
        } else if (event.type === 'dragleave') {
            setDragActive(false);
        }
    };

    //: React.DragEvent<HTMLLabelElement>
    const handleDrop = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        setDragActive(false);

        const files = event.dataTransfer.files;

        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            console.log(files);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const files = event.currentTarget.files;

        if (files) {
            console.log(files);
        }
    };

    const onFileSubmitted = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <Box
            component='form'
            ref={formRef}
            method='put'
            id='form-file-upload'
            onDragEnter={handleDrag}
            onSubmit={onFileSubmitted}
            sx={styles.form}
        >
            <input
                ref={fileInputRef}
                id='input-file-upload'
                type='file'
                name='file'
                hidden
                multiple={allowMultipleFiles}
                onChange={handleChange}
            />

            <Box sx={styles.formLabel}>
                <Button
                    label='Upload file'
                    type='submit'
                    startWithIcon={<UploadRounded />}
                    onClick={() => fileInputRef.current?.click()}
                />
                <Typography>or drag it here</Typography>
            </Box>

            {dragActive &&
                <Box
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    sx={styles.dropArea}
                />
            }
        </Box>
    );
};
