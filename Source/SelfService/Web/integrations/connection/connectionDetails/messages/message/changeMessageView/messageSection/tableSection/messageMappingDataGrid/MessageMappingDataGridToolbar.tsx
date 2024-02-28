// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DataGridCustomToolbar, NewSwitch } from '@dolittle/design-system';

export type MessageMappingDataGridToolbarProps = {
    tableName: string;
    shouldHideUnselectedRows: boolean;
    onHideUnselectedRowsChange: (hideUnselectedRows: boolean) => void;
};

export const MessageMappingDataGridToolbar = ({ tableName, shouldHideUnselectedRows, onHideUnselectedRowsChange }: MessageMappingDataGridToolbarProps) =>
    <DataGridCustomToolbar title={`${tableName} table fields`}>
        <NewSwitch
            id='hideUnselectedRows'
            label='Hide Unselected Rows'
            checked={shouldHideUnselectedRows}
            onChange={event => onHideUnselectedRowsChange(event.target.checked)}
        />
    </DataGridCustomToolbar>;
