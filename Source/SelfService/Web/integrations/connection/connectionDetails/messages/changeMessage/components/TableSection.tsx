// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { TableListingEntry } from '../../../../../../apis/integrations/generated';
import { ViewModeProps } from '../ViewMode';
import { ContentSection } from './ContentSection';

export type TableSectionProps = ViewModeProps & {
    selectedTable: TableListingEntry;
};

export const TableSection = (props: TableSectionProps) => {
    return (
        <ContentSection title={`${props.selectedTable.name} Table`}>
            Table component here
        </ContentSection>
    );
};
