// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper, SxProps, Typography } from '@mui/material';

import { Button } from '@dolittle/design-system';

/**
 * The props for a {@link DataGridEmptyStateProps} component.
 */
export type DataGridEmptyStateProps = {
    /**
     * The title to display in the empty state.
     */
    title: string;

    /**
     * The description to display in the empty state.
     */
    description: string;

    /**
     * The label to display on the button in the empty state.
     */
    label: string;

    /**
     * The callback to execute when the button in the empty state is clicked.
     */
    onCreate: () => void;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

/**
 * Custom empty state component for the DataGrid.
 * @param {DataGridEmptyStateProps} props - The {@link DataGridEmptyStateProps}.
 * @returns A {@link DataGridEmptyState} component.
 */
export const DataGridEmptyState = ({ title, description, label, onCreate, sx }: DataGridEmptyStateProps) =>
    <Paper sx={{ p: 2, boxShadow: 'none', ...sx }}>
        <Typography variant='h2'>{title}</Typography>
        <Typography variant='body1' sx={{ my: 2 }}>{description}</Typography>
        <Button label={label} variant='fullwidth' startWithIcon='AddCircle' onClick={onCreate} />
    </Paper>;
