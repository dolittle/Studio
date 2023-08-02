// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Dispatch } from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Paper } from '@mui/material';
import { AlertDialog, Button, ContentContainer, ContentDivider, ContentSection, IconButton, LoadingSpinner } from '@dolittle/design-system';
import { useConnectionsIdKafkaServiceAccountsServiceAccountNameGet } from '../../../../../apis/integrations/kafkaServiceAccountApi.hooks';
import { TextCopyBox } from '../../../../../components/TextCopyBox';
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


export type ViewKeyDialogProps = {
    dispatch: Dispatch<ACTIONTYPE>;
    dialogState: ViewCredentialsDialogState;
};

const id = 'view-key';

export const ViewKeyDialog = ({
    dialogState,
    dispatch,
}: ViewKeyDialogProps) => {
    const { data, isFetching } = useConnectionsIdKafkaServiceAccountsServiceAccountNameGet({ id: dialogState.connectionId, serviceAccountName: dialogState.serviceAccountName || '' });

    const handleClose = () => {
        dispatch({ type: 'close' });
    };


    return (
        <>
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
                    View Key for {dialogState.serviceAccountName}
                    <IconButton tooltipText='Close dialog' edge='end' onClick={handleClose} />
                </DialogTitle>

                {isFetching
                    ? <LoadingSpinner />
                    : <ViewCredentialsDialogContent
                        content={data?.key!}
                        downloadableFileName={`service-${dialogState.serviceAccountName}.key`}
                    />
                }

                <DialogActions sx={{ mr: 1 }}>
                    <Button label={'Close'} onClick={handleClose} color='subtle' />
                </DialogActions>
            </Dialog>
        </>
    );
};
