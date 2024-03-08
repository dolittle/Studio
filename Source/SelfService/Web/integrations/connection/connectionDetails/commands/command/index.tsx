// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { GridRowId } from '@mui/x-data-grid-pro';

import { Button, ContentContainer, ContentHeader, Form } from '@dolittle/design-system';

import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { CommandForm } from './CommandForm';
import { CommandDetailSection } from './CommandDetailSection';
import { CommandSearchSection, ProgramsListingEntry } from './CommandSearchSection';
import { CommandSection } from './commandSection';
import { EditCommandSection } from './commandsListDetailPanel';

export type ViewMode = 'new' | 'edit';

export const CommandView = () => {
    const navigate = useNavigate();
    const connectionId = useConnectionIdFromRoute();
    const { commandName = '' } = useParams();

    const [searchInputValue, setSearchInputValue] = useState('');
    const [selectedProgramName, setSelectedProgramName] = useState('');
    const [selectedTransactionName, setSelectedTransactionName] = useState<GridRowId[]>([]);

    const mode: ViewMode = location.pathname.endsWith('new') ? 'new' : 'edit';
    const title = mode === 'new' ? 'Create New Command' : `Edit Command - ${commandName}`;
    //const showTable = !!table || mode === 'edit';

    const handleCommandCancel = () => {
        navigate('..');
    };

    const handleRowClick = (row: ProgramsListingEntry) => {
        setSelectedProgramName(row.name);
    };

    const handleEditCommandSave = (values: any) => {
        console.log(values);
    };

    return (
        <ContentContainer>
            <ContentHeader
                title={title}
                buttonsSlot={<Button label='Cancel' startWithIcon='CancelRounded' color='subtle' onClick={handleCommandCancel} />}
                sx={{ pb: 0 }}
            />

            {mode === 'new'
                ? <CommandForm
                    connectionId={connectionId}
                    selectedProgramName={selectedProgramName}
                    selectedTransactionName={selectedTransactionName[0] as string}
                >
                    <CommandDetailSection />

                    {selectedProgramName
                        ? <CommandSection
                            selectedProgramName={selectedProgramName}
                            selectedTransactionName={selectedTransactionName}
                            onSelectedTransactionNameChanged={setSelectedTransactionName}
                            onBackToSearchResultsClicked={() => setSelectedProgramName('')}
                        />
                        : <CommandSearchSection
                            connectionId={connectionId}
                            searchInputValue={searchInputValue}
                            onSearchInputValueChange={setSearchInputValue}
                            onRowClick={handleRowClick}
                        />
                    }
                </CommandForm>
                : <Form
                    initialValues={{
                        commandName: commandName || '',
                        commandDescription: '',
                        namespace: '',
                    }}
                    onSubmit={handleEditCommandSave}
                >
                    <CommandDetailSection />

                    <EditCommandSection />
                </Form>
            }
        </ContentContainer>
    );
};
