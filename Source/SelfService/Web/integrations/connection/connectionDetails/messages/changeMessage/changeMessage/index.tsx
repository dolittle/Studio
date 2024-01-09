// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ContentHeader } from '@dolittle/design-system';

import { MessageMappingModel } from '../../../../../../apis/integrations/generated';

import { ViewMode } from '../ViewMode';
import { DiscardChangesDialog } from './DiscardChangesDialog';
import { MessageSection } from './messageSection';
import { TableSearchSection } from './tableSearchSection';
import { MessageDetailsSection } from './MessageDetailsSection';
import { CancelOrDiscardButton } from './CancelOrDiscardButton';

export type ChangeMessageViewProps = {
    mode: ViewMode;
    table: string,
    messageId: string,
    isSubmitting: boolean;
    messageType: MessageMappingModel | undefined;
    onTableSelected: (table: string) => void;
};

export const ChangeMessageView = ({ mode, table, messageId, isSubmitting, messageType, onTableSelected }: ChangeMessageViewProps) => {
    const navigate = useNavigate();

    const [showDiscardChangesDialog, setShowDiscardChangesDialog] = useState(false);

    const showTable = !!table || mode === 'edit';
    const title = mode === 'new' ? 'Create New Message Type' : `Edit Message Type - ${messageId}`;

    // TODO: Implement this.
    // Prevent the user from accidentally closing the browser tab if they have unsaved changes.

    // window.addEventListener('beforeunload', (event) => {
    //     event.preventDefault();
    //     return event.returnValue = 'Are you sure you want to close?';
    // });

    const handleMessageMappingCancel = () => {
        setShowDiscardChangesDialog(false);
        navigate('..');
    };

    return (
        <>
            <DiscardChangesDialog
                isDialogOpen={showDiscardChangesDialog}
                onDialogCancel={handleMessageMappingCancel}
                onDialogClose={() => setShowDiscardChangesDialog(false)}
            />

            <ContentHeader
                title={title}
                buttonsSlot={
                    <CancelOrDiscardButton onCancelled={handleMessageMappingCancel} onDiscarded={() => setShowDiscardChangesDialog(true)} />
                }
            />

            <MessageDetailsSection />

            {showTable
                ? <MessageSection
                    mode={mode}
                    selectedTableName={table}
                    initialSelectedFields={messageType?.fieldMappings ?? []}
                    isSubmitting={isSubmitting}
                    onTableSelected={onTableSelected}
                />
                : <TableSearchSection mode={mode} onTableSelected={onTableSelected} />
            }
        </>
    );
};
