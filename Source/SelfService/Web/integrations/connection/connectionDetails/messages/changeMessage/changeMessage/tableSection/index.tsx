// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { LinearProgress } from '@mui/material';

import { AlertBox, Button, ContentSection } from '@dolittle/design-system/';

import { MappedField } from '../../../../../../../apis/integrations/generated';
import { useConnectionsIdMessageMappingsTablesTableGet } from '../../../../../../../apis/integrations/mappableTablesApi.hooks';
import { useConnectionIdFromRoute } from '../../../../../../routes.hooks';

import { ViewModeProps } from '../../ViewMode';
import { MappedTableResult } from './MappedTableResult';

export type TableSectionProps = ViewModeProps & {
    selectedTableName: string;
    initialSelectedFields: MappedField[];
    onBackToSearchResultsClicked: () => void;
};

export const TableSection = ({ selectedTableName, mode, initialSelectedFields, onBackToSearchResultsClicked }: TableSectionProps) => {
    const connectionId = useConnectionIdFromRoute();

    if (!selectedTableName) return <AlertBox />;

    const { data: mappableTableResult, isLoading, isInitialLoading } = useConnectionsIdMessageMappingsTablesTableGet({
        id: connectionId,
        table: selectedTableName,
    });

    if (isInitialLoading) return <LinearProgress />;

    return (
        <ContentSection
            title={`${selectedTableName} Table`}
            beforeHeaderSlot={
                mode === 'new' &&
                <Button
                    label='Back to Search Results'
                    startWithIcon='ArrowBack'
                    variant='text'
                    color='subtle'
                    sx={{ ml: 1, mt: 2 }}
                    onClick={onBackToSearchResultsClicked}
                />
            }
        >
            {!mappableTableResult?.value
                ? <AlertBox />
                : <MappedTableResult
                    selectedTableName={selectedTableName}
                    mode={mode}
                    initialSelectedFields={initialSelectedFields}
                    mappableTableResult={mappableTableResult}
                    isLoading={isLoading}
                />
            }
        </ContentSection>
    );
};
