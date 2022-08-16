// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Button, Theme } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

const styles = {
    letterSpacing: '0.06em',
    fontWeight: 500,
    color: (theme: Theme) => theme.palette.primary.main
};

type CreateButtonProps = {
    onCreate: () => void
};

export const CreateButton = ({ onCreate }: CreateButtonProps) => (
    <Box sx={{ inlineSize: '100%' }}>
        <Button
            variant='text'
            startIcon={<AddCircle />}
            sx={styles}
            onClick={onCreate}>
            Create new Application
        </Button>
    </Box>
);
