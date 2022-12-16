// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ConfirmDialog } from '@dolittle/design-system/atoms/ConfirmDialog/ConfirmDialog';

import { GridSelectionModel } from '@mui/x-data-grid-pro';
import { Typography } from '@mui/material';

type DeleteConfigFileDialogProps = {
    selectedDataRows: GridSelectionModel;
    open: boolean;
    setOpen: (open: boolean) => void;
    handleDelete: () => Promise<void>;
};

export const DeleteConfigFileDialog = ({ selectedDataRows, open, setOpen, handleDelete }: DeleteConfigFileDialogProps) => {
    const hasManySelectedRows = selectedDataRows.length > 1;
    const isPlural = hasManySelectedRows ? 'files' : 'file';

    return (
        <ConfirmDialog
            id='delete-config-file-dialog'
            title={`Delete configuration ${isPlural}`}
            description={`Are you sure you want to delete ${hasManySelectedRows ? 'these' : 'this'} ${isPlural}?`}
            cancelText='Cancel'
            confirmText='Delete'
            isOpen={open}
            handleCancel={() => setOpen(false)}
            handleConfirm={handleDelete}
        >
            {selectedDataRows.map(file =>
                <Typography key={file} variant='body2' sx={{ mt: 1.25 }}>{file}</Typography>
            )}
        </ConfirmDialog>
    );
};
