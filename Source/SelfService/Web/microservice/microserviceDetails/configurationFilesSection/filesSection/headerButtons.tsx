// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';
import { AddCircle, DeleteRounded, DownloadRounded } from '@mui/icons-material';

import { Button } from '@dolittle/design-system';

type HeaderButtonsProps = {
    filePrompt: () => void;
    deleteDisabled: boolean;
    downloadDisabled: boolean;
    handleDelete: () => void;
    handleDownload: () => void;
};

export const HeaderButtons = ({ filePrompt, deleteDisabled, downloadDisabled, handleDelete, handleDownload }: HeaderButtonsProps) =>
    <Box sx={{ mb: 2.875, button: { 'mr': 6.25, '&:last-of-type': { mr: 0 } } }}>
        <Button
            label='Add File(s)'
            startWithIcon={<AddCircle />}
            onClick={filePrompt}
        />
        <Button
            label='Delete File(s)'
            disabled={deleteDisabled}
            startWithIcon={<DeleteRounded />}
            onClick={handleDelete}
        />

        <Button
            label={`Download Configuration Files Yaml`}
            disabled={downloadDisabled}
            startWithIcon={<DownloadRounded />}
            onClick={handleDownload}
        />
    </Box>;
