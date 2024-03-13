// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { GridRowId } from '@mui/x-data-grid-pro';

import { NewCommandForm } from './NewCommandForm';
import { NewCommandDetailSection } from './NewCommandDetailSection';
import { CommandSearchSection, ProgramsListingEntry } from './CommandSearchSection';
import { CommandSection } from './commandSection';

export type NewCommandViewProps = {
    connectionId: string;
};

export const NewCommandView = ({ connectionId }: NewCommandViewProps) => {
    const [commandSearchInputValue, setCommandSearchInputValue] = useState('');
    const [selectedProgramName, setSelectedProgramName] = useState('');
    const [selectedTransactionName, setSelectedTransactionName] = useState<GridRowId[]>([]);

    const handleRowClick = (row: ProgramsListingEntry) => {
        setSelectedProgramName(row.name);
    };

    return (
        <NewCommandForm
            connectionId={connectionId}
            selectedProgramName={selectedProgramName}
            selectedTransactionName={selectedTransactionName[0] as string}
        >
            <NewCommandDetailSection />

            {selectedProgramName
                ? <CommandSection
                    selectedProgramName={selectedProgramName}
                    selectedTransactionName={selectedTransactionName}
                    onSelectedTransactionNameChanged={setSelectedTransactionName}
                    onBackToSearchResultsClicked={() => setSelectedProgramName('')}
                />
                : <CommandSearchSection
                    connectionId={connectionId}
                    searchInputValue={commandSearchInputValue}
                    onSearchInputValueChange={setCommandSearchInputValue}
                    onRowClick={handleRowClick}
                />
            }
        </NewCommandForm>
    );
};
