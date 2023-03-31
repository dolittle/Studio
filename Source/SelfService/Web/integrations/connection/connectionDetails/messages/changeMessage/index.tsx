// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Form } from '@dolittle/design-system';

import { CardPage } from './components/CardPage';
import { CardHeader } from './components/CardHeader';
import { TableSearchSection } from './components/TableSearchSection';
import { MessageDetailsSection } from './components/MessageDetailsSection';
import { SubmitButtonSection } from './components/SubmitButtonSection';
import { ViewMode } from './ViewMode';


export type NewMessageMappingParameters = {
    name: string;
    description: string;
};

export const ChangeMessageView = () => {
    const location = useLocation();
    const { messageId } = useParams();
    const mode: ViewMode = location.pathname.endsWith('new') ? 'new' : 'edit';

    const handleNewMessageSave = (values: NewMessageMappingParameters) => {

    };


    return (
        <>
            Mode: {mode === 'new' ? 'New message mode' : `Edit message mode for ${messageId}`}
            <CardPage>
                <CardHeader title={mode === 'new' ? 'Create New Message' : 'Edit Message'} />
                <Form<NewMessageMappingParameters>
                    initialValues={{
                        name: '',
                        description: '',
                    }}
                    onSubmit={handleNewMessageSave}
                >
                    <MessageDetailsSection mode={mode} />
                    <TableSearchSection mode={mode} />
                    <SubmitButtonSection mode={mode} isSubmitting={false} />
                </Form>
            </CardPage>
        </>
    );
};
