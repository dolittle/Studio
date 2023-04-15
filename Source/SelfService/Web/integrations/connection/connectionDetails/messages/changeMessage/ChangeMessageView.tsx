// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useFormState } from 'react-hook-form';

import { AlertBox, AlertDialog } from '@dolittle/design-system';

import { MessageMappingModel } from '../../../../../apis/integrations/generated';

import { ViewMode } from './ViewMode';
import { ContentHeader } from './components/ContentHeader';
import { TableSearchSection } from './components/TableSearchSection';
import { MessageDetailsSection } from './components/MessageDetailsSection';
import { TableSection } from './components/TableSection';
import { SubmitButtonSection } from './components/SubmitButtonSection';


export type ChangeMessageViewProps = {
    mode: ViewMode;
    table: string,
    messageId: string,
    isSubmitting: boolean;
    messageType: MessageMappingModel | undefined;
    queryIsError: boolean;
    queryIsSuccess: boolean;
};


export const ChangeMessageView = ({
    mode,
    table,
    messageId,
    isSubmitting,
    messageType,
    queryIsError,
    queryIsSuccess,
}: ChangeMessageViewProps) => {
    const navigate = useNavigate();
    const { isDirty } = useFormState();

    const [searchInput, setSearchInput] = useState('');
    const [selectedTableName, setSelectedTableName] = useState('');
    const [showDiscardChangesDialog, setShowDiscardChangesDialog] = useState(false);

    const showTable = !!selectedTableName || mode === 'edit';
    const title = mode === 'new' ? 'Create New Message Type' : `Edit Message Type - ${messageId}`;


    if (mode === 'edit' && table && !selectedTableName) {
        setSelectedTableName(table);
    }

    const toolbarButtons = {
        label: isDirty ? 'Discard changes' : 'Cancel',
        startWithIcon: 'CancelRounded',
        color: 'subtle',
        onClick: () => isDirty ? setShowDiscardChangesDialog(true) : cancelMessageMapping(),
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


    const removeSelectedTable = () => setSelectedTableName('');

    return (
        <>
            {mode === 'edit' && queryIsError
                ? <AlertBox />
                : (
                    <>
                        {(mode === 'new' || queryIsSuccess) && (
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
                                            isSubmitting={isSubmitting}
                                        />
                                    </> : <TableSearchSection
                                        mode={mode}
                                        onTableSelected={setSelectedTableName}
                                        searchInput={searchInput}
                                        setSearchInput={setSearchInput}
                                    />
                                }

                            </>
                        )}
                    </>
                )
            }
        </>
    );
};

