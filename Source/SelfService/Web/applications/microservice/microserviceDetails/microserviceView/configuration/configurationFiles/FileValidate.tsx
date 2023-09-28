// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Fragment } from 'react';

import { AlertDialog } from '@dolittle/design-system';

import { Divider, List, ListItem, Typography } from '@mui/material';

import { formatBytes } from '../../../../../../utils/helpers';

const MAX_CONFIGMAP_ENTRY_SIZE = 3145728;

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
    const isPlural = invalid.file.length > 1 ? 'files' : 'file';
    const fileErrorMessage = 'File size must be less than 3.145MB.';
    const charErrorMessage = 'File name contains invalid characters. Only letters, numbers, dashes, underscores and periods are allowed.';

    return (
        <AlertDialog
            id='config-file-size'
            title={`${isPlural} can't be added`}
            description={`Please cancel or select a new ${isPlural}.`}
            confirmBtnText='Select new'
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
        </AlertDialog>
    );
};
