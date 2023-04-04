// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { AlertDialog, Form, Icon } from '@dolittle/design-system';

import { TableListingEntry } from '../../../../../apis/integrations/generated';

import { ViewMode } from './ViewMode';
import { ContentContainer } from './components/ContentContainer';
import { ContentHeader } from './components/ContentHeader';
import { TableSearchSection } from './components/TableSearchSection';
import { MessageDetailsSection } from './components/MessageDetailsSection';
import { TableSection } from './components/TableSection';

export type NewMessageMappingParameters = {
    name: string;
    description: string;
    messageTypeName: string;
    messageTypeDescription: string;
};

export const ChangeMessageView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { messageId } = useParams();

    const [searchInput, setSearchInput] = useState<string>('');
    const [selectedTable, setSelectedTable] = useState<TableListingEntry>();
    const [showDiscardChangesDialog, setShowDiscardChangesDialog] = useState(false);

    const mode: ViewMode = location.pathname.endsWith('new') ? 'new' : 'edit';
    const showTable = !!selectedTable;
    const title = mode === 'new' ? 'Create New Message Type' : 'Edit Message';

    const toolbarButtons = {
        label: 'Discard changes',
        startWithIcon: <Icon icon='CancelRounded' />,
        color: 'subtle',
        onClick: () => setShowDiscardChangesDialog(true),
    } as const;

    // TODO: Implement this.
    // Prevent the user from accidentally closing the browser tab if they have unsaved changes.

    // window.addEventListener('beforeunload', (event) => {
    //     event.preventDefault();
    //     return event.returnValue = 'Are you sure you want to close?';
    // });

    // TODO: Implement this.
    const cancelMessageMapping = () => {
        setShowDiscardChangesDialog(false);

        if (mode === 'new') navigate('/integrations/connections');
        else navigate(`/integrations/connections/${messageId}`);
    };

    const handleNewMessageSave = (values: NewMessageMappingParameters) => {

    };

    const removeSelectedTable = () => setSelectedTable(undefined);

    return (
        <>
            Mode: {mode === 'new' ? 'New message mode' : `Edit message mode for ${messageId}`}
            <ContentContainer>
                <AlertDialog
                    id='discard-changes-dialog'
                    title='Are you sure that you want to discard these changes?'
                    description={`By clicking ‘discard changes' none of the changes you have made to this screen will be stored.`}
                    isOpen={showDiscardChangesDialog}
                    onCancel={() => cancelMessageMapping()}
                    onConfirm={() => setShowDiscardChangesDialog(false)}
                    cancelBtnText='Discard changes'
                    confirmBtnText='Continue working'
                />

                <ContentHeader title={title} buttons={[toolbarButtons]} sx={{ minHeight: 64 }} />

                <Form<NewMessageMappingParameters>
                    initialValues={{
                        name: '',
                        description: '',
                        messageTypeName: '',
                        messageTypeDescription: '',
                    }}
                    onSubmit={handleNewMessageSave}
                >
                    <MessageDetailsSection mode={mode} />
                    {showTable
                        ? <TableSection
                            mode={mode}
                            selectedTable={selectedTable}
                            onBackToSearchResultsClicked={() => removeSelectedTable()}
                        />
                        : <TableSearchSection
                            mode={mode}
                            onTableSelected={setSelectedTable}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                        />
                    }
                </Form>
            </ContentContainer>
        </>
    );
};
