// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Tooltip } from '@mui/material';
import { DeleteRounded, EditRounded, SaveRounded, RestartAltRounded } from '@mui/icons-material';

import { Button } from '@dolittle/design-system';

type HeaderButtonsProps = {
    handleRestartDialog: () => void;
    handleDeleteDialog: () => void;
    disabled?: boolean;
    sx: SxProps;
};

export const HeaderButtons = ({ handleRestartDialog, handleDeleteDialog, disabled, sx }: HeaderButtonsProps) =>
    <Box>
        <Tooltip title='Coming soon!' placement='top' arrow>
            <span>
                <Button
                    label='edit'
                    disabled={disabled}
                    startWithIcon={<EditRounded />}
                    //onClick={() => setFormIsNotEditable(false)}
                    sx={sx}
                />
            </span>
        </Tooltip>
        <Tooltip title='Coming soon!' placement='top' arrow>
            <span>
                <Button
                    label='save'
                    disabled={disabled}
                    startWithIcon={<SaveRounded />}
                    //onClick={() => setFormIsNotEditable(true)}
                    sx={sx}
                />
            </span>
        </Tooltip>
        <Button
            label='Restart Microservice'
            startWithIcon={<RestartAltRounded />}
            onClick={handleRestartDialog}
            sx={sx}
        />
        <Button
            label='Delete Microservice'
            startWithIcon={<DeleteRounded />}
            onClick={handleDeleteDialog}
        />
    </Box>;
