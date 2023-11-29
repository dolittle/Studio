// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Dispatch } from 'react';

import { Dialog, DialogTitle, DialogActions } from '@mui/material';

import { Button, IconButton, LoadingSpinner } from '@dolittle/design-system';

import { useConnectionsIdKafkaServiceAccountsServiceAccountNameGet } from '../../../../../../../apis/integrations/kafkaServiceAccountApi.hooks';

import { ACTIONTYPE, ViewCredentialsDialogState } from './viewCredentialsDialogReducer';
import { ViewCredentialsDialogContent } from './ViewCredentialsDialogContent';

const styles = {
    title: {
        typography: 'h6',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'move',
    },
    description: {
        typography: 'body1',
        color: 'text.primary',
    },
};

export type ViewCertificateDialogProps = {
    dispatch: Dispatch<ACTIONTYPE>;
    dialogState: ViewCredentialsDialogState;
};

const id = 'view-certificate';

export const ViewCertificateDialog = ({ dialogState, dispatch }: ViewCertificateDialogProps) => {
    const { data, isLoading } = useConnectionsIdKafkaServiceAccountsServiceAccountNameGet({ id: dialogState.connectionId, serviceAccountName: dialogState.serviceAccountName || '' });

    const handleClose = () => {
        dispatch({ type: 'close' });
    };

    return (
        <Dialog
            open={dialogState.isOpen ?? false}
            aria-labelledby={`${id}-${dialogState.serviceAccountName}-dialog-title`}
            aria-describedby={`${id}-${dialogState.serviceAccountName}-dialog-description`}
            maxWidth='xl'
            fullWidth={true}
            scroll='paper'
            onClose={() => dispatch({ type: 'close' })}
        >
            <DialogTitle id={`${id}-${dialogState.serviceAccountName}-dialog-title`} sx={styles.title}>
                View Certificate for {dialogState.serviceAccountName}
                <IconButton tooltipText='Close dialog' edge='end' onClick={handleClose} />
            </DialogTitle>

            {isLoading
                ? <LoadingSpinner />
                : <ViewCredentialsDialogContent
                    content={data?.certificate!}
                    downloadableFileName={`service-${dialogState.serviceAccountName}.cert`}
                />
            }

            <DialogActions sx={{ mr: 1 }}>
                <Button label={'Close'} onClick={handleClose} color='subtle' />
            </DialogActions>
        </Dialog>
    );
};
