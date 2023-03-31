// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { ViewModeProps } from '../ViewMode';
import { ContentSection } from './ContentSection';

export type TableSearchSectionProps = ViewModeProps & {

};

export const TableSearchSection = (props: TableSearchSectionProps) => {
    return (
        <ContentSection title='Browse M3 Table names'>
            Search component here
        </ContentSection>
    );
};
