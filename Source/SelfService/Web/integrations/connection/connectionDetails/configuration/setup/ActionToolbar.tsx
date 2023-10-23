// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useReducer } from 'react';

import { useFormState } from 'react-hook-form';

import { Box } from '@mui/material';

import { Button } from '@dolittle/design-system';

import { DeleteConnectorDialog, DeleteConnectorDialogState, deleteConnectorDialogReducer } from './DeleteConnectorDialog';

export type ActionToolbarProps = {
    canEdit: boolean;
    alwaysEdit?: boolean;
    onEditAction?: () => void;
    onDeleteAction?: () => void;
    onCancelAction?: () => void;
    connectionId: string;
    connectorName: string;
};

export const ActionToolbar = ({ connectionId, connectorName, onEditAction, onDeleteAction, onCancelAction, canEdit = false, alwaysEdit = false }: ActionToolbarProps) => {
    const { isValid, isDirty } = useFormState();
    const initialDialogState: DeleteConnectorDialogState = { open: false, connectionId, connectorName, isLoading: false };
    const [dialogState, dispatch] = useReducer(deleteConnectorDialogReducer, initialDialogState);

    const handleConnectionDelete = () => {
        dispatch({
            type: 'open',
            payload: {
                connectionId,
                connectorName,
            },
        });
    };

    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            {canEdit
                ? <Button label={'Cancel'} startWithIcon='CancelRounded' onClick={onCancelAction} type='reset' disabled={alwaysEdit} />
                : <Button label='Edit' startWithIcon='EditRounded' onClick={onEditAction} disabled={alwaysEdit} />
            }

            <Button label='Save' startWithIcon='SaveRounded' disabled={!canEdit || !isDirty || !isValid} type='submit' />
            <Button label='Delete Connection' startWithIcon='DeleteRounded' color='error' onClick={handleConnectionDelete} />

            <DeleteConnectorDialog dialogState={dialogState} dispatch={dispatch} handleDelete={() => onDeleteAction?.()} />
        </Box>
    );
};
