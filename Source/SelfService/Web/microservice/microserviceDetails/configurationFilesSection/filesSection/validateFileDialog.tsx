// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Fragment } from 'react';

import { ConfirmDialog } from '@dolittle/design-system';

import { Divider, List, ListItem, Typography } from '@mui/material';

const MAX_CONFIGMAP_ENTRY_SIZE = 3145728;

function formatBytes(bytes: number, decimals = 2) {
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
            onCancel={setOpen}
            onConfirm={handleValidate}
        >
            <List>
                {invalid.file.map((file, index) =>
                    <Fragment key={index}>
                        <ListItem>{`${file.name} ${formatBytes(file.size)}`}</ListItem>
                        <ListItem sx={{ pt: 0 }}>
                            <Typography variant='caption' sx={{ color: 'error.light' }}>
                                {file.size > MAX_CONFIGMAP_ENTRY_SIZE ? fileErrorMessage : charErrorMessage}
                            </Typography>
                        </ListItem>
                        {invalid.file.length - 1 !== index && <Divider />}
                    </Fragment>
                )}
            </List>
        </ConfirmDialog>
    );
};
