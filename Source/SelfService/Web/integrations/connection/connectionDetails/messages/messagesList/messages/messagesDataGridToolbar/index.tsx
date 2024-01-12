// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { ContentDivider, ContentHeader } from '@dolittle/design-system';

import { MessageMappingModel } from '../../../../../../../apis/integrations/generated';

import { DeployMessagesButton } from './DeployMessagesButton';
import { UndeployMessagesButton } from './UndeployMessagesButton';
import { DeleteMessagesButton } from './DeleteMessagesButton';
import { CopyMessagesButton } from './CopyMessagesButton';

export type ToolbarButtonProps = {
    connectionId: string;
    selectedMessageTypes: MessageMappingModel[];
    isDisabled: boolean;
    onActionCompleted: () => void;
    onActionExecuting: () => void;
};

export type MessagesDataGridToolbarProps = {
    connectionId: string;
    selectedMessageTypes: MessageMappingModel[];
    onActionSuccess: () => void;
};

export const MessagesDataGridToolbar = ({ connectionId, selectedMessageTypes, onActionSuccess }: MessagesDataGridToolbarProps) => {
    const [isAnyActionExecuting, setIsAnyActionExecuting] = useState(false);

    const handleSuccess = () => {
        onActionSuccess();
        setIsAnyActionExecuting(false);
    };

    const handleExecuting = () => {
        setIsAnyActionExecuting(true);
    };

    return (
        <>
            <ContentHeader
                title='Your Messages'
                titleTextVariant='subtitle'
                buttonsSlot={
                    <>
                        <DeleteMessagesButton
                            connectionId={connectionId}
                            selectedMessageTypes={selectedMessageTypes}
                            isDisabled={isAnyActionExecuting}
                            onActionCompleted={handleSuccess}
                            onActionExecuting={handleExecuting}
                        />
                        {/* <CopyMessagesButton
                        connectionId={connectionId}
                        selectedMessageTypes={selectedMessageTypes}
                        isDisabled={true}
                        onActionCompleted={handleSuccess}
                        onActionExecuting={handleExecuting}
                    /> */}
                        <UndeployMessagesButton
                            connectionId={connectionId}
                            selectedMessageTypes={selectedMessageTypes}
                            isDisabled={isAnyActionExecuting}
                            onActionCompleted={handleSuccess}
                            onActionExecuting={handleExecuting}
                        />
                        <DeployMessagesButton
                            connectionId={connectionId}
                            selectedMessageTypes={selectedMessageTypes}
                            isDisabled={isAnyActionExecuting}
                            onActionCompleted={handleSuccess}
                            onActionExecuting={handleExecuting}
                        />
                    </>
                }
            />

            <ContentDivider sx={{ mb: 2 }} />
        </>
    );
};
