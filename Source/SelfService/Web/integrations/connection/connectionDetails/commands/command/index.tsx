// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { AlertBox, Button, ContentContainer, ContentHeader } from '@dolittle/design-system';

import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { CommandForm } from './CommandForm';
import { CommandDetailSection } from './CommandDetailSection';
import { CommandSearchSection, ProgramsListingEntry } from './CommandSearchSection';
import { CommandSection } from './CommandSection';

export const CommandView = () => {
    const navigate = useNavigate();
    const connectionId = useConnectionIdFromRoute();

    const [searchInputValue, setSearchInputValue] = useState('');
    const [selectedProgramName, setSelectedProgramName] = useState('');

    const handleCommandCancel = () => {
        navigate('..');
    };

    const handleRowClick = (row: ProgramsListingEntry) => {
        setSelectedProgramName(row.name);
    };

    return (
        <ContentContainer>
            <ContentHeader
                title='Create New Command'
                buttonsSlot={
                    <Button label='Cancel' startWithIcon='CancelRounded' color='subtle' onClick={handleCommandCancel} />
                }
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
