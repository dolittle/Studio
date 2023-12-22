// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useDebounce } from 'use-debounce';

import { Typography } from '@mui/material';

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
    const [fieldSearchTerm, setFieldSearchTerm] = useState('');
    const [aigonSearchTerm, setAigonSearchTerm] = useState('');

    const [isAigonSearchActive, setIsAigonSearchActive] = useState(false);

    const [debouncedAigonSearchTerm] = useDebounce(aigonSearchTerm, 500);

    // const query = useConnectionsIdMetadataTableAssistantTableNameColumnRecommendationsGet({
    //     id: connectionId,
    //     tableName: selectedTableName,
    //     userWantsAndNeeds: 'Show me data related to users and timestamps', //debouncedAigonSearchTerm,
    // });

    // const searchResults = query.data;

    // if (query.isLoading) {
    //     console.log('loading');
    // } else {
    //     console.log('searchResults', searchResults);
    // }

    // console.log(fieldSearchTerm, 'fieldSearchTerm');

    return (
        <>
            <Typography gutterBottom>Primary fields are necessary for the message type and have already been selected.</Typography>
            <Typography>{`You can remap the M3 Description by adding a remapped name that makes sense for your organization’s business logic.`}</Typography>

            <InlineWrapper sx={{ py: 3 }}>
                <TextField
                    placeholder='Search fields'
                    isFullWidth
                    startIcon='Search'
                    variant='outlined'
                    onValueChange={event => setFieldSearchTerm(event.target.value)}
                />
                <AigonHelper onAigonActivate={() => setIsAigonSearchActive(true)} />
            </InlineWrapper>

            <AigonSearchBar
                onAigonDeactivate={() => setIsAigonSearchActive(false)}
                onSearchTermChange={event => setAigonSearchTerm(event.target.value)}
            />

            <MessageMappingDataGrid
                tableName={selectedTableName}
                mode={mode}
                quickFilterValue={fieldSearchTerm}
                initialSelectedFields={initialSelectedFields}
                mappableTableResult={mappableTableResult}
                isLoading={isLoading}
            />
        </>
    );
};
