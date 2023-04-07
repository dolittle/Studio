// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Tooltip } from '@mui/material';

import { Button } from '@dolittle/design-system';

const styles = {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'start',
    mb: 2,
    button: { mr: 2.5, mb: 1 },
};

type HeaderButtonsProps = {
    handleRestartDialog: () => void;
    handleDeleteDialog: () => void;
    disabled?: boolean;
};

export const HeaderButtons = ({ handleRestartDialog, handleDeleteDialog, disabled }: HeaderButtonsProps) =>
    <Box sx={styles}>
        <Tooltip title='Coming soon!' placement='top' arrow>
            <span>
                <Button
                    label='edit'
                    disabled={disabled}
                    startWithIcon='EditRounded'
                //onClick={() => setFormIsNotEditable(false)}
                />
            </span>
        </Tooltip>
        <Tooltip title='Coming soon!' placement='top' arrow>
            <span>
                <Button
                    label='save'
                    disabled={disabled}
                    startWithIcon='SaveRounded'
                //onClick={() => setFormIsNotEditable(true)}
                />
            </span>
        </Tooltip>
        <Button
            label='Restart Microservice'
            startWithIcon='RestartAltRounded'
            onClick={handleRestartDialog}
        />
        <Button
            label='Delete Microservice'
            startWithIcon='DeleteRounded'
            onClick={handleDeleteDialog}
        />
    </Box>;
