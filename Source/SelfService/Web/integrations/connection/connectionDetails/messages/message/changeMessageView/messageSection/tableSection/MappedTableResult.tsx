// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useDebounce } from 'use-debounce';

import { alpha, Box, Fade, InputAdornment, LinearProgress, Typography } from '@mui/material';

import { AigonHelperIcon, Icon, IconButton, InlineWrapper, TextField } from '@dolittle/design-system/';

import { MappedField } from '../../../../../../../../apis/integrations/generated';
import { useConnectionsIdMetadataTableAssistantTableNameColumnRecommendationsGet } from '../../../../../../../../apis/integrations/tableMetadataAssistant.hooks';

import { ViewMode } from '../../../ViewMode';
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
    const [aigonSearchTerm, setAigonSearchTerm] = useState('');

    const [debouncedAigonSearchTerm] = useDebounce(aigonSearchTerm, 2000);

    // This query does not run when the aigonSearchTerm.trim() length is less than 5. This is set in the query hook.
    const { data: aiSearchResult, isInitialLoading } = useConnectionsIdMetadataTableAssistantTableNameColumnRecommendationsGet({
        id: connectionId,
        tableName: selectedTableName,
        userWantsAndNeeds: debouncedAigonSearchTerm,
    });

    const allMappableTableRows = mappableTableResult?.value?.columns || [];
    const aiFilteredRows = allMappableTableRows.filter(row => aiSearchResult?.recommendations?.find(({ name }) => row.m3ColumnName === name));
    const mappableTableDataGridRows = isAigonSearchActive && aigonSearchTerm.trim().length > 5 ? aiFilteredRows : allMappableTableRows;

    const handleAigonSearchActivate = () => {
        setFieldSearchTerm('');
        setIsAigonSearchActive(true);
    };

    const handleAigonSearchDeactivate = () => {
        setIsAigonSearchActive(false);
        setAigonSearchTerm('');
    };

    return (
        <>
            <Typography gutterBottom>Primary fields are necessary for the message type and have already been selected.</Typography>
            <Typography>{`You can remap the M3 Description by adding a remapped name that makes sense for your organization’s business logic.`}</Typography>

            {isAigonSearchActive
                ? <AigonSearchBar isAigonSearchActive={isAigonSearchActive} onAigonDeactivate={handleAigonSearchDeactivate} onSearchTermChange={event => setAigonSearchTerm(event.target.value)} />
                : <SearchBarWithAigonIcon onAigonActivate={handleAigonSearchActivate} onSearchTermChange={event => setFieldSearchTerm(event.target.value)} />
            }

            {isInitialLoading && isAigonSearchActive
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

export type SearchBarWithAigonIconProps = {
    onAigonActivate: () => void;
    onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBarWithAigonIcon = ({ onAigonActivate, onSearchTermChange }: SearchBarWithAigonIconProps) =>
    <InlineWrapper sx={{ py: 3 }}>
        <TextField
            placeholder='Search fields'
            isFullWidth
            startIcon='Search'
            variant='outlined'
            onValueChange={onSearchTermChange}
        />

        <AigonHelperIcon onAigonActivate={onAigonActivate} />
    </InlineWrapper>;

export type AigonSearchBarProps = {
    isAigonSearchActive: boolean;
    onAigonDeactivate: () => void;
    onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// TODO:
// Wrap it with Form and add submit button
// Replace TextField with Input
// Move to Design System
// ...
export const AigonSearchBar = ({ isAigonSearchActive, onAigonDeactivate, onSearchTermChange }: AigonSearchBarProps) =>
    <Fade in={isAigonSearchActive} timeout={700} mountOnEnter unmountOnExit>
        <Box sx={{ py: 3.6 }}>
            <TextField
                id='aigonSearchBar'
                label='AI-assisted field filtering'
                placeholder='Please show me data related to users and timestamps'
                isFullWidth
                onValueChange={onSearchTermChange}
                overrides={{
                    InputProps: {
                        autoFocus: true,
                        startAdornment:
                            <InputAdornment position='start'>
                                <Icon icon='Search' color='primary' />
                            </InputAdornment>,
                        endAdornment:
                            <InputAdornment position='end'>
                                <IconButton tooltipText='Switch back to normal field filtering' icon='AigonIcon' edge='end' onClick={onAigonDeactivate} />
                            </InputAdornment>,
                    },
                }}
                sx={{ backgroundColor: theme => alpha(theme.palette.primary.main, 0.5) }}
            />
        </Box>
    </Fade>;
