// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { AlertDialog, Form, Icon } from '@dolittle/design-system';

import { SetMessageMappingRequestArguments, TableListingEntry } from '../../../../../apis/integrations/generated';
import { useConnectionsIdMessageMappingsTablesTableMessagesMessagePost } from '../../../../../apis/integrations/messageMappingApi.hooks';
import { useConnectionId } from '../../../../routes.hooks';

import { ViewMode } from './ViewMode';
import { ContentContainer } from './components/ContentContainer';
import { ContentHeader } from './components/ContentHeader';
import { TableSearchSection } from './components/TableSearchSection';
import { MessageDetailsSection } from './components/MessageDetailsSection';
import { TableSection } from './components/TableSection';
import { SubmitButtonSection } from './components/SubmitButtonSection';

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
    const connectionId = useConnectionId();
    const saveMessageMappingMutation = useConnectionsIdMessageMappingsTablesTableMessagesMessagePost();

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

    const handleNewMessageSave = (values: SetMessageMappingRequestArguments) => {
        saveMessageMappingMutation.mutate({
            id: connectionId!,
            message: values.name!,
            table: selectedTable?.name!,
            setMessageMappingRequestArguments: {
                name: values.name!,
                description: values.description!,
                fields: values.fields!,
            }
        }, {
            onSuccess(data, variables, context) {
                navigate(`messages`);
                enqueueSnackbar('Message successfully created', { variant: 'success' });
            },
            onError(error, variables, context) {
                console.log('error', error);
                enqueueSnackbar('Something went wrong when trying to save the message', { variant: 'error' });
            }
        });
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

                <Form<SetMessageMappingRequestArguments>
                    initialValues={{
                        name: '',
                        description: '',
                        fields: [],
                    }}
                    onSubmit={handleNewMessageSave}
                >
                    <MessageDetailsSection mode={mode} />
                    {showTable
                        ? <>
                            <TableSection
                                mode={mode}
                                selectedTable={selectedTable}
                                onBackToSearchResultsClicked={() => removeSelectedTable()}
                            />
                            <SubmitButtonSection
                                mode={mode}
                                isSubmitting={saveMessageMappingMutation.isLoading}
                            />
                        </>

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
