// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper } from '@mui/material';

import { Icon } from '../../index';

/**
 * The icon to display when the detail panel is collapsed.
 */
export const DetailPanelExpandIcon = () => <Icon icon='ExpandMore' size='medium' />;

/**
 * The icon to display when the detail panel is expanded.
 */
export const DetailPanelCollapseIcon = () => <Icon icon='ExpandLess' size='medium' />;

/**
 * The props for a {@link DataGridDetailPanel} component.
 */
export type DataGridDetailPanelProps = {
    /**
     * The content to display in the detail panel.
     */
    content: string;
};

/**
 * Detail panel component for the DataGrid.
 * @param {DataGridDetailPanelProps} props - The {@link DataGridDetailPanelProps}.
 * @returns A {@link DataGridDetailPanel} component.
 */
export const DataGridDetailPanel = ({ content }: DataGridDetailPanelProps) =>
    <Paper sx={{ pl: 7.5, py: 1 }}>
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {content}
        </pre>
    </Paper>;
