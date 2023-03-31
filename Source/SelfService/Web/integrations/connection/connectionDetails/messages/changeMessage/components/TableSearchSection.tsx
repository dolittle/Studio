// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { ViewModeProps } from '../ViewMode';
import { CardSection } from './CardSection';

export type TableSearchSectionProps = ViewModeProps & {

};

export const TableSearchSection = (props: TableSearchSectionProps) => {
    return (
        <CardSection title='Browse M3 Table names'>
            Search component here
        </CardSection>
    );
};
