// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';
import { useHref } from 'react-router-dom';
import { useFormState } from 'react-hook-form';
import { Button } from '@dolittle/design-system';
import { ConnectionModel } from '../../../../apis/integrations/generated';

export type ActionButtonsProps = {
    connection: ConnectionModel;

};

export const ActionButtons = ({ connection }: ActionButtonsProps) => {
    const { isValid, isDirty, isSubmitting } = useFormState();
    const messageHref = useHref('../messages');

    const isConnected = connection?.status.name === 'Connected';

    return <Box sx={{ my: 5 }}>
        <Button
            label='Save connection'
            disabled={!isValid || !isDirty || isSubmitting }
            type='submit'
            sx={{ mr: 3 }} />

        <Button
            label='Start Mapping Data'
            variant='filled'
            disabled={!isConnected}
            href={messageHref} />
    </Box>;
};
