// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

//import { useLocation, useParams } from 'react-router-dom';

import { AlertBox, ContentContainer, ContentHeader, Form } from '@dolittle/design-system';

import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { CommandForm } from './CommandForm';
import { CommandDetailSection } from './CommandDetailSection';
import { CommandSearchSection } from './CommandSearchSection';
import { CommandSection } from './CommandSection';

type ProgramsListingEntry = {
    name: string;
    description: string;
    transactionCount: string;
};

type NewCommandFormParameters = {
    commandName: string;
    namespace: string;
    description: string;
};

export const CommandView = () => {
    const connectionId = useConnectionIdFromRoute();

    const [searchInputValue, setSearchInputValue] = useState('');
    const [selectedProgramName, setSelectedProgramName] = useState('');

    const title = 'Create New Command';

    const handleRowClick = (row: ProgramsListingEntry) => {
        setSelectedProgramName(row.name);
    };

    return (
        <ContentContainer>
            <ContentHeader
                title={title}
                // buttonsSlot={
                //     <CancelOrDiscardButton onCancelled={handleMessageMappingCancel} onDiscarded={() => setShowDiscardChangesDialog(true)} />
                // }
                sx={{ pb: 0 }}
            />

            <CommandForm>
                <CommandDetailSection />

                {!selectedProgramName
                    ? <CommandSearchSection connectionId={connectionId} searchInputValue={searchInputValue} onSearchInputValueChange={setSearchInputValue} onRowClick={handleRowClick} />
                    : <CommandSection connectionId={connectionId} selectedProgramName={selectedProgramName} />
                }
            </CommandForm>
        </ContentContainer>
    );
};
