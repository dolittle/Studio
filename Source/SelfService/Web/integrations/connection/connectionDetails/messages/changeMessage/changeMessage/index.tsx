// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { AlertBox, ContentHeader, Dialog } from '@dolittle/design-system';

import { MessageMappingModel } from '../../../../../../apis/integrations/generated';

import { ViewMode } from '../ViewMode';
import { TableSearchSection } from './TableSearchSection';
import { MessageDetailsSection } from './MessageDetailsSection';
import { TableSection } from './tableSection';
import { SubmitButtonSection } from './SubmitButtonSection';
import { CancelOrDiscardButton } from './CancelOrDiscardButton';
import { MessageFilterSection } from './MessageFilterSection';

export type ChangeMessageViewProps = {
    mode: ViewMode;
    table: string,
    messageId: string,
    isSubmitting: boolean;
    messageType: MessageMappingModel | undefined;
    queryIsError: boolean;
    queryIsSuccess: boolean;
    onTableSelected: (table: string) => void;
};

export const ChangeMessageView = ({ mode, table, messageId, isSubmitting, messageType, queryIsError, queryIsSuccess, onTableSelected }: ChangeMessageViewProps) => {
    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState('');
    const [showDiscardChangesDialog, setShowDiscardChangesDialog] = useState(false);

    const showTable = !!table || mode === 'edit';
    const title = mode === 'new' ? 'Create New Message Type' : `Edit Message Type - ${messageId}`;

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

    const removeSelectedTable = () => onTableSelected('');

    return (
        <>
            {mode === 'edit' && queryIsError
                ? <AlertBox />
                : (
                    <>
                        {(mode === 'new' || queryIsSuccess) && (
                            <>
                                <Dialog
                                    id='discard-changes'
                                    isOpen={showDiscardChangesDialog}
                                    title='Are you sure that you want to discard these changes?'
                                    description={`By clicking ‘discard changes' none of the changes you have made to this screen will be stored.`}
                                    onCancel={() => cancelMessageMapping()}
                                    cancelBtnLabel='Discard changes'
                                    confirmBtnLabel='Continue working'
                                    onConfirm={() => setShowDiscardChangesDialog(false)}
                                    onClose={() => setShowDiscardChangesDialog(false)}
                                />

                                <ContentHeader
                                    title={title}
                                    buttonsSlot={
                                        <CancelOrDiscardButton onCancelled={() => cancelMessageMapping()} onDiscarded={() => setShowDiscardChangesDialog(true)} />
                                    }
                                />

                                <MessageDetailsSection mode={mode} />

                                {showTable
                                    ? <>
                                        <TableSection
                                            mode={mode}
                                            selectedTableName={table}
                                            initialSelectedFields={messageType?.fieldMappings ?? []}
                                            onBackToSearchResultsClicked={() => removeSelectedTable()}
                                        />
                                        <MessageFilterSection mode={mode} />
                                        <SubmitButtonSection mode={mode} isSubmitting={isSubmitting} />
                                    </> : <TableSearchSection
                                        mode={mode}
                                        onTableSelected={onTableSelected}
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
