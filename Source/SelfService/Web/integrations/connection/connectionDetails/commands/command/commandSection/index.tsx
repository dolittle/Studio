// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Typography } from '@mui/material';
import { GridRowId } from '@mui/x-data-grid-pro';

import { Button, ContentDivider, ContentWithSubtitle } from '@dolittle/design-system';

import { TransactionsDataGrid } from './TransactionsDataGrid';

export type CommandSectionProps = {
    selectedProgramName: string;
    selectedTransactionName: GridRowId[];
    onSelectedTransactionNameChanged: (newSelectedTransactionName: GridRowId[]) => void;
    onBackToSearchResultsClicked: () => void;
};

export const CommandSection = ({ selectedProgramName, selectedTransactionName, onSelectedTransactionNameChanged, onBackToSearchResultsClicked }: CommandSectionProps) =>
    <ContentWithSubtitle
        title={`Selected program: ${selectedProgramName}`}
        rightAction={<Button label='Back To Search Results' startWithIcon='ArrowBack' color='subtle' onClick={onBackToSearchResultsClicked} />}
    >
        <Typography sx={{ mb: 4 }}>{`This displays all the transactions that are available for '${selectedProgramName}' program.`}</Typography>

        <TransactionsDataGrid
            selectedProgramName={selectedProgramName}
            selectedTransactionName={selectedTransactionName}
            onSelectedTransactionNameChanged={onSelectedTransactionNameChanged}
        />

        <ContentDivider sx={{ mt: 3 }} />

        <Button label='Save New Command' variant='fullwidth' type='submit' disabled={!selectedTransactionName.length} sx={{ mt: 2 }} />
    </ContentWithSubtitle>;
