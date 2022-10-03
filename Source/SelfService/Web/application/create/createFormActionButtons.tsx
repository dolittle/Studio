// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button } from '@mui/material';
import { themeDark } from '@dolittle/design-system';

const styles = {
    actionBtnWrapper: {
        [themeDark.breakpoints.down('sm')]: {
            marginBlockStart: '3.75rem'
        },
    },
    actionButtons: {
        color: themeDark.palette.text.primary,
        fontSize: '0.875rem',
        letterSpacing: '0.06em'
    },
};

export type CreateFormActionButtonsProps = {
    handleOnSubmit: () => Promise<void>
};

export const CreateFormActionButtons: React.FC<CreateFormActionButtonsProps> = ({ handleOnSubmit }: CreateFormActionButtonsProps) => {
    const history = useHistory();

    const handleCancel = () => {
        const href = `/applications`;
        history.push(href);
    };

    const { actionBtnWrapper, actionButtons } = styles;
    return (
        <Box sx={actionBtnWrapper}>
            <Button variant='text'
                sx={{ ...actionButtons, marginInlineEnd: '4rem' }}
                onClick={handleCancel}
            >
                Cancel
            </Button>

            <Button variant='text'
                sx={{ ...actionButtons, color: themeDark.palette.primary.main }}
                onClick={handleOnSubmit}
            >
                Create
            </Button>
        </Box>
    );
};
