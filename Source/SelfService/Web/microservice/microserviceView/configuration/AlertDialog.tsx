// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as React from 'react';

import { Button } from '@dolittle/design-system/atoms/Button/Button';

import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

export const AlertDialog = ({ open, onClose, handleDeletionConfirm }: any) =>
    <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title" variant='h6'>
            Delete Microservice?
            <IconButton onClick={onClose} sx={{
                position: 'absolute',
                right: 8,
                top: 8,
            }}>
                {<CloseRounded />}
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description" variant='body1'>
                This action cannot be undone. Click delete if you would like to delete the mircroservice.
            </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mr: 1 }}>
            <Button onClick={onClose} label='Cancel' variant='text' sx={{ color: 'text.primary' }} />
            <Button onClick={handleDeletionConfirm} label='Delete' variant='text' />
        </DialogActions>
    </Dialog>;
