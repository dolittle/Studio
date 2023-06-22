// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { useFormState } from 'react-hook-form';

import { Button } from '@dolittle/design-system';


export type ActionToolbarProps = {
    canEdit: boolean;
    onEditAction?: () => void;
    onDeleteAction?: () => void;
    onCancelAction?: () => void;
};

export const ActionToolbar = ({ onEditAction, onDeleteAction, onCancelAction, canEdit = false }: ActionToolbarProps) => {
    const { isValid, isDirty } = useFormState();

    return (
        <Box sx={{ display: 'flex', mt: 4, gap: 2 }}>
            {canEdit
                ? <Button label={'Cancel'} startWithIcon='CancelRounded' onClick={onCancelAction} type='reset' />
                : <Button label='Edit' startWithIcon='EditRounded' onClick={onEditAction} />}
            <Button
                label='Save'
                startWithIcon='SaveRounded'
                disabled={!canEdit || !isDirty || !isValid}
                type='submit'
            />
            <Button label='Delete Connection' startWithIcon='DeleteRounded' onClick={onDeleteAction} />
        </Box>
    );
};
