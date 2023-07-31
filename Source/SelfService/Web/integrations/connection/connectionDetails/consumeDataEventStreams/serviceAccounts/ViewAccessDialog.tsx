// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Dispatch } from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Paper } from '@mui/material';
import { AlertDialog, Button, ContentContainer, ContentDivider, ContentSection, IconButton, LoadingSpinner } from '@dolittle/design-system';
import { useConnectionsIdKafkaServiceAccountsServiceAccountNameGet } from '../../../../../apis/integrations/kafkaServiceAccountApi.hooks';
import { TextCopyBox } from '../../../../../components/TextCopyBox';

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


export type ViewAccessDialogState = {
    isOpen: boolean;
    connectionId: string;
    serviceAccountName?: string;
};

export type ACTIONTYPE =
    | { type: 'open'; payload: { serviceAccountName: string } }
    | { type: 'close'; payload?: void }
    | { type: 'setLoading'; payload: boolean };

export const viewAccessDialogReducer = (state: ViewAccessDialogState, action: ACTIONTYPE) => {
    switch (action.type) {
        case 'open':
            return { ...state, isOpen: true, serviceAccountName: action.payload.serviceAccountName };
        case 'close':
            return { ...state, isOpen: false, serviceAccountName: undefined };
        default:
            return state;
    }
};

export type ViewAccessDialogProps = {
    dispatch: Dispatch<ACTIONTYPE>;
    dialogState: ViewAccessDialogState;
};

const id = 'view-credentials';

export const ViewAccessDialog = ({
    dialogState,
    dispatch,
}: ViewAccessDialogProps) => {
    const { data, isFetching } = useConnectionsIdKafkaServiceAccountsServiceAccountNameGet({ id: dialogState.connectionId, serviceAccountName: dialogState.serviceAccountName || '' });

    const handleClose = () => {
        dispatch({ type: 'close' });
    };


    return (
        <>
            <Dialog
                open={dialogState.isOpen ?? false}
                aria-labelledby={`${id}-dialog-title`}
                aria-describedby={`${id}-dialog-description`}
                maxWidth='xl'
                fullWidth={true}
                scroll='paper'
                onClose={() => dispatch({ type: 'close' })}
            >
                <DialogTitle id={`${id}-dialog-title`} sx={styles.title}>
                    View Credentials for {dialogState.serviceAccountName}
                    <IconButton tooltipText='Close dialog' edge='end' onClick={handleClose} />
                </DialogTitle>

                {isFetching
                    ? <LoadingSpinner />
                    : (
                        <DialogContent sx={{ typography: 'body2' }}>
                            <ViewAccessDialogContent certificate={data?.certificate!} accessKey={data?.key!} />
                        </DialogContent>
                    )
                }

                <DialogActions sx={{ mr: 1 }}>
                    <Button label={'Close'} onClick={handleClose} color='subtle' />
                </DialogActions>
            </Dialog>
        </>
        // <AlertDialog
        //     id='view-credentials'
        //     title={`View Credentials - '${dialogState.serviceAccountName}'`}
        //     description={`
        //         Are you sure you want to delete the credentials for '${dialogState.serviceAccountName}'?
        //         This action cannot be undone and will impact any applications currently using these credentials.
        //     `}
        //     confirmBtnColor='error'
        //     confirmBtnText='Delete'
        //     isOpen={dialogState.open}
        //     onCancel={handleCancel}}
        // />
    );
};

export type ViewAccessDialogContentProps = {
    certificate: string;
    accessKey: string;
};

export const ViewAccessDialogContent = ({ certificate, accessKey }: ViewAccessDialogContentProps) => {
    return (
        <>
            <ContentSection hideDivider title='Access Certificate'>
                <TextCopyBox instructions={certificate} />
            </ContentSection>
            <ContentSection title='Access Key'>
                <TextCopyBox instructions={accessKey} />
            </ContentSection>
        </>
    );
};
