// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Box, Grid, LinearProgress } from '@mui/material';

import { AlertBox, Button, ContentSection, TextField } from '@dolittle/design-system/';

import { MappedField } from '../../../../../../apis/integrations/generated';
import { useConnectionsIdMessageMappingsTablesTableGet } from '../../../../../../apis/integrations/mappableTablesApi.hooks';
import { useConnectionIdFromRoute } from '../../../../../routes.hooks';

import { ViewModeProps } from '../ViewMode';
import { MessageMappingDataGrid } from './messageMappingDataGrid';

export type TableSectionProps = ViewModeProps & {
    selectedTableName: string;
    initialSelectedFields: MappedField[];
    onBackToSearchResultsClicked: () => void;
};

export const TableSection = ({ selectedTableName, initialSelectedFields, onBackToSearchResultsClicked, mode }: TableSectionProps) => {
    const connectionId = useConnectionIdFromRoute();

    const [fieldSearchTerm, setFieldSearchTerm] = useState('');

    if (!selectedTableName) return <AlertBox />;

    const { data: mappableTableResult, isLoading, isInitialLoading } = useConnectionsIdMessageMappingsTablesTableGet({
        id: connectionId,
        table: selectedTableName,
    });

    return (
        <>
            {isInitialLoading ? <LinearProgress /> : (
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
                    {!mappableTableResult?.value ? <AlertBox /> : (
                        <>
                            <Box sx={{ py: 3 }}>
                                {`This displays all the M3 fields available for this table. Primary fields are necessary for the message type and have already been selected.
                                You can remap the M3 Description by adding a remapped name that makes sense for your organization’s business logic. `}
                            </Box>

                            <Grid container gap={4} sx={{ py: 3, justifyContent: 'space-between', justifyItems: 'center', }}>
                                <TextField
                                    startIcon='Search'
                                    variant='outlined'
                                    placeholder='Search fields'
                                    onValueChange={event => setFieldSearchTerm(event.target.value)}
                                    sx={{ flexGrow: 1 }}
                                />
                            </Grid>

                            <MessageMappingDataGrid
                                tableName={selectedTableName}
                                mode={mode}
                                quickFilterValue={fieldSearchTerm}
                                initialSelectedFields={initialSelectedFields}
                                mappableTableResult={mappableTableResult}
                                isLoading={isLoading}
                            />
                        </>
                    )}
                </ContentSection>
            )}
        </>
    );
};
