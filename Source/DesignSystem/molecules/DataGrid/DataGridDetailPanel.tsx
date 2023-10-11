// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper, Typography } from '@mui/material';

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
     * Whether or not there is content to display.
     */
    noContent: boolean;

    /**
     * The text to display when there is no content.
     */
    noContentMessage: string;

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
export const DataGridDetailPanel = ({ noContent, noContentMessage, content }: DataGridDetailPanelProps) =>
    <Paper>
        {noContent ?
            <Typography variant='body2' sx={{ pl: 7.5, py: 1 }}>
                {noContentMessage}
            </Typography> :
            <pre style={{ padding: '0.5rem 0.625rem 1.1875rem 3rem', margin: '0', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                {content}
            </pre>
        }
    </Paper>;
