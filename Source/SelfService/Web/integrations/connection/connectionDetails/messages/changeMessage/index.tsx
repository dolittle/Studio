// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useLocation, useParams } from 'react-router-dom';

import { Form, Icon } from '@dolittle/design-system';

import { TableListingEntry } from '../../../../../apis/integrations/generated';

import { ViewMode } from './ViewMode';
import { ContentContainer } from './components/ContentContainer';
import { ContentHeader } from './components/ContentHeader';
import { TableSearchSection } from './components/TableSearchSection';
import { MessageDetailsSection } from './components/MessageDetailsSection';
import { SubmitButtonSection } from './components/SubmitButtonSection';
import { TableSection } from './components/TableSection';

export type NewMessageMappingParameters = {
    name: string;
    description: string;
    messageTypeName: string;
    messageTypeDescription: string;
};

export const ChangeMessageView = () => {
    const location = useLocation();
    const { messageId } = useParams();
    const [selectedTable, setSelectedTable] = useState<TableListingEntry>();

    const mode: ViewMode = location.pathname.endsWith('new') ? 'new' : 'edit';
    const showTable = !!selectedTable;


    const title = mode === 'new' ? 'Create New Message Type' : 'Edit Message';
    const toolbarButtons = { label: 'Discard changes', startWithIcon: <Icon icon='CancelRounded' />, color: 'subtle' } as const;

    const handleNewMessageSave = (values: NewMessageMappingParameters) => {

    };
    return (
        <>
            Mode: {mode === 'new' ? 'New message mode' : `Edit message mode for ${messageId}`}
            <ContentContainer>
                <ContentHeader title={title} buttons={[toolbarButtons]} sx={{ minHeight: 64 }} />
                <Form<NewMessageMappingParameters>
                    initialValues={{
                        name: '',
                        description: '',
                        messageTypeName: 'Supplier',
                        messageTypeDescription: 'Supplier Details',
                    }}
                    onSubmit={handleNewMessageSave}
                >
                    <MessageDetailsSection mode={mode} />
                    {showTable
                        ? <TableSection mode={mode} selectedTable={selectedTable} />
                        : <TableSearchSection mode={mode} onTableSelected={setSelectedTable} />
                    }
                    <SubmitButtonSection mode={mode} isSubmitting={false} />
                </Form>
            </ContentContainer>
        </>
    );
};
