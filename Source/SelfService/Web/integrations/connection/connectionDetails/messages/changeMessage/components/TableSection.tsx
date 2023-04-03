// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Button, Icon } from '@dolittle/design-system/';

import { TableListingEntry } from '../../../../../../apis/integrations/generated';

import { ViewModeProps } from '../ViewMode';
import { ContentSection } from './ContentSection';

export type TableSectionProps = ViewModeProps & {
    selectedTable: TableListingEntry;
    onBackToSearchResultsClicked: () => void;
};

export const TableSection = (props: TableSectionProps) => {
    return (
        <ContentSection
            title={`${props.selectedTable.name} Table`}
            beforeHeaderSlot={
                <Button
                    label='Back to Search Results'
                    startWithIcon={<Icon icon='ArrowBack' />}
                    variant='text'
                    color='subtle'
                    sx={{ ml: 1, mt: 2 }}
                    onClick={props.onBackToSearchResultsClicked}
                />
            }
        >
            Table component here
        </ContentSection>
    );
};
