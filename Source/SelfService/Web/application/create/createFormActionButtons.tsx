// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';

import { themeDark } from '../../theme/theme';
import { Box, Button } from '@mui/material';

const styles = {
    actionBtnWrapper: {
        [themeDark.breakpoints.down('sm')]: {
            marginBlockStart: '60px'
        },
    },
    actionButtons: {
        color: themeDark.palette.text.primary,
        fontSize: '0.875rem',
        letterSpacing: '0.06em'
    },
};

// TODO: Add types
export const CreateFormActionButtons = ({ onSubmit }: any) => {
    const history = useHistory();

    const handleCancel = () => {
        const href = `/applications`;
        history.push(href);
    };

    const { actionBtnWrapper, actionButtons } = styles;
    return (
        <Box sx={actionBtnWrapper}>
            <Button variant='text'
                sx={{ ...actionButtons, marginInlineEnd: '64px' }}
                onClick={handleCancel}
            >
                Cancel
            </Button>

            <Button variant='text'
                sx={{ ...actionButtons, color: themeDark.palette.primary.main }}
                onClick={onSubmit}
            >
                Create
            </Button>
        </Box>
    );
};
