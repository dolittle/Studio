// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { } from 'react';

import { Box } from '@mui/material';
import { useFormState } from 'react-hook-form';

import { Button } from '@dolittle/design-system';


export type ActionToolbarProps = {
    canEdit: boolean;
    onEdit: () => void;
    onDelete: () => void;
    onCancel: () => void;
};

export const ActionToolbar = ({ onEdit, onDelete, onCancel, canEdit = false }: ActionToolbarProps) => {
    const { isValid } = useFormState();

    return (
        <Box sx={{ display: 'flex', mt: 4, gap: 2 }}>
            {canEdit
                ? <Button label='Cancel' startWithIcon='CancelRounded' onClick={onCancel} />
                : <Button label='Edit' startWithIcon='EditRounded' onClick={onEdit} /> }
            <Button label='Save' startWithIcon='SaveRounded' disabled={!canEdit && isValid} type='submit' />
            <Button label='Delete Connection' startWithIcon='DeleteRounded' onClick={onDelete} />
        </Box>
    );
};
