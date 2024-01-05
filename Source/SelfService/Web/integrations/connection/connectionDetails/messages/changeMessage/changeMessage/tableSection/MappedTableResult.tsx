// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useDebounce } from 'use-debounce';

import { Box, Fade, LinearProgress, Typography } from '@mui/material';

import { AigonHelper, AigonSearchBar, InlineWrapper, TextField } from '@dolittle/design-system/';

import { MappedField } from '../../../../../../../apis/integrations/generated';
import { useConnectionsIdMetadataTableAssistantTableNameColumnRecommendationsGet } from '../../../../../../../apis/integrations/tableMetadataAssistant.hooks';

import { ViewMode } from '../../ViewMode';
import { MessageMappingDataGrid } from './messageMappingDataGrid';

export type MappedTableResultProps = {
    connectionId: string;
    selectedTableName: string;
    mode: ViewMode;
    initialSelectedFields: MappedField[];
    mappableTableResult: any;
    isLoading: boolean;
};

export const MappedTableResult = ({ connectionId, selectedTableName, mode, initialSelectedFields, mappableTableResult, isLoading }: MappedTableResultProps) => {
    const [isAigonSearchActive, setIsAigonSearchActive] = useState(false);
    const [fieldSearchTerm, setFieldSearchTerm] = useState('');
    const [aigonSearchTerm, setAigonSearchTerm] = useState(''); // 'Show me data related to users and timestamps',

    const [debouncedAigonSearchTerm] = useDebounce(aigonSearchTerm, 5000);

    // This query does not run when the aigonSearchTerm.trim() length is less than 5. This is set in the query hook.
    const { data: aiSearchResult, isInitialLoading } = useConnectionsIdMetadataTableAssistantTableNameColumnRecommendationsGet({
        id: connectionId,
        tableName: selectedTableName,
        userWantsAndNeeds: debouncedAigonSearchTerm,
    });

    const allMappableTableRows = mappableTableResult?.value?.columns || [];
    const aiFilteredRows = allMappableTableRows.filter(row => aiSearchResult?.recommendations?.find(({ name }) => row.m3ColumnName === name));
    const mappableTableDataGridRows = isAigonSearchActive && aigonSearchTerm.length > 5 ? aiFilteredRows : allMappableTableRows;

    return (
        <>
            <Typography gutterBottom>Primary fields are necessary for the message type and have already been selected.</Typography>
            <Typography>{`You can remap the M3 Description by adding a remapped name that makes sense for your organization’s business logic.`}</Typography>

            {isAigonSearchActive
                ? (
                    <Fade in={isAigonSearchActive} timeout={1000} mountOnEnter unmountOnExit>
                        <Box sx={{ py: 3.6 }}>
                            <AigonSearchBar
                                onAigonDeactivate={() => {
                                    setIsAigonSearchActive(false);
                                    setAigonSearchTerm('');
                                }}
                                onSearchTermChange={event => setAigonSearchTerm(event.target.value)}
                            />
                        </Box>
                    </Fade>
                ) : (
                    <InlineWrapper sx={{ py: 3 }}>
                        <TextField
                            placeholder='Search fields'
                            isFullWidth
                            startIcon='Search'
                            variant='outlined'
                            onValueChange={event => setFieldSearchTerm(event.target.value)}
                        />

                        <AigonHelper
                            onAigonActivate={() => {
                                setFieldSearchTerm('');
                                setIsAigonSearchActive(true);
                            }}
                        />
                    </InlineWrapper>
                )
            }

            {isInitialLoading && isAigonSearchActive || mappableTableDataGridRows.length === 0
                ? <LinearProgress />
                : <MessageMappingDataGrid
                    tableName={selectedTableName}
                    mode={mode}
                    mappableTableDataGridRows={mappableTableDataGridRows}
                    quickFilterValue={fieldSearchTerm}
                    initialSelectedFields={initialSelectedFields}
                    mappableTableResult={mappableTableResult}
                    isLoading={isLoading}
                />
            }
        </>
    );
};
