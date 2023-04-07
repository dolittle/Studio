// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { AlertBox, AlertDialog, Form, Icon } from '@dolittle/design-system';

import { SetMessageMappingRequestArguments, TableListingEntry } from '../../../../../apis/integrations/generated';
import {
    useConnectionsIdMessageMappingsTablesTableMessagesMessageGet,
    useConnectionsIdMessageMappingsTablesTableMessagesMessagePost
} from '../../../../../apis/integrations/messageMappingApi.hooks';
import { useConnectionId } from '../../../../routes.hooks';

import { ViewMode } from './ViewMode';
import { ContentContainer } from './components/ContentContainer';
import { ContentHeader } from './components/ContentHeader';
import { TableSearchSection } from './components/TableSearchSection';
import { MessageDetailsSection } from './components/MessageDetailsSection';
import { TableSection } from './components/TableSection';
import { SubmitButtonSection } from './components/SubmitButtonSection';

export type NewMessageMappingParameters = SetMessageMappingRequestArguments & {
    name: string;
};



export const ChangeMessageView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { table, messageId } = useParams();
    const connectionId = useConnectionId();
    const [searchInput, setSearchInput] = useState<string>('');
    const [selectedTableName, setSelectedTableName] = useState<string>('');
    const [showDiscardChangesDialog, setShowDiscardChangesDialog] = useState(false);

    const saveMessageMappingMutation = useConnectionsIdMessageMappingsTablesTableMessagesMessagePost();

    const messageQuery = useConnectionsIdMessageMappingsTablesTableMessagesMessageGet({ id: connectionId!, table: table!, message: messageId! });

    const mode: ViewMode = location.pathname.endsWith('new') ? 'new' : 'edit';
    const showTable = !!selectedTableName || mode === 'edit';
    const title = mode === 'new' ? 'Create New Message Type' : `Edit Message Type - ${messageId}`;

    const messageType = messageQuery.data?.value;

    if (mode === 'edit' && table && !selectedTableName) {
        setSelectedTableName(table);
    }


    const toolbarButtons = {
        label: 'Discard changes',
        startWithIcon: 'CancelRounded',
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

        navigate('..');
    };

    const handleNewMessageSave = (values: NewMessageMappingParameters) => {
        saveMessageMappingMutation.mutate({
            id: connectionId!,
            message: values.name,
            table: selectedTableName!,
            setMessageMappingRequestArguments: {
                description: values.description!,
                fields: values.fields!,
            }
        }, {
            onSuccess(data, variables, context) {
                navigate(`..`);
                enqueueSnackbar('Message successfully created', { variant: 'success' });
            },
            onError(error, variables, context) {
                console.log('error', error);
                enqueueSnackbar('Something went wrong when trying to save the message', { variant: 'error' });
            }
        });
    };

    const removeSelectedTable = () => setSelectedTableName('');

    return (
        <>
            <ContentContainer>
                {mode === 'edit' && messageQuery.isError
                    ? <AlertBox />
                    : (
                        <>
                            {(mode === 'new' || messageQuery.isSuccess) && (
                                <>
                                    <AlertDialog
                                        id='discard-changes-dialog'
                                        title='Are you sure that you want to discard these changes?'
                                        description={`By clicking ‘discard changes' none of the changes you have made to this screen will be stored.`}
                                        isOpen={showDiscardChangesDialog}
                                        onCancel={() => cancelMessageMapping()}
                                        onClose={() => setShowDiscardChangesDialog(false)}
                                        onConfirm={() => setShowDiscardChangesDialog(false)}
                                        cancelBtnText='Discard changes'
                                        confirmBtnText='Continue working'
                                    />

                                    <ContentHeader
                                        title={title}
                                        buttons={[toolbarButtons]}
                                        sx={{ minHeight: 64 }}
                                    />

                                    <Form<NewMessageMappingParameters>
                                        initialValues={{
                                            name: messageId ?? '',
                                            description: messageType?.description ?? '',
                                            fields: messageType?.fieldMappings?.map(field => ({
                                                columnName: field.mappedColumn?.m3ColumnName!,
                                                fieldName: field.mappedName,
                                                fieldDescription: field.mappedDescription,
                                            })) || [],
                                        }}
                                        onSubmit={handleNewMessageSave}
                                    >
                                        <MessageDetailsSection mode={mode} />
                                        {showTable
                                            ? <>
                                                <TableSection
                                                    mode={mode}
                                                    selectedTableName={selectedTableName}
                                                    initialSelectedFields={messageType?.fieldMappings ?? []}
                                                    onBackToSearchResultsClicked={() => removeSelectedTable()}
                                                />
                                                <SubmitButtonSection
                                                    mode={mode}
                                                    isSubmitting={saveMessageMappingMutation.isLoading}
                                                />
                                            </>

                                            : <TableSearchSection
                                                mode={mode}
                                                onTableSelected={setSelectedTableName}
                                                searchInput={searchInput}
                                                setSearchInput={setSearchInput}
                                            />
                                        }
                                    </Form>
                                </>
                            )}
                        </>
                    )
                }
            </ContentContainer>
        </>
    );
};
