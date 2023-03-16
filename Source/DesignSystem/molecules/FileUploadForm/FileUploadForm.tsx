// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { DragEvent, FormEvent, useImperativeHandle, useState, useRef } from 'react';

import { alpha, Box, Typography } from '@mui/material';
import { UploadRounded } from '@mui/icons-material';

import { Button } from '@dolittle/design-system';

const styles = {
    form: {
        width: 1,
        height: 132,
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

export type OnFileConfirmCallback = (form: FormData, event?) => void;
export type OnFileSelectCallback = (file: File | FileList, event?) => void;

export type FileUploadFormProps = {
    onSelected: OnFileSelectCallback;
    onConfirmed?: OnFileConfirmCallback;
    allowMultipleFiles: boolean;
    hideForm?: boolean;
};

export type FileUploadFormRef = {
    showPrompt: () => void;
    confirmSelected: () => void;
};

export const FileUploadForm = React.forwardRef<FileUploadFormRef, FileUploadFormProps>(function FileUploadForm({
    onSelected, onConfirmed, allowMultipleFiles = false, hideForm = false }: FileUploadFormProps, ref: React.ForwardedRef<FileUploadFormRef>) {

    const [dragActive, setDragActive] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, (): FileUploadFormRef => ({
        showPrompt: () => fileInputRef?.current?.click(),
        confirmSelected: () => {
            const event = new Event('submit', { bubbles: true, cancelable: true });
            formRef?.current?.dispatchEvent(event);
        },
    }));

    const handleFileDrag = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (event.type === 'dragenter' || event.type === 'dragover') {
            setDragActive(true);
        } else if (event.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const onFileDrop = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();

        setDragActive(false);

        const files = event.dataTransfer.files;
        if (!files || files.length === 0) return;
        onSelected(allowMultipleFiles ? files : files[0], event);
    };

    /**
     * Serves change event and file from target.
     * @param event
     */
    const onFileSelect = (event: FormEvent<HTMLInputElement>) => {
        const files = (event?.target as HTMLInputElement)?.files;
        if (!files || files.length === 0) return;
        onSelected(allowMultipleFiles ? files : files[0], event);
    };

    /**
     * @param event Serves submit event and formdata to client.
     */
    const onFileSubmitted = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.target as HTMLFormElement);
        onConfirmed?.(form, event);
    };

    return (
        <Box
            component='form'
            ref={formRef}
            method='put'
            id='form-file-upload'
            onDragEnter={handleFileDrag}
            onSubmit={onFileSubmitted}
            sx={{
                display: hideForm ? 'none' : 'flex',
                ...styles.form,
            }}
        >
            <input
                ref={fileInputRef}
                id='input-file-upload'
                type='file'
                name='file'
                hidden
                multiple={allowMultipleFiles}
                onChange={onFileSelect}
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
                    onDragEnter={handleFileDrag}
                    onDragLeave={handleFileDrag}
                    onDragOver={handleFileDrag}
                    onDrop={onFileDrop}
                    sx={styles.dropArea}
                />
            }
        </Box>
    );
});
