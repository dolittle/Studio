// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { DragEvent, FormEvent, useImperativeHandle, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

import { alpha, Box, Typography } from '@mui/material';

import { Button, Icon, IconButton } from '@dolittle/design-system';

const styles = {
    dropArea: {
        width: 1,
        height: 132,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        border: '1px dashed',
        borderColor: 'outlineborder',
    },
    alignment: {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
    },
    dropOverlay: {
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

export type FileUploadFormRef = {
    showPrompt: () => void;
    confirmSelected: () => void;
};

/**
 * The props for a {@link FileUploadForm} component.
 */
export type FileUploadFormProps = {
    /**
     * The callback for when a file is selected.
     */
    onSelected: OnFileSelectCallback;

    /**
     * The callback for when a file is confirmed.
     */
    onConfirmed?: OnFileConfirmCallback;

    /**
     * Whether to allow multiple files to be selected.
     *
     * Set to true if you want to allow multiple files to be selected.
     * @default false
     */
    allowMultipleFiles?: boolean;

    /**
     * Whether to hide the form.
     *
     * Set to true if you want to use the component as a button.
     * @default false
     */
    hideDropArea?: boolean;

    /**
     * The valid file extensions.
     *
     * Add the file extensions you want to allow, without the dot.
     * @default []
     */
    validFileExtensions?: string[];
};

/**
 * A component for uploading files.
 * @param {FileUploadFormProps} props - The {@link IconButtonProps}.
 * @returns A {@link FileUploadForm} component.
 */
export const FileUploadForm = React.forwardRef<FileUploadFormRef, FileUploadFormProps>(function FileUploadForm({
    onSelected, onConfirmed, allowMultipleFiles = false, hideDropArea = false, validFileExtensions = [] }:
    FileUploadFormProps, ref: React.ForwardedRef<FileUploadFormRef>) {

    const [dragActive, setDragActive] = useState(false);

    const [fileFormatError, setFileFormatError] = useState(false);
    const [fileName, setFileName] = useState('');

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

    // TODO: Frontend display only
    const showFileNameInBox = (files: FileList) => {
        const fileExtension = files[0].name.split('.').pop() as string;

        if (!validFileExtensions.length || validFileExtensions.includes(fileExtension)) {
            setFileFormatError(false);
            setFileName(files[0].name);
        } else {
            setFileFormatError(true);
            setFileName('');
        }
    };

    const listValidFileExtensions = () => {
        if (!validFileExtensions.length) return;

        if (validFileExtensions.length === 1) {
            return validFileExtensions[0];
        } else if (validFileExtensions.length === 2) {
            return `${validFileExtensions[0]} or ${validFileExtensions[1]}`;
        } else {
            return `${validFileExtensions.slice(0, -1).join(', ')}, or ${validFileExtensions.slice(-1).join('')}`;
        }
    };

    // TODO: Frontend display only
    const handleFileDelete = () => {
        setFileName('');
        setFileFormatError(false);
    };

    const onFileDrop = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();

        setDragActive(false);

        const files = event.dataTransfer.files;
        if (!files || files.length === 0) return;
        if (!hideDropArea) showFileNameInBox(files);
        onSelected(files[0], event);
    };

    /**
     * Serves change event and file from target.
     * @param event
     */
    const onFileSelect = (event: FormEvent<HTMLInputElement>) => {
        const files = (event?.target as HTMLInputElement)?.files;
        if (!files || files.length === 0) return;
        if (!hideDropArea) showFileNameInBox(files);
        onSelected(allowMultipleFiles ? files : files[0], event);
        if(event && event.target) {
            (event.target as HTMLInputElement).value = '';
        }
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
        <>
            <Box
                onDragEnter={handleFileDrag}
                sx={{
                    display: hideDropArea ? 'none' : 'flex',
                    ...styles.dropArea,
                }}
            >
                <Box sx={styles.alignment}>
                    <Button
                        label='Choose file'
                        type='submit'
                        startWithIcon='UploadRounded'
                        onClick={() => fileInputRef.current?.click()}
                    />
                    <Typography>or drag it here</Typography>
                </Box>
                {fileFormatError && !fileName &&
                    <Box sx={{ ...styles.alignment, mt: 1, color: 'error.main', }}>
                        <Icon icon='ErrorRounded' />
                        <Typography variant='body2'>{`Wrong file type. Please upload a ${listValidFileExtensions()} file.`}</Typography>
                    </Box>
                }
                {!fileFormatError && fileName &&
                    <Box sx={{ ...styles.alignment, mt: 1 }}>
                        <Typography>{fileName}</Typography>
                        <IconButton icon='CancelRounded' color='primary' tooltipText='Delete file' onClick={handleFileDelete} />
                    </Box>
                }
                {dragActive &&
                    <Box
                        onDragEnter={handleFileDrag}
                        onDragLeave={handleFileDrag}
                        onDragOver={handleFileDrag}
                        onDrop={onFileDrop}
                        sx={styles.dropOverlay}
                    />
                }
            </Box>
            {createPortal(
                <Box
                    component='form'
                    ref={formRef}
                    method='put'
                    id='form-file-upload'
                    onSubmit={onFileSubmitted}
                    sx={{ display: 'none' }}
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
                </Box>,
                document.body
            )}
        </>
    );
});
