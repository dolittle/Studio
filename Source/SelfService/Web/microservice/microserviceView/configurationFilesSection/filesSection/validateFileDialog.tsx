// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ConfirmDialog } from '@dolittle/design-system';

import { Box, Typography } from '@mui/material';

const MAX_CONFIGMAP_ENTRY_SIZE = 3145728;

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

type ValidateFileDialogProps = {
    invalid: {
        isOpen: boolean;
        file: File[]
    };
    open: boolean;
    setOpen: () => void;
    handleValidate: () => void;
};

export const ValidateFileDialog = ({ invalid, open, setOpen, handleValidate }: ValidateFileDialogProps) => {
    const isManyInvalidFiles = invalid.file.length > 1 ? 'files' : 'file';
    const fileErrorMessage = 'File size must be less than 3.145MB.';
    const charErrorMessage = 'File name contains invalid characters. Only letters, numbers, dashes, underscores and periods are allowed.';

    return (
        <ConfirmDialog
            id='config-file-size-dialog'
            title={`${isManyInvalidFiles} can't be added`}
            description={`Please cancel or select a new ${isManyInvalidFiles}.`}
            cancelText='Cancel'
            confirmText='Select new'
            isOpen={open}
            handleCancel={setOpen}
            handleConfirm={handleValidate}
        >
            {invalid.file.map(file =>
                <Box key={file.name} >
                    <Typography variant='body1' sx={{ mt: 1.25 }}>{`${file.name} ${formatBytes(file.size)}`}</Typography>
                    <Typography variant='caption' sx={{ color: 'error.light' }}>
                        {file.size > MAX_CONFIGMAP_ENTRY_SIZE ? fileErrorMessage : charErrorMessage}
                    </Typography>
                </Box>
            )}
        </ConfirmDialog>
    );
};
