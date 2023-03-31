// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useLocation, useParams } from 'react-router-dom';

import { Form, Icon } from '@dolittle/design-system';

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

    const mode: ViewMode = location.pathname.endsWith('new') ? 'new' : 'edit';

    const handleNewMessageSave = (values: NewMessageMappingParameters) => {

    };

    const title = mode === 'new' ? 'Create New Message Type' : 'Edit Message';
    //const toolbarButtons = [{ label: 'Discard changes', startWithIcon: <Icon icon='CancelRounded' />, color: 'subtle' }];

    return (
        <>
            Mode: {mode === 'new' ? 'New message mode' : `Edit message mode for ${messageId}`}
            <ContentContainer>
                <ContentHeader title={title} buttons={[{ label: 'Discard changes', startWithIcon: <Icon icon='CancelRounded' />, color: 'subtle' }]} />
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
                    <TableSearchSection mode={mode} />
                    <TableSection mode={mode} tableName='MITLAB' />
                    <SubmitButtonSection mode={mode} isSubmitting={false} />
                </Form>
            </ContentContainer>
        </>
    );
};
