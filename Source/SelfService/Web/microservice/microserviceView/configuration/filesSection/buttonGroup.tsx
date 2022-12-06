// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Button } from '@dolittle/design-system/atoms/Button';

import { Box } from '@mui/material';
import { AddCircle, DeleteRounded, DownloadRounded } from '@mui/icons-material';

type ButtonGroupProps = {
    filePrompt: () => void;
    deleteDisabled: boolean;
    downloadDisabled: boolean;
    handleDelete: () => void;
    handleDownload: () => void;
};

export const ButtonGroup = ({ filePrompt, deleteDisabled, downloadDisabled, handleDelete, handleDownload }: ButtonGroupProps) =>
    <Box sx={{ mb: 2.875, button: { 'mr': 6.25, '&:last-of-type': { mr: 0 } } }}>
        <Button
            variant='text'
            label='Add File(s)'
            startWithIcon={<AddCircle />}
            onClick={filePrompt}
        />
        <Button
            variant='text'
            label='Delete File(s)'
            disabled={deleteDisabled}
            startWithIcon={<DeleteRounded />}
            onClick={handleDelete}
        />

        <Button
            variant='text'
            label={`Download files`}
            disabled={downloadDisabled}
            startWithIcon={<DownloadRounded />}
            onClick={handleDownload}
        />
    </Box>;
