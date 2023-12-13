// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { GridRowId } from '@mui/x-data-grid-pro';

import { DataGridTableListingEntry } from './MessageMappingDataGridColumns';
import { generateMappedFieldNameFrom } from '../../components/generateMappedFieldNameFrom';

import { toPascalCase } from '../../../../../../../utils/helpers/strings';

export const generateUniqueFieldName = (gridApiRef, fieldName: string, m3ColumnName: string) => {
    const existingMappedFields = Array
        .from(gridApiRef.current?.getSelectedRows() as Map<GridRowId, DataGridTableListingEntry>)
        .map(([, row]) => row.fieldName) || [];
    const machineReadableFieldName = generateMappedFieldNameFrom(toPascalCase(fieldName), m3ColumnName, existingMappedFields);
    return machineReadableFieldName;
};
