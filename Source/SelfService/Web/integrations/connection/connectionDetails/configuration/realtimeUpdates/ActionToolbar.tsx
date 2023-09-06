// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useReducer } from 'react';

import { useFormState } from 'react-hook-form';

import { Box } from '@mui/material';

import { Button } from '@dolittle/design-system';

export type ActionToolbarProps = {
    canEdit: boolean;
    onEditAction?: () => void;
    onCancelAction?: () => void;
};

export const ActionToolbar = ({ onEditAction, onCancelAction, canEdit = false,  }: ActionToolbarProps) => {
    // const { isValid, isDirty } = useFormState();

    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            {canEdit
                ? <Button label={'Cancel'} startWithIcon='CancelRounded' onClick={onCancelAction} type='reset'/>
                : <Button label='Edit' startWithIcon='EditRounded' onClick={onEditAction}/>}
            <Button
                label='Save'
                startWithIcon='SaveRounded'
                // disabled={!canEdit || !isDirty || !isValid}
                type='submit'
            />
        </Box>
    );
};
