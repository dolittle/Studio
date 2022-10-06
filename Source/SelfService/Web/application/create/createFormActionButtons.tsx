// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button } from '@mui/material';
import { themeDark } from '@dolittle/design-system';

const styles = {
    actionBtnWrapper: {
        [themeDark.breakpoints.down('sm')]: {
            mt: 7.5
        },
    },
    actionButtons: {
        color: 'text.primary',
        fontSize: '0.875rem',
        letterSpacing: '0.06em'
    },
};

export type CreateFormActionButtonsProps = {
    handleOnSubmit: () => Promise<void>
};

export const CreateFormActionButtons = ({ handleOnSubmit }: CreateFormActionButtonsProps) => {
    const history = useHistory();

    const handleCancel = () => {
        const href = `/applications`;
        history.push(href);
    };

    return (
        <Box sx={styles.actionBtnWrapper}>
            <Button variant='text'
                sx={{ ...styles.actionButtons, mr: 8 }}
                onClick={handleCancel}
            >
                Cancel
            </Button>

            <Button variant='text'
                sx={{ ...styles.actionButtons, color: 'primary.main' }}
                onClick={handleOnSubmit}
            >
                Create
            </Button>
        </Box>
    );
};
