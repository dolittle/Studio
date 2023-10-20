// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { ContentHeader } from '@dolittle/design-system';

import { MessageMappingModel } from '../../../../../apis/integrations/generated';

import { DeployMessagesButton } from './Toolbar/DeployMessagesButton';
import { DeleteMessagesButton } from './Toolbar/DeleteMessagesButton';
import { CopyMessagesButton } from './Toolbar/CopyMessagesButton';

export type MessagesHeaderProps = {
    connectionId: string;
    selectedMessageTypes: MessageMappingModel[];
    onActionSuccess: () => void;
};

export const MessagesHeader = (props: MessagesHeaderProps) => {
    const [isAnyActionExecuting, setIsAnyActionExecuting] = useState(false);

    const handleSuccess = () => {
        props.onActionSuccess();
        setIsAnyActionExecuting(false);
    };

    const handleExecuting = () => {
        setIsAnyActionExecuting(true);
    };

    return (
        <ContentHeader
            title='Your Messages'
            buttonsSlot={
                <>
                    <DeleteMessagesButton
                        connectionId={props.connectionId}
                        selectedMessageTypes={props.selectedMessageTypes}
                        onActionCompleted={handleSuccess}
                        onActionExecuting={handleExecuting}
                        disable={isAnyActionExecuting}
                    />
                    <CopyMessagesButton
                        connectionId={props.connectionId}
                        selectedMessageTypes={props.selectedMessageTypes}
                        onActionCompleted={handleSuccess}
                        onActionExecuting={handleExecuting}
                        disable={true}
                    />
                    <DeployMessagesButton
                        connectionId={props.connectionId}
                        selectedMessageTypes={props.selectedMessageTypes}
                        onActionCompleted={handleSuccess}
                        onActionExecuting={handleExecuting}
                        disable={isAnyActionExecuting}
                    />
                </>
            }
            titleTextVariant='subtitle'
            sx={{ minHeight: 64 }}
        />
    );
};
