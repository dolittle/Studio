// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { ViewModeProps } from '../ViewMode';
import { CardSection } from './CardSection';

export type TableSectionProps = ViewModeProps & {
    tableName: string;
};

export const TableSection = (props: TableSectionProps) => {
    return (
        <CardSection title={`${props.tableName} Table`}>
            Table component here
        </CardSection>
    );
};
