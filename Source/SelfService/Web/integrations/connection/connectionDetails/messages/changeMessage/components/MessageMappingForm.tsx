// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { UseMutationResult } from '@tanstack/react-query';

import { enqueueSnackbar } from 'notistack';

import { Form, FormRef } from '@dolittle/design-system';

import { ConnectionsIdMessageMappingsTablesTableMessagesMessagePostRequest, MessageMappingModel, SetMessageMappingRequestArguments } from '../../../../../../apis/integrations/generated';

export type NewMessageMappingParameters = SetMessageMappingRequestArguments & {
    name: string;
};

export type MessageMappingFormProps = {
    connectionId: string;
    selectedTableName: string;
    messageId: string;
    messageType: MessageMappingModel;
    children?: React.ReactNode;
    saveMessageMappingMutation: UseMutationResult<void, unknown, ConnectionsIdMessageMappingsTablesTableMessagesMessagePostRequest, unknown>
};

export const MessageMappingForm = ({
    connectionId,
    selectedTableName,
    messageType,
    children,
    saveMessageMappingMutation
}: MessageMappingFormProps) => {
    const navigate = useNavigate();
    const formRef = useRef<FormRef<NewMessageMappingParameters>>(null);
    const [hasBeenReset, setHasBeenReset] = useState(false);

    useEffect(() => {
        if (!messageType) {
            return;
        }

        formRef.current?.reset({
            name: messageType?.name ?? '',
            description: messageType?.description ?? '',
            fields: messageType?.fieldMappings?.map(field => ({
                columnName: field.mappedColumn?.m3ColumnName,
                fieldName: field.mappedName,
                fieldDescription: field.mappedDescription,
            })) || [],
            jqFilter: messageType?.jqPredicate ?? '',
        });
        setHasBeenReset(true);
    }, [messageType, formRef.current?.reset]);

    useEffect(() => {
        if (hasBeenReset) {
            formRef.current?.trigger();
        }
    }, [formRef.current?.trigger, hasBeenReset]);

    const handleNewMessageSave = (values: NewMessageMappingParameters) => {
        saveMessageMappingMutation.mutate({
            id: connectionId,
            message: values.name,
            table: selectedTableName,
            setMessageMappingRequestArguments: {
                description: values.description,
                fields: values.fields,
                jqFilter: values.jqFilter,
            },
        }, {
            onSuccess(data, variables, context) {
                navigate(`..`);
                enqueueSnackbar('Message successfully created');
            },
            onError(error, variables, context) {
                console.log('error', error);
                enqueueSnackbar('Something went wrong when trying to save the message', { variant: 'error' });
            },
        });
    };

    return (
        <Form<NewMessageMappingParameters>
            initialValues={{
                name: messageType?.name ?? '',
                description: messageType?.description ?? '',
                fields: messageType?.fieldMappings?.map(field => ({
                    columnName: field.mappedColumn?.m3ColumnName,
                    fieldName: field.mappedName,
                    fieldDescription: field.mappedDescription,
                })) || [],
                jqFilter: messageType?.jqPredicate ?? '',
            }}
            onSubmit={handleNewMessageSave}
            fRef={formRef}
        >
            {children}
        </Form>
    );
};
