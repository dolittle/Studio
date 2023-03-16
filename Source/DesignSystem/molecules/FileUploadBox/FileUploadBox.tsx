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

export const FileUploadBox = () => {
    const [dragActive, setDragActive] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <Box
            component='form'
            id='form-file-upload'
            onDragEnter={handleDrag}
            onSubmit={handleSubmit}
            sx={styles.form}
        >
            <input ref={inputRef} type='file' id='input-file-upload' multiple={true} onChange={handleChange} hidden />

            <Box component='label' id='label-file-upload' htmlFor='input-file-upload' sx={styles.formLabel}>
                <Button
                    label='Upload file'
                    type='submit'
                    startWithIcon={<UploadRounded />}
                    onClick={() => inputRef.current?.click()}
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
